/*
 * @license
 * 
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Inject, Input, Optional, Output, } from '@angular/core';
import { Subject } from 'rxjs';
import { convertToBoolProperty } from '../helpers';
import { NB_SELECT_INJECTION_TOKEN } from '../select/select-injection-tokens';
import * as i0 from "@angular/core";
import * as i1 from "../checkbox/checkbox.component";
import * as i2 from "@angular/common";
// Component class scoped counter for aria attributes.
let lastOptionId = 0;
/**
 * NbOptionComponent
 *
 * @styles
 *
 * option-background-color:
 * option-text-color:
 * option-text-font-family:
 * option-hover-background-color:
 * option-hover-text-color:
 * option-active-background-color:
 * option-active-text-color:
 * option-focus-background-color:
 * option-focus-text-color:
 * option-selected-background-color:
 * option-selected-text-color:
 * option-selected-hover-background-color:
 * option-selected-hover-text-color:
 * option-selected-active-background-color:
 * option-selected-active-text-color:
 * option-selected-focus-background-color:
 * option-selected-focus-text-color:
 * option-disabled-background-color:
 * option-disabled-text-color:
 * option-tiny-text-font-size:
 * option-tiny-text-font-weight:
 * option-tiny-text-line-height:
 * option-tiny-padding:
 * option-small-text-font-size:
 * option-small-text-font-weight:
 * option-small-text-line-height:
 * option-small-padding:
 * option-medium-text-font-size:
 * option-medium-text-font-weight:
 * option-medium-text-line-height:
 * option-medium-padding:
 * option-large-text-font-size:
 * option-large-text-font-weight:
 * option-large-text-line-height:
 * option-large-padding:
 * option-giant-text-font-size:
 * option-giant-text-font-weight:
 * option-giant-text-line-height:
 * option-giant-padding:
 **/
