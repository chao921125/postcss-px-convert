// 定义选项接口
interface FontOptions {
    weight?: string;
    style?: string;
    stretch?: string;
    testString?: string;
    timeout?: number;
}

// FontLoader 类
class FontLoader {
    private family: string;
    private options: Required<FontOptions>;

    constructor(family: string, options: Partial<FontOptions> = {}) {
        this.family = family;
        this.options = {
            weight: options.weight || 'normal',
            style: options.style || 'normal',
            stretch: options.stretch || 'normal',
            testString: options.testString || 'BESbswy',
            timeout: options.timeout || 3000,
        };
    }

    // 检查字体是否加载完成
    public load(testString: string = this.options.testString, timeout: number = this.options.timeout): Promise<FontLoader> {
        // @ts-ignore
        return new Promise((resolve, reject) => {
            const startTime = performance.now();

            // 创建测试 DOM 元素
            const tester = document.createElement('span');
            tester.textContent = testString;
            tester.style.position = 'absolute';
            tester.style.top = '-9999px';
            tester.style.visibility = 'hidden';
            tester.style.fontFamily = `"${this.family}", sans-serif`;
            tester.style.fontWeight = this.options.weight;
            tester.style.fontStyle = this.options.style;
            tester.style.fontStretch = this.options.stretch;

            document.body.appendChild(tester);

            // 获取默认字体的尺寸
            const defaultWidth = tester.offsetWidth;
            const defaultHeight = tester.offsetHeight;

            // 设置目标字体
            tester.style.fontFamily = `"${this.family}"`;

            // 检查字体加载状态
            const checkFont = () => {
                const currentWidth = tester.offsetWidth;
                const currentHeight = tester.offsetHeight;

                if (currentWidth !== defaultWidth || currentHeight !== defaultHeight) {
                    document.body.removeChild(tester);
                    resolve(this);
                } else if (performance.now() - startTime > timeout) {
                    document.body.removeChild(tester);
                    reject(new Error(`Font "${this.family}" failed to load within ${timeout}ms`));
                } else {
                    requestAnimationFrame(checkFont);
                }
            };

            requestAnimationFrame(checkFont);
        });
    }

    // 获取字体名称（可选，方便访问）
    public getFamily(): string {
        return this.family;
    }
}

// 辅助函数：加载多个字体
function loadFonts(fonts: FontLoader[]): Promise<FontLoader[]> {
    const promises = fonts.map(font => font.load());
    // @ts-ignore
    return Promise.all(promises);
}

// 模块化支持：CMD, AMD 和浏览器全局变量
(function (root: any, factory: (define?: any) => void) {
    if (typeof define === 'function' && define.amd) {
        // AMD 支持 (如 RequireJS)
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CMD/CommonJS 支持 (如 Node.js)
        module.exports = factory();
    } else {
        // 浏览器全局变量
        const exports = factory();
        root.FontLoader = exports.FontLoader;
        root.loadFonts = exports.loadFonts;
    }
})(typeof self !== 'undefined' ? self : this, function () {
    return { FontLoader, loadFonts };
});

export { FontLoader, loadFonts }; // TypeScript 模块导出