/**
 * Flexible.js 脚本生成器
 */

import fs from 'fs';
import path from 'path';

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
export function generateFlexibleScript(outPath?: string): boolean {
  try {
    const targetPath = outPath || path.resolve(process.cwd(), 'flexible.js');
    
    if (!fs.existsSync(targetPath)) {
      fs.writeFileSync(targetPath, FLEXIBLE_SCRIPT, 'utf-8');
      console.log(`[postcss-px-convert] 已生成 flexible.js 到: ${targetPath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error('[postcss-px-convert] 生成 flexible.js 失败:', error);
    return false;
  }
} 