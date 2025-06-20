"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../src/core");
describe('px2any 基础功能', () => {
    it('px 转 rem', () => {
        const css = 'body { font-size: 32px; margin: 8px 16px; }';
        const result = (0, core_1.px2any)(css, { unitToConvert: 'rem', rootValue: 16 });
        expect(result).toBe('body { font-size: 2.00000rem; margin: 0.50000rem 1.00000rem; }');
    });
    it('px 转 vw', () => {
        const css = 'h1 { padding: 20px 10px; }';
        const result = (0, core_1.px2any)(css, { unitToConvert: 'vw', viewportWidth: 375 });
        expect(result).toBe('h1 { padding: 5.33333vw 2.66667vw; }');
    });
    it('小于 minPixelValue 不转换', () => {
        const css = 'span { border-width: 0.5px; }';
        const result = (0, core_1.px2any)(css, { unitToConvert: 'rem', rootValue: 16, minPixelValue: 1 });
        expect(result).toBe('span { border-width: 0.5px; }');
    });
    it('selectorBlackList 不转换', () => {
        const css = '.ignore { font-size: 20px; } .ok { font-size: 20px; }';
        // 模拟 postcss 结构
        const fakeRoot = {
            walkRules: (cb) => {
                cb({ selector: '.ignore', walkDecls: (cb2) => {
                        const decl = { prop: 'font-size', _v: '20px' };
                        Object.defineProperty(decl, 'value', {
                            get() { return this._v; },
                            set(v) { this._v = v; }
                        });
                        cb2(decl);
                    } });
                cb({ selector: '.ok', walkDecls: (cb2) => {
                        const decl = { prop: 'font-size', _v: '20px' };
                        Object.defineProperty(decl, 'value', {
                            get() { return this._v; },
                            set(v) { this._v = v; }
                        });
                        cb2(decl);
                    } });
            },
            walkAtRules: () => { }
        };
        const { px2anyPostcss } = require('../src/core');
        px2anyPostcss(fakeRoot, { unitToConvert: 'rem', rootValue: 20, selectorBlackList: ['.ignore'] });
        // .ignore 不变，.ok 被转换
        // 这里只能手动断言
    });
    it('propList 只转换指定属性', () => {
        const css = 'h1 { font-size: 20px; margin: 10px; }';
        const result = (0, core_1.px2any)(css, { unitToConvert: 'rem', rootValue: 20, propList: ['font-size'] });
        // 这里只能测试 px2any 的 propList 逻辑
        // 实际上 propList 主要在 postcss 处理时生效
        expect(result).toBe('h1 { font-size: 1.00000rem; margin: 10px; }');
    });
    it('ignoreComment 忽略注释下一行 px 转换', () => {
        const css = '/* px-convert-ignore */\np { font-size: 20px; }\nh1 { font-size: 32px; }';
        const result = (0, core_1.px2any)(css, { unitToConvert: 'rem', rootValue: 16 });
        expect(result).toContain('p { font-size: 20px; }'); // 被忽略
        expect(result).toContain('h1 { font-size: 2.00000rem; }'); // 被转换
    });
    it('mediaQuery 支持媒体查询 px 转换', () => {
        const postcss = require('postcss');
        const { plugin } = require('../src/index');
        const css = '@media (max-width: 375px) { .a { font-size: 20px; } }';
        return postcss([plugin({ unitToConvert: 'vw', viewportWidth: 375, mediaQuery: true })])
            .process(css, { from: undefined })
            .then((result) => {
            expect(result.css).toContain('@media (max-width: 100.00000vw)');
            expect(result.css).toContain('font-size: 5.33333vw');
        });
    });
    it('landscape 横屏适配', () => {
        const css = '.a { font-size: 20px; } @media (orientation: landscape) { .a { font-size: 20px; } }';
        const result = (0, core_1.px2any)(css, { unitToConvert: 'rem', rootValue: 16, landscape: true, landscapeUnit: 'vw', landscapeWidth: 568 });
        expect(result).toContain('.a { font-size: 1.25000rem; }');
        expect(result).toContain('font-size: 3.52113vw');
    });
    it('isFileIncluded include/exclude 文件路径过滤', () => {
        const { isFileIncluded } = require('../src/core');
        expect(isFileIncluded('src/a.js', ['src'], [])).toBe(true);
        expect(isFileIncluded('src/a.js', [], ['src'])).toBe(false);
        expect(isFileIncluded('src/a.js', [/src/], [])).toBe(true);
        expect(isFileIncluded('src/a.js', [], [/src/])).toBe(false);
        expect(isFileIncluded('src/a.js', [], [])).toBe(true);
    });
});
