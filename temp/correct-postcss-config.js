// 正确的 postcss 配置 - 支持 vw + rem 混合转换
// 请复制此内容到 /Users/huangchao/Work/temp/vite-project/.postcssrc.js

export default {
	plugins: {
		autoprefixer: {
			overrideBrowserslist: ["Android >= 4.1", "iOS >= 7.1", "Chrome > 31", "ff > 31", "ie >= 8"],
			add: true,
			grid: false,
		},
		"postcss-px-convert": {
            unitToConvert: 'rem',
			rootValue: 78,
			viewportWidth: 375,  // 添加这个配置
			unitPrecision: 5,
			propList: ["*"],
			selectorBlackList: ["ignore"],
			replace: true,
			mediaQuery: false,
			minPixelValue: 0,
			exclude: /node_modules/i,
            injectFlexibleScript: true,
            
            // ⭐ 关键配置：vw + rem 混合转换
            unitMap: {
                // 字体相关用 rem（便于用户调整系统字体时适配）
                'font-size': 'rem',
                'line-height': 'rem',
                
                // 布局用 vw（精确响应屏幕宽度）
                'width': 'vw',
                'height': 'vw',
                'max-width': 'vw',
                'min-width': 'vw',
                
                // 定位用 vw
                'top': 'vw',
                'left': 'vw',
                'right': 'vw',
                'bottom': 'vw',
                
                // 间距用 rem
                'margin*': 'rem',      // margin, margin-top, margin-bottom 等
                'padding*': 'rem'      // padding, padding-top, padding-bottom 等
            }
		},
	},
};
