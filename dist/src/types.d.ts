export type UnitToConvert = 'rem' | 'vw';
export interface Px2AnyOptions {
    unitToConvert: UnitToConvert;
    rootValue?: number;
    viewportWidth?: number;
    unitPrecision?: number;
    minPixelValue?: number;
    selectorBlackList?: (string | RegExp)[];
    propList?: string[];
    mediaQuery?: boolean;
    include?: (string | RegExp)[];
    exclude?: (string | RegExp)[];
    landscape?: boolean;
    landscapeUnit?: UnitToConvert;
    landscapeWidth?: number;
    ignoreComment?: string;
    customPxReplace?: (px: number, converted: string, unit: UnitToConvert) => string;
    injectFlexibleScript?: boolean;
    flexibleScriptPath?: string;
}
export interface ViteFlexibleInjectOptions {
    flexibleScriptPath?: string;
}
//# sourceMappingURL=types.d.ts.map