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

  test('transformIndexHtml', () => {
    const plugin = viteFlexibleInject();
    const html = '<!DOCTYPE html><html><head></head><body></body></html>';
    const result = plugin.transformIndexHtml(html);
    
    expect(result).toContain('<script src="/flexible.js"></script>');
    expect(result).toContain('<head>');
  });

  test('transformIndexHtml with custom path', () => {
    const plugin = viteFlexibleInject({ flexibleScriptPath: '/custom/flexible.js' });
    const html = '<!DOCTYPE html><html><head></head><body></body></html>';
    const result = plugin.transformIndexHtml(html);
    
    expect(result).toContain('<script src="/custom/flexible.js"></script>');
  });
});

describe('generateFlexibleScript', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('生成文件成功', () => {
    mockFs.existsSync.mockReturnValue(false);
    mockFs.writeFileSync.mockImplementation(() => {});
    
    const result = generateFlexibleScript('./test/flexible.js');
    
    expect(result).toBe(true);
    expect(mockFs.writeFileSync).toHaveBeenCalledWith(
      './test/flexible.js',
      expect.stringContaining('flexible()'),
      'utf-8'
    );
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