export class NbOptionComponent {
    constructor(parent, elementRef, cd, zone, renderer) {
        this.elementRef = elementRef;
        this.cd = cd;
        this.zone = zone;
        this.renderer = renderer;
        this.disabledByGroup = false;
        this._disabled = false;
        /**
         * Fires value when option selection change.
         * */
        this.selectionChange = new EventEmitter();
        /**
         * Fires when option clicked
         */
        this.click$ = new Subject();
        this.selected = false;
        this.alive = true;
        /**
         * Component scoped id for aria attributes.
         * */
        this.id = `nb-option-${lastOptionId++}`;
        this._active = false;
        this.parent = parent;
    }
    get disabled() {
        return this._disabled || this.disabledByGroup;
    }
    set disabled(value) {
        this._disabled = convertToBoolProperty(value);
    }
    get click() {
        return this.click$.asObservable();
    }
    ngOnDestroy() {
        this.alive = false;
    }
    ngAfterViewInit() {
        // TODO: #2254
        this.zone.runOutsideAngular(() => setTimeout(() => {
            this.renderer.addClass(this.elementRef.nativeElement, 'nb-transition');
        }));
    }
    /**
     * Determines should we render checkbox.
     * */
    get withCheckbox() {
        return this.multiple && this.value != null;
    }
    get content() {
        return this.elementRef.nativeElement.textContent;
    }
    get hidden() {
        return this.elementRef.nativeElement.hidden;
    }
    // TODO: replace with isShowCheckbox property to control this behaviour outside, issues/1965
    get multiple() {
        // We check parent existing because parent can be NbSelectComponent or
        // NbAutocomplete and `miltiple` property exists only in NbSelectComponent
        return this.parent ? this.parent.multiple : false;
    }
    get selectedClass() {
        return this.selected;
    }
    get disabledAttribute() {
        return this.disabled ? '' : null;
    }
    get tabindex() {
        return '-1';
    }
    get activeClass() {
        return this._active;
    }
    onClick(event) {
        this.click$.next(this);
        // Prevent scroll on space click, etc.
        event.preventDefault();
    }
    select() {
        this.setSelection(true);
    }
    deselect() {
        this.setSelection(false);
    }
    /**
     * Sets disabled by group state and marks component for check.
     */
    setDisabledByGroupState(disabled) {
        // Check if the component still alive as the option group defer method call so the component may become destroyed.
        if (this.disabledByGroup !== disabled && this.alive) {
            this.disabledByGroup = disabled;
            this.cd.markForCheck();
        }
    }
    setSelection(selected) {
        /**
         * In case of changing options in runtime the reference to the selected option will be kept in select component.
         * This may lead to exceptions with detecting changes in destroyed component.
         *
         * Also Angular can call writeValue on destroyed view (select implements ControlValueAccessor).
         * angular/angular#27803
         * */
        if (this.alive && this.selected !== selected) {
            this.selected = selected;
            this.selectionChange.emit(this);
            this.cd.markForCheck();
        }
    }
    focus() {
        this.elementRef.nativeElement.focus();
    }
    getLabel() {
        return this.content;
    }
    setActiveStyles() {
        this._active = true;
        this.cd.markForCheck();
    }
    setInactiveStyles() {
        this._active = false;
        this.cd.markForCheck();
    }
}
NbOptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbOptionComponent, deps: [{ token: NB_SELECT_INJECTION_TOKEN, optional: true }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
NbOptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0", type: NbOptionComponent, selector: "nb-option", inputs: { value: "value", disabled: "disabled" }, outputs: { selectionChange: "selectionChange" }, host: { listeners: { "click": "onClick($event)", "keydown.space": "onClick($event)", "keydown.enter": "onClick($event)" }, properties: { "attr.id": "this.id", "class.multiple": "this.multiple", "class.selected": "this.selectedClass", "attr.disabled": "this.disabledAttribute", "tabIndex": "this.tabindex", "class.active": "this.activeClass" } }, ngImport: i0, template: `
    <nb-checkbox *ngIf="withCheckbox" [checked]="selected" [disabled]="disabled" aria-hidden="true"> </nb-checkbox>
    <ng-content></ng-content>
  `, isInline: true, styles: ["/**\n * @license\n * \n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//*!\n * @license\n * \n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex}:host[hidden]{display:none}:host:hover{cursor:pointer}:host nb-checkbox{display:flex;pointer-events:none}[dir=ltr] :host nb-checkbox{margin-right:.5rem}[dir=rtl] :host nb-checkbox{margin-left:.5rem}:host nb-checkbox ::ng-deep .label{padding:0}:host([disabled]){pointer-events:none}:host(.nb-transition){transition-duration:.15s;transition-property:background-color,color;transition-timing-function:ease-in}\n"], components: [{ type: i1.NbCheckboxComponent, selector: "nb-checkbox", inputs: ["checked", "disabled", "status", "indeterminate"], outputs: ["checkedChange"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-option', changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <nb-checkbox *ngIf="withCheckbox" [checked]="selected" [disabled]="disabled" aria-hidden="true"> </nb-checkbox>
    <ng-content></ng-content>
  `, styles: ["/**\n * @license\n * \n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//*!\n * @license\n * \n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex}:host[hidden]{display:none}:host:hover{cursor:pointer}:host nb-checkbox{display:flex;pointer-events:none}[dir=ltr] :host nb-checkbox{margin-right:.5rem}[dir=rtl] :host nb-checkbox{margin-left:.5rem}:host nb-checkbox ::ng-deep .label{padding:0}:host([disabled]){pointer-events:none}:host(.nb-transition){transition-duration:.15s;transition-property:background-color,color;transition-timing-function:ease-in}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NB_SELECT_INJECTION_TOKEN]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i0.Renderer2 }]; }, propDecorators: { value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }], id: [{
                type: HostBinding,
                args: ['attr.id']
            }], multiple: [{
                type: HostBinding,
                args: ['class.multiple']
            }], selectedClass: [{
                type: HostBinding,
                args: ['class.selected']
            }], disabledAttribute: [{
                type: HostBinding,
                args: ['attr.disabled']
            }], tabindex: [{
                type: HostBinding,
                args: ['tabIndex']
            }], activeClass: [{
                type: HostBinding,
                args: ['class.active']
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.space', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.enter', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9vcHRpb24vb3B0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBRVQsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxHQUlQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFLM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFrQixNQUFNLFlBQVksQ0FBQztBQUduRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7OztBQU45RSxzREFBc0Q7QUFDdEQsSUFBSSxZQUFZLEdBQVcsQ0FBQyxDQUFDO0FBUTdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTRDSTtBQVVKLE1BQU0sT0FBTyxpQkFBaUI7SUF5QzVCLFlBQ2lELE1BQU0sRUFDM0MsVUFBc0IsRUFDdEIsRUFBcUIsRUFDckIsSUFBWSxFQUNaLFFBQW1CO1FBSG5CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGFBQVEsR0FBUixRQUFRLENBQVc7UUE3Q3JCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBY3hCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFHckM7O2FBRUs7UUFDSyxvQkFBZSxHQUF1QyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5GOztXQUVHO1FBQ08sV0FBTSxHQUFrQyxJQUFJLE9BQU8sRUFBd0IsQ0FBQztRQUt0RixhQUFRLEdBQVksS0FBSyxD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QkFBQyxlQUFlO2dCQU14QixRQUFRO3NCQURYLFdBQVc7dUJBQUMsVUFBVTtnQkFNbkIsV0FBVztzQkFEZCxXQUFXO3VCQUFDLGNBQWM7Z0JBUzNCLE9BQU87c0JBSE4sWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O3NCQUNoQyxZQUFZO3VCQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7c0JBQ3hDLFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgTmdab25lLFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG4vLyBDb21wb25lbnQgY2xhc3Mgc2NvcGVkIGNvdW50ZXIgZm9yIGFyaWEgYXR0cmlidXRlcy5cbmxldCBsYXN0T3B0aW9uSWQ6IG51bWJlciA9IDA7XG5cbmltcG9ydCB7IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSwgTmJCb29sZWFuSW5wdXQgfSBmcm9tICcuLi9oZWxwZXJzJztcbmltcG9ydCB7IE5iRm9jdXNhYmxlT3B0aW9uIH0gZnJvbSAnLi4vY2RrL2ExMXkvZm9jdXMta2V5LW1hbmFnZXInO1xuaW1wb3J0IHsgTmJIaWdobGlnaHRhYmxlT3B0aW9uIH0gZnJvbSAnLi4vY2RrL2ExMXkvZGVzY2VuZGFudC1rZXktbWFuYWdlcic7XG5pbXBvcnQgeyBOQl9TRUxFQ1RfSU5KRUNUSU9OX1RPS0VOIH0gZnJvbSAnLi4vc2VsZWN0L3NlbGVjdC1pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7IE5iU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2VsZWN0L3NlbGVjdC5jb21wb25lbnQnO1xuXG4vKipcbiAqIE5iT3B0aW9uQ29tcG9uZW50XG4gKlxuICogQHN0eWxlc1xuICpcbiAqIG9wdGlvbi1iYWNrZ3JvdW5kLWNvbG9yOlxuICogb3B0aW9uLXRleHQtY29sb3I6XG4gKiBvcHRpb24tdGV4dC1mb250LWZhbWlseTpcbiAqIG9wdGlvbi1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogb3B0aW9uLWhvdmVyLXRleHQtY29sb3I6XG4gKiBvcHRpb24tYWN0aXZlLWJhY2tncm91bmQtY29sb3I6XG4gKiBvcHRpb24tYWN0aXZlLXRleHQtY29sb3I6XG4gKiBvcHRpb24tZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIG9wdGlvbi1mb2N1cy10ZXh0LWNvbG9yOlxuICogb3B0aW9uLXNlbGVjdGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBvcHRpb24tc2VsZWN0ZWQtdGV4dC1jb2xvcjpcbiAqIG9wdGlvbi1zZWxlY3RlZC1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogb3B0aW9uLXNlbGVjdGVkLWhvdmVyLXRleHQtY29sb3I6XG4gKiBvcHRpb24tc2VsZWN0ZWQtYWN0aXZlLWJhY2tncm91bmQtY29sb3I6XG4gKiBvcHRpb24tc2VsZWN0ZWQtYWN0aXZlLXRleHQtY29sb3I6XG4gKiBvcHRpb24tc2VsZWN0ZWQtZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIG9wdGlvbi1zZWxlY3RlZC1mb2N1cy10ZXh0LWNvbG9yOlxuICogb3B0aW9uLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBvcHRpb24tZGlzYWJsZWQtdGV4dC1jb2xvcjpcbiAqIG9wdGlvbi10aW55LXRleHQtZm9udC1zaXplOlxuICogb3B0aW9uLXRpbnktdGV4dC1mb250LXdlaWdodDpcbiAqIG9wdGlvbi10aW55LXRleHQtbGluZS1oZWlnaHQ6XG4gKiBvcHRpb24tdGlueS1wYWRkaW5nOlxuICogb3B0aW9uLXNtYWxsLXRleHQtZm9udC1zaXplOlxuICogb3B0aW9uLXNtYWxsLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBvcHRpb24tc21hbGwtdGV4dC1saW5lLWhlaWdodDpcbiAqIG9wdGlvbi1zbWFsbC1wYWRkaW5nOlxuICogb3B0aW9uLW1lZGl1bS10ZXh0LWZvbnQtc2l6ZTpcbiAqIG9wdGlvbi1tZWRpdW0tdGV4dC1mb250LXdlaWdodDpcbiAqIG9wdGlvbi1tZWRpdW0tdGV4dC1saW5lLWhlaWdodDpcbiAqIG9wdGlvbi1tZWRpdW0tcGFkZGluZzpcbiAqIG9wdGlvbi1sYXJnZS10ZXh0LWZvbnQtc2l6ZTpcbiAqIG9wdGlvbi1sYXJnZS10ZXh0LWZvbnQtd2VpZ2h0OlxuICogb3B0aW9uLWxhcmdlLXRleHQtbGluZS1oZWlnaHQ6XG4gKiBvcHRpb24tbGFyZ2UtcGFkZGluZzpcbiAqIG9wdGlvbi1naWFudC10ZXh0LWZvbnQtc2l6ZTpcbiAqIG9wdGlvbi1naWFudC10ZXh0LWZvbnQtd2VpZ2h0OlxuICogb3B0aW9uLWdpYW50LXRleHQtbGluZS1oZWlnaHQ6XG4gKiBvcHRpb24tZ2lhbnQtcGFkZGluZzpcbiAqKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLW9wdGlvbicsXG4gIHN0eWxlVXJsczogWycuL29wdGlvbi5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmItY2hlY2tib3ggKm5nSWY9XCJ3aXRoQ2hlY2tib3hcIiBbY2hlY2tlZF09XCJzZWxlY3RlZFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiA8L25iLWNoZWNrYm94PlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmJPcHRpb25Db21wb25lbnQ8VCA9IGFueT4gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE5iRm9jdXNhYmxlT3B0aW9uLCBOYkhpZ2hsaWdodGFibGVPcHRpb24ge1xuICBwcm90ZWN0ZWQgZGlzYWJsZWRCeUdyb3VwID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIE9wdGlvbiB2YWx1ZSB0aGF0IHdpbGwgYmUgZmlyZWQgb24gc2VsZWN0aW9uLlxuICAgKiAqL1xuICBASW5wdXQoKSB2YWx1ZTogVDtcblxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8IHRoaXMuZGlzYWJsZWRCeUdyb3VwO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29udmVydFRvQm9vbFByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogTmJCb29sZWFuSW5wdXQ7XG5cbiAgLyoqXG4gICAqIEZpcmVzIHZhbHVlIHdoZW4gb3B0aW9uIHNlbGVjdGlvbiBjaGFuZ2UuXG4gICAqICovXG4gIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxOYk9wdGlvbkNvbXBvbmVudDxUPj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEZpcmVzIHdoZW4gb3B0aW9uIGNsaWNrZWRcbiAgICovXG4gIHByb3RlY3RlZCBjbGljayQ6IFN1YmplY3Q8TmJPcHRpb25Db21wb25lbnQ8VD4+ID0gbmV3IFN1YmplY3Q8TmJPcHRpb25Db21wb25lbnQ8VD4+KCk7XG4gIGdldCBjbGljaygpOiBPYnNlcnZhYmxlPE5iT3B0aW9uQ29tcG9uZW50PFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuY2xpY2skLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJvdGVjdGVkIHBhcmVudDogTmJTZWxlY3RDb21wb25lbnQ7XG4gIHByb3RlY3RlZCBhbGl2ZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIENvbXBvbmVudCBzY29wZWQgaWQgZm9yIGFyaWEgYXR0cmlidXRlcy5cbiAgICogKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJylcbiAgaWQ6IHN0cmluZyA9IGBuYi1vcHRpb24tJHtsYXN0T3B0aW9uSWQrK31gO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTkJfU0VMRUNUX0lOSkVDVElPTl9UT0tFTikgcGFyZW50LFxuICAgIHByb3RlY3RlZCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIHpvbmU6IE5nWm9uZSxcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgKSB7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmFsaXZlID0gZmFsc2U7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gVE9ETzogIzIyNTRcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbmItdHJhbnNpdGlvbicpO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHNob3VsZCB3ZSByZW5kZXIgY2hlY2tib3guXG4gICAqICovXG4gIGdldCB3aXRoQ2hlY2tib3goKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgJiYgdGhpcy52YWx1ZSAhPSBudWxsO1xuICB9XG5cbiAgZ2V0IGNvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50O1xuICB9XG5cbiAgZ2V0IGhpZGRlbigpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaGlkZGVuO1xuICB9XG5cbiAgLy8gVE9ETzogcmVwbGFjZSB3aXRoIGlzU2hvd0NoZWNrYm94IHByb3BlcnR5IHRvIGNvbnRyb2wgdGhpcyBiZWhhdmlvdXIgb3V0c2lkZSwgaXNzdWVzLzE5NjVcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tdWx0aXBsZScpXG4gIGdldCBtdWx0aXBsZSgpIHtcbiAgICAvLyBXZSBjaGVjayBwYXJlbnQgZXhpc3RpbmcgYmVjYXVzZSBwYXJlbnQgY2FuIGJlIE5iU2VsZWN0Q29tcG9uZW50IG9yXG4gICAgLy8gTmJBdXRvY29tcGxldGUgYW5kIGBtaWx0aXBsZWAgcHJvcGVydHkgZXhpc3RzIG9ubHkgaW4gTmJTZWxlY3RDb21wb25lbnRcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyAodGhpcy5wYXJlbnQgYXMgTmJTZWxlY3RDb21wb25lbnQpLm11bHRpcGxlIDogZmFsc2U7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNlbGVjdGVkJylcbiAgZ2V0IHNlbGVjdGVkQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWRBdHRyaWJ1dGUoKTogJycgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/ICcnIDogbnVsbDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygndGFiSW5kZXgnKVxuICBnZXQgdGFiaW5kZXgoKSB7XG4gICAgcmV0dXJuICctMSc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjdGl2ZScpXG4gIGdldCBhY3RpdmVDbGFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICB9XG4gIHByb3RlY3RlZCBfYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLnNwYWNlJywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lbnRlcicsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soZXZlbnQpIHtcbiAgICB0aGlzLmNsaWNrJC5uZXh0KHRoaXMpO1xuXG4gICAgLy8gUHJldmVudCBzY3JvbGwgb24gc3BhY2UgY2xpY2ssIGV0Yy5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgc2VsZWN0KCkge1xuICAgIHRoaXMuc2V0U2VsZWN0aW9uKHRydWUpO1xuICB9XG5cbiAgZGVzZWxlY3QoKSB7XG4gICAgdGhpcy5zZXRTZWxlY3Rpb24oZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgZGlzYWJsZWQgYnkgZ3JvdXAgc3RhdGUgYW5kIG1hcmtzIGNvbXBvbmVudCBmb3IgY2hlY2suXG4gICAqL1xuICBzZXREaXNhYmxlZEJ5R3JvdXBTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIC8vIENoZWNrIGlmIHRoZSBjb21wb25lbnQgc3RpbGwgYWxpdmUgYXMgdGhlIG9wdGlvbiBncm91cCBkZWZlciBtZXRob2QgY2FsbCBzbyB0aGUgY29tcG9uZW50IG1heSBiZWNvbWUgZGVzdHJveWVkLlxuICAgIGlmICh0aGlzLmRpc2FibGVkQnlHcm91cCAhPT0gZGlzYWJsZWQgJiYgdGhpcy5hbGl2ZSkge1xuICAgICAgdGhpcy5kaXNhYmxlZEJ5R3JvdXAgPSBkaXNhYmxlZDtcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHNldFNlbGVjdGlvbihzZWxlY3RlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIC8qKlxuICAgICAqIEluIGNhc2Ugb2YgY2hhbmdpbmcgb3B0aW9ucyBpbiBydW50aW1lIHRoZSByZWZlcmVuY2UgdG8gdGhlIHNlbGVjdGVkIG9wdGlvbiB3aWxsIGJlIGtlcHQgaW4gc2VsZWN0IGNvbXBvbmVudC5cbiAgICAgKiBUaGlzIG1heSBsZWFkIHRvIGV4Y2VwdGlvbnMgd2l0aCBkZXRlY3RpbmcgY2hhbmdlcyBpbiBkZXN0cm95ZWQgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQWxzbyBBbmd1bGFyIGNhbiBjYWxsIHdyaXRlVmFsdWUgb24gZGVzdHJveWVkIHZpZXcgKHNlbGVjdCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yKS5cbiAgICAgKiBhbmd1bGFyL2FuZ3VsYXIjMjc4MDNcbiAgICAgKiAqL1xuICAgIGlmICh0aGlzLmFsaXZlICYmIHRoaXMuc2VsZWN0ZWQgIT09IHNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMpO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBmb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgZ2V0TGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50O1xuICB9XG5cbiAgc2V0QWN0aXZlU3R5bGVzKCk6IHZvaWQge1xuICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHNldEluYWN0aXZlU3R5bGVzKCk6IHZvaWQge1xuICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==