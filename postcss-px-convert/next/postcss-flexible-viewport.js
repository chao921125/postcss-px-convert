const postcss = require('postcss');

module.exports = postcss.plugin('postcss-flexible-viewport', (options) => {
    const {
        viewportWidth = 750,
        unitPrecision = 5,
        viewportUnit = 'vw',
        propList = ['*'],
        selectorBlackList = [],
        mediaQuery = false,
        exclude = [],
        landscape = false,
        rootValue = 16,
    } = options;

    return (root) => {
        root.walk((node) => {
            if (node.type === 'rule') {
                // 处理 CSS 规则
                node.walk((decl) => {
                    if (decl.type === 'decl' && shouldConvert(decl, propList, selectorBlackList)) {
                        const value = decl.value;
                        const newValue = convertValue(value, viewportWidth, viewportUnit, rootValue);
                        if (newValue !== value) {
                            decl.value = newValue;
                        }
                    }
                });
            } else if (node.type === 'atrule' && node.name === 'media' && mediaQuery) {
                // 处理媒体查询
                node.walk((rule) => {
                    if (rule.type === 'rule') {
                        // 递归处理 CSS 规则
                        rule.walk((decl) => {
                            if (decl.type === 'decl' && shouldConvert(decl, propList, selectorBlackList)) {
                                const value = decl.value;
                                const newValue = convertValue(value, viewportWidth, viewportUnit, rootValue);
                                if (newValue !== value) {
                                    decl.value = newValue;
                                }
                            }
                        });
                    }
                });
            }
        });
    };
});

function shouldConvert(decl, propList, selectorBlackList) {
    const prop = decl.prop;
    const selector = decl.parent.selector;

    // 检查属性是否在 propList 中
    if (propList.indexOf('*') === -1 && propList.indexOf(prop) === -1) {
        return false;
    }

    // 检查选择器是否在 selectorBlackList 中
    for (const regex of selectorBlackList) {
        if (regex.test(selector)) {
            return false;
        }
    }

    return true;
}

function convertValue(value, viewportWidth, viewportUnit, rootValue) {
    const pxRegex = /(\d+(\.\d+)?)px/g;

    return value.replace(pxRegex, (match, pxValue) => {
        const num = parseFloat(pxValue);
        let newValue;

        if (viewportUnit === 'rem') {
            newValue = `${(num / rootValue).toFixed(5)}rem`;
        } else {
            newValue = `${(num / viewportWidth * 100).toFixed(5)}vw`;
        }

        return newValue;
    });
}