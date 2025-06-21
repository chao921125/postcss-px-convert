"use strict";
/**
 * Flexible.js 脚本生成器
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFlexibleScript = generateFlexibleScript;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// flexible 脚本内容
const FLEXIBLE_SCRIPT = `
(function flexible() {
  var docEl = document.documentElement;
  function setRemUnit() {
    var rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem + 'px';
  }
  setRemUnit();
  window.addEventListener('resize', setRemUnit);
})();
`;
/**
 * 生成 flexible.js 文件
 * @param outPath 输出路径
 * @returns 是否生成成功
 */
function generateFlexibleScript(outPath) {
    try {
        const targetPath = outPath || path_1.default.resolve(process.cwd(), 'flexible.js');
        if (!fs_1.default.existsSync(targetPath)) {
            fs_1.default.writeFileSync(targetPath, FLEXIBLE_SCRIPT, 'utf-8');
            console.log(`[postcss-px-convert] 已生成 flexible.js 到: ${targetPath}`);
            return true;
        }
        return false;
    }
    catch (error) {
        console.error('[postcss-px-convert] 生成 flexible.js 失败:', error);
        return false;
    }
}
//# sourceMappingURL=flexibleScript.js.map