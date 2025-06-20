"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.px2any = px2any;
exports.px2anyPostcss = px2anyPostcss;
exports.isFileIncluded = isFileIncluded;
const defaultOptions = {
    unitToConvert: 'rem',
    rootValue: 16,
    viewportWidth: 375,
    unitPrecision: 5,
    minPixelValue: 1,
    selectorBlackList: [],
    propList: ['*'],
    mediaQuery: false,
    include: [],
    exclude: [],
    landscape: false,
    landscapeUnit: 'vw',
    landscapeWidth: 568,
    ignoreComment: 'no',
    customPxReplace: (px, converted, unit) => converted,
};
function createPxReplace(options, isLandscape = false) {
    return function (m, $1) {
        if (!$1)
            return m;
        const px = parseFloat($1);
        if (px <= options.minPixelValue)
            return m;
        let unit = isLandscape ? options.landscapeUnit : options.unitToConvert;
        let converted;
        if (unit === 'rem') {
            converted = px / options.rootValue;
        }
        else if (unit === 'vw') {
            const width = isLandscape ? options.landscapeWidth : options.viewportWidth;
            converted = px / width * 100;
        }
        else {
            return m;
        }
        let value = toFixed(converted, options.unitPrecision);
        let result = `${value}${unit}`;
        if (options.customPxReplace) {
            return options.customPxReplace(px, result, unit);
        }
        return result;
    };
}
function toFixed(num, precision) {
    // 严格四舍五入
    return (Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)).toFixed(precision);
}
function isSelectorBlacklisted(selector, blackList) {
    return blackList.some((item) => {
        if (typeof item === 'string') {
            return selector.includes(item);
        }
        else {
            return item.test(selector);
        }
    });
}
function isPropIncluded(prop, propList) {
    if (propList.includes('*'))
        return true;
    return propList.some((item) => {
        if (item.endsWith('*')) {
            return prop.startsWith(item.slice(0, -1));
        }
        else if (item.startsWith('*')) {
            return prop.endsWith(item.slice(1));
        }
        else {
            return prop === item;
        }
    });
}
function px2any(css, userOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), userOptions);
    const pxReplace = createPxReplace(options, options.landscape);
    const pxReplaceLandscape = options.landscape ? createPxReplace(options, true) : null;
    // 注释忽略实现
    const ignoreComment = options.ignoreComment || 'no';
    const ignoreReg = /\/\*\s*px-convert-ignore\s*\*\//;
    let lines = css.split(/(?<=;|\{|\})/);
    let skip = false;
    lines = lines.map(line => {
        if (ignoreReg.test(line)) {
            skip = true;
            return line;
        }
        if (skip) {
            skip = false;
            return line;
        }
        // 横屏适配：递归处理 @media (orientation: landscape) 内内容
        if (pxReplaceLandscape && /@media[^{]*orientation:\s*landscape/.test(line)) {
            return line.replace(/\{([^{}]*)\}/g, (block, content) => {
                return '{' + px2any(content, Object.assign(Object.assign(Object.assign({}, defaultOptions), options), { unitToConvert: options.landscapeUnit, viewportWidth: options.landscapeWidth, landscape: false })) + '}';
            });
        }
        // propList 只转换指定属性
        if (options.propList && options.propList.length && !options.propList.includes('*')) {
            // 只处理 propList 中的属性
            return line.replace(/([\w-]+)\s*:\s*((?:\d*\.?\d+)px)/g, (m, prop, px) => {
                if (isPropIncluded(prop, options.propList)) {
                    return `${prop}: ${px.replace(/(\d*\.?\d+)px/g, pxReplace)}`;
                }
                return m;
            });
        }
        return line.replace(/(\d*\.?\d+)px/g, pxReplace);
    });
    return lines.join('');
}
// postcss 处理用
function px2anyPostcss(root, options) {
    root.walkRules((rule) => {
        if (isSelectorBlacklisted(rule.selector, options.selectorBlackList || []))
            return;
        rule.walkDecls((decl) => {
            if (!isPropIncluded(decl.prop, options.propList || ['*']))
                return;
            decl.value = px2any(decl.value, options);
        });
    });
    if (options.mediaQuery) {
        root.walkAtRules('media', (rule) => {
            rule.params = px2any(rule.params, options);
        });
    }
}
function isFileIncluded(filepath, include, exclude) {
    if (exclude && exclude.some((item) => (typeof item === 'string' ? filepath.includes(item) : item.test(filepath)))) {
        return false;
    }
    if (include && include.length > 0) {
        return include.some((item) => (typeof item === 'string' ? filepath.includes(item) : item.test(filepath)));
    }
    return true;
}
