"use strict";
/*
 * @license
 * 
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.stylesContent = exports.createThemeContent = void 0;
function createThemeContent(themeName) {
    return `@forward '@josedcx/ang-theme/src/styles/theming';
@use '@josedcx/ang-theme/src/styles/theming' as *;
@use '@josedcx/ang-theme/src/styles/themes/${themeName}';

$nb-themes: nb-register-theme((

  // add your variables here like:

  // color-primary-100: #f2f6ff,
  // color-primary-200: #d9e4ff,
  // color-primary-300: #a6c1ff,
  // color-primary-400: #598bff,
  // color-primary-500: #3366ff,
  // color-primary-600: #274bdb,
  // color-primary-700: #1a34b8,
  // color-primary-800: #102694,
  // color-primary-900: #091c7a,

), ${themeName}, ${themeName});
`;
}
exports.createThemeContent = createThemeContent;
exports.stylesContent = `@use 'themes' as *;

@use '@josedcx/ang-theme/src/styles/globals' as *;

@include nb-install() {
  @include nb-theme-global();
};
`;
