/**
 * 插件功能测试
 */

import { viteFlexibleInject, generateFlexibleScript } from '../src/plugins';
import fs from 'fs';
import path from 'path';

// Mock fs module
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

describe('viteFlexibleInject', () => {
  test('默认配置', () => {
    const plugin = viteFlexibleInject();
    expect(plugin.name).toBe('vite-flexible-inject');
  });

  test('自定义路径', () => {
    const plugin = viteFlexibleInject({ flexibleScriptPath: '/custom/flexible.js' });
    expect(plugin.name).toBe('vite-flexible-inject');
  });

  test('transformIndexHtml - 默认配置', () => {
    const plugin = viteFlexibleInject();
    const html = '<!DOCTYPE html><html><head></head><body></body></html>';
    const result = plugin.transformIndexHtml(html);
    
    expect(result).toContain('<script>');
    expect(result).toContain('flexible()');
    expect(result).toContain('baseWidth = 375');
    expect(result).toContain('minFontSize = null');
    expect(result).toContain('maxFontSize = null');
    // 默认不应包含边界限制逻辑
    expect(result).not.toContain('if (minFontSize !== null && rem < minFontSize)');
    expect(result).not.toContain('if (maxFontSize !== null && rem > maxFontSize)');
  });

  test('transformIndexHtml - 自定义边界值', () => {
    const plugin = viteFlexibleInject({ 
      minFontSize: 12, 
      maxFontSize: 24, 
      baseWidth: 750 
    });
    const html = '<!DOCTYPE html><html><head></head><body></body></html>';
    const result = plugin.transformIndexHtml(html);
    
    expect(result).toContain('<script>');
    expect(result).toContain('flexible()');
    expect(result).toContain('baseWidth = 750');
    expect(result).toContain('minFontSize = 12');
    expect(result).toContain('maxFontSize = 24');
    // 应包含边界限制逻辑
    expect(result).toContain('if (minFontSize !== null && rem < minFontSize)');
    expect(result).toContain('if (maxFontSize !== null && rem > maxFontSize)');
  });

  test('transformIndexHtml - 只有最小值', () => {
    const plugin = viteFlexibleInject({ minFontSize: 14 });
    const html = '<!DOCTYPE html><html><head></head><body></body></html>';
    const result = plugin.transformIndexHtml(html);
    
    expect(result).toContain('minFontSize = 14');
    expect(result).toContain('maxFontSize = null');
    expect(result).toContain('if (minFontSize !== null && rem < minFontSize)');
    expect(result).not.toContain('if (maxFontSize !== null && rem > maxFontSize)');
  });

  test('transformIndexHtml - 只有最大值', () => {
    const plugin = viteFlexibleInject({ maxFontSize: 20 });
    const html = '<!DOCTYPE html><html><head></head><body></body></html>';
    const result = plugin.transformIndexHtml(html);
    
    expect(result).toContain('minFontSize = null');
    expect(result).toContain('maxFontSize = 20');
    expect(result).not.toContain('if (minFontSize !== null && rem < minFontSize)');
    expect(result).toContain('if (maxFontSize !== null && rem > maxFontSize)');
  });

  test('transformIndexHtml - 边界限制逻辑', () => {
    const plugin = viteFlexibleInject({ 
      minFontSize: 12, 
      maxFontSize: 24 
    });
    const html = '<!DOCTYPE html><html><head></head><body></body></html>';
    const result = plugin.transformIndexHtml(html);
    
    // 检查是否包含边界限制逻辑
    expect(result).toContain('if (minFontSize !== null && rem < minFontSize)');
    expect(result).toContain('if (maxFontSize !== null && rem > maxFontSize)');
  });
});

describe('generateFlexibleScript', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('生成文件成功 - 默认配置', () => {
    mockFs.existsSync.mockReturnValue(false);
    mockFs.writeFileSync.mockImplementation(() => {});
    
    const result = generateFlexibleScript('./test/flexible.js');
    
    expect(result).toBe(true);
    expect(mockFs.writeFileSync).toHaveBeenCalledWith(
      './test/flexible.js',
      expect.stringContaining('flexible()'),
      'utf-8'
    );
    
    const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
    expect(writtenContent).toContain('baseWidth = 375');
    expect(writtenContent).toContain('minFontSize = null');
    expect(writtenContent).toContain('maxFontSize = null');
  });

  test('生成文件成功 - 自定义边界值', () => {
    mockFs.existsSync.mockReturnValue(false);
    mockFs.writeFileSync.mockImplementation(() => {});
    
    const result = generateFlexibleScript('./test/flexible.js', {
      minFontSize: 12,
      maxFontSize: 24,
      baseWidth: 750
    });
    
    expect(result).toBe(true);
    
    const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
    expect(writtenContent).toContain('baseWidth = 750');
    expect(writtenContent).toContain('minFontSize = 12');
    expect(writtenContent).toContain('maxFontSize = 24');
  });

  test('生成文件成功 - 只有最小值', () => {
    mockFs.existsSync.mockReturnValue(false);
    mockFs.writeFileSync.mockImplementation(() => {});
    
    const result = generateFlexibleScript('./test/flexible.js', {
      minFontSize: 14
    });
    
    expect(result).toBe(true);
    
    const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
    expect(writtenContent).toContain('minFontSize = 14');
    expect(writtenContent).toContain('maxFontSize = null');
  });

  test('生成文件成功 - 只有最大值', () => {
    mockFs.existsSync.mockReturnValue(false);
    mockFs.writeFileSync.mockImplementation(() => {});
    
    const result = generateFlexibleScript('./test/flexible.js', {
      maxFontSize: 20
    });
    
    expect(result).toBe(true);
    
    const writtenContent = mockFs.writeFileSync.mock.calls[0][1] as string;
    expect(writtenContent).toContain('minFontSize = null');
    expect(writtenContent).toContain('maxFontSize = 20');
  });

  test('文件已存在', () => {
    mockFs.existsSync.mockReturnValue(true);
    
    const result = generateFlexibleScript('./test/flexible.js');
    
    expect(result).toBe(false);
    expect(mockFs.writeFileSync).not.toHaveBeenCalled();
  });

  test('默认路径', () => {
    mockFs.existsSync.mockReturnValue(false);
    mockFs.writeFileSync.mockImplementation(() => {});
    
    const result = generateFlexibleScript();
    
    expect(result).toBe(true);
    expect(mockFs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('flexible.js'),
      expect.stringContaining('flexible()'),
      'utf-8'
    );
  });

  test('写入失败', () => {
    mockFs.existsSync.mockReturnValue(false);
    mockFs.writeFileSync.mockImplementation(() => {
      throw new Error('Write failed');
    });
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const result = generateFlexibleScript('./test/flexible.js');
    
    expect(result).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(
      '[postcss-px-convert] 生成 flexible.js 失败:',
      expect.any(Error)
    );
    
    consoleSpy.mockRestore();
  });
}); 