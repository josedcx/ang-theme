/**
 * @license
 * 
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { InjectionToken } from '@angular/core';
export const NB_THEME_OPTIONS = new InjectionToken('ang Theme Options');
export const NB_MEDIA_BREAKPOINTS = new InjectionToken('ang Media Breakpoints');
export const NB_BUILT_IN_JS_THEMES = new InjectionToken('ang Built-in JS Themes');
export const NB_JS_THEMES = new InjectionToken('ang JS Themes');
/**
 * We're providing browser apis with tokens to improve testing capabilities.
 * */
export const NB_WINDOW = new InjectionToken('Window');
export const NB_DOCUMENT = new InjectionToken('Document');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUub3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvdGhlbWUub3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVEvQyxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBaUIsdUJBQXVCLENBQUMsQ0FBQztBQUM1RixNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLGNBQWMsQ0FBc0IsMkJBQTJCLENBQUMsQ0FBQztBQUN6RyxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLGNBQWMsQ0FBcUIsNEJBQTRCLENBQUMsQ0FBQztBQUMxRyxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxjQUFjLENBQXFCLG1CQUFtQixDQUFDLENBQUM7QUFFeEY7O0tBRUs7QUFDTCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxjQUFjLENBQVMsUUFBUSxDQUFDLENBQUM7QUFDOUQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLElBQUksY0FBYyxDQUFXLFVBQVUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmJNZWRpYUJyZWFrcG9pbnQgfSBmcm9tICcuL3NlcnZpY2VzL2JyZWFrcG9pbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJKU1RoZW1lT3B0aW9ucyB9IGZyb20gJy4vc2VydmljZXMvanMtdGhlbWVzL3RoZW1lLm9wdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5iVGhlbWVPcHRpb25zIHtcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgTkJfVEhFTUVfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxOYlRoZW1lT3B0aW9ucz4oJ05lYnVsYXIgVGhlbWUgT3B0aW9ucycpO1xuZXhwb3J0IGNvbnN0IE5CX01FRElBX0JSRUFLUE9JTlRTID0gbmV3IEluamVjdGlvblRva2VuPE5iTWVkaWFCcmVha3BvaW50W10+KCdOZWJ1bGFyIE1lZGlhIEJyZWFrcG9pbnRzJyk7XG5leHBvcnQgY29uc3QgTkJfQlVJTFRfSU5fSlNfVEhFTUVTID0gbmV3IEluamVjdGlvblRva2VuPE5iSlNUaGVtZU9wdGlvbnNbXT4oJ05lYnVsYXIgQnVpbHQtaW4gSlMgVGhlbWVzJyk7XG5leHBvcnQgY29uc3QgTkJfSlNfVEhFTUVTID0gbmV3IEluamVjdGlvblRva2VuPE5iSlNUaGVtZU9wdGlvbnNbXT4oJ05lYnVsYXIgSlMgVGhlbWVzJyk7XG5cbi8qKlxuICogV2UncmUgcHJvdmlkaW5nIGJyb3dzZXIgYXBpcyB3aXRoIHRva2VucyB0byBpbXByb3ZlIHRlc3RpbmcgY2FwYWJpbGl0aWVzLlxuICogKi9cbmV4cG9ydCBjb25zdCBOQl9XSU5ET1cgPSBuZXcgSW5qZWN0aW9uVG9rZW48V2luZG93PignV2luZG93Jyk7XG5leHBvcnQgY29uc3QgTkJfRE9DVU1FTlQgPSBuZXcgSW5qZWN0aW9uVG9rZW48RG9jdW1lbnQ+KCdEb2N1bWVudCcpO1xuIl19