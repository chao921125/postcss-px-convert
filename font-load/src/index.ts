/**
 * 检查指定字体是否加载完成
 * @param fontName 字体名称，如 'PingFang SC'
 * @param timeout 超时时间（毫秒），默认 3000ms
 * @returns Promise<boolean> 是否加载完成
 */
export default function checkFontLoaded(fontName: string, timeout = 3000): Promise<boolean> {
  if (typeof document === 'undefined' || !document.fonts) {
    // 不支持 FontFaceSet API
    return Promise.resolve(true); // 认为已加载，避免阻塞
  }
  // 构造字体检测字符串
  const fontStr = `16px \"${fontName}\"`;
  // load 返回 Promise
  const fontPromise = document.fonts.load(fontStr).then(fonts => {
    return document.fonts.check(fontStr);
  });
  // 超时 Promise
  const timeoutPromise = new Promise<boolean>(resolve => {
    setTimeout(() => resolve(false), timeout);
  });
  // 竞速
  return Promise.race([fontPromise, timeoutPromise]);
} 