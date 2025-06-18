// 文件名：postcss-px-converter.js
module.exports = (options = {}) => {
    // 默认配置
    const {
        // 目标单位：可选 'vw' 或 'rem'
        targetUnit = 'vw',
        // 当转换为 vw 时：设计稿宽度（单位：px）
        viewportWidth = 375,
        // 当转换为 rem 时：根元素字体大小（单位：px）
        rootValue = 16,
        // 转换后保留的小数位数
        unitPrecision = 3,
        // 需要转换的 CSS 属性列表，支持通配符 '*'
        propList = ['*'],
        // 忽略转换的选择器
        selectorBlackList = [],
        // 小于或等于该值的 px 单位不进行转换
        minPixelValue = 1,
        // 是否在媒体查询中也进行转换
        mediaQuery = false,
    } = options

    // 四舍五入到指定精度
    function toFixed(number, precision) {
        const multiplier = Math.pow(10, precision + 1)
        const wholeNumber = Math.floor(number * multiplier)
        return (Math.round(wholeNumber / 10) * 10 / multiplier).toFixed(precision)
    }

    // 检查属性是否需要转换（目前简单匹配 propList，实际使用中可扩展正则规则）
    function shouldConvert(prop) {
        return propList.indexOf('*') > -1 || propList.indexOf(prop) > -1
    }

    return {
        postcssPlugin: 'postcss-px-converter',
        Declaration(decl) {
            // 如果值中不包含 px，则直接返回
            if (!decl.value || decl.value.indexOf('px') === -1) return

            // 如果当前选择器在黑名单中，跳过转换
            if (decl.parent && decl.parent.selector) {
                for (const blacklisted of selectorBlackList) {
                    if (decl.parent.selector.indexOf(blacklisted) !== -1) {
                        return
                    }
                }
            }

            // 判断是否转换当前属性
            if (!shouldConvert(decl.prop)) return

            // 处理媒体查询内的 px 转换（根据配置判断是否转换）
            if (!mediaQuery && decl.parent && decl.parent.name === 'media') return

            // 使用正则替换 px 数值
            decl.value = decl.value.replace(/(\d*\.?\d+)px/g, (match, p1) => {
                const pixels = parseFloat(p1)
                // 小于等于 minPixelValue 的值不转换
                if (pixels <= minPixelValue) return match

                let convertedValue = ''
                if (targetUnit === 'vw') {
                    // vw 转换公式： (px / viewportWidth) * 100
                    convertedValue = toFixed((pixels / viewportWidth) * 100, unitPrecision) + 'vw'
                } else if (targetUnit === 'rem') {
                    // rem 转换公式： px / rootValue
                    convertedValue = toFixed(pixels / rootValue, unitPrecision) + 'rem'
                } else {
                    // 不支持的 targetUnit，则返回原始值
                    return match
                }
                return convertedValue
            })
        }
    }
}

module.exports.postcss = true
