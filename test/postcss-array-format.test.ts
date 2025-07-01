import postcss from 'postcss';
import postcssPxConvert from '../index';

describe('PostCSS 数组格式配置支持', () => {
  it('应该支持 PostCSS 数组格式配置', async () => {
    const css = 'body { font-size: 32px; margin: 16px; }';
    
    // 模拟 PostCSS 数组格式配置
    const result = await postcss([
      postcssPxConvert({
        unitToConvert: 'rem',
        rootValue: 16
      })
    ]).process(css, { from: undefined });
    
    expect(result.css).toBe('body { font-size: 2.00000rem; margin: 1.00000rem; }');
  });

  it('应该支持与其他插件一起使用', async () => {
    const css = 'body { font-size: 32px; margin: 16px; }';
    
    // 模拟包含多个插件的数组配置
    const result = await postcss([
      // 这里可以添加其他插件，比如 autoprefixer
      postcssPxConvert({
        unitToConvert: 'rem',
        rootValue: 16
      })
    ]).process(css, { from: undefined });
    
    expect(result.css).toBe('body { font-size: 2.00000rem; margin: 1.00000rem; }');
  });

  it('应该支持 postcss.config.js 中的数组格式', async () => {
    const css = 'body { font-size: 32px; }';
    
    // 模拟 postcss.config.js 中的配置
    const config = {
      plugins: [
        postcssPxConvert({
          unitToConvert: 'rem',
          rootValue: 16
        })
      ]
    };
    
    const result = await postcss(config.plugins).process(css, { from: undefined });
    expect(result.css).toBe('body { font-size: 2.00000rem; }');
  });

  it('应该支持与 postcss-preset-env 类似的配置格式', async () => {
    const css = 'body { font-size: 32px; }';
    
    // 模拟类似 postcss-preset-env 的配置格式
    const plugins = [
      // 这里可以添加 postcssPresetEnv 或其他插件
      // postcssPresetEnv({
      //   autoprefixer: {
      //     grid: true,
      //   },
      // }),
      postcssPxConvert({
        unitToConvert: 'rem',
        rootValue: 16
      })
    ];
    
    const result = await postcss(plugins).process(css, { from: undefined });
    expect(result.css).toBe('body { font-size: 2.00000rem; }');
  });
}); 