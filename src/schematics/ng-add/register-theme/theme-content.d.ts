export declare function createThemeContent(themeName: string): string;
export declare const stylesContent =
  "@use 'themes' as *;\n\n@use '@josedcx/ang-theme/src/styles/globals' as *;\n\n@include nb-install() {\n  @include nb-theme-global();\n};\n";
