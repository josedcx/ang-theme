/*
 * @license
 * 
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, Subject, BehaviorSubject, from } from 'rxjs';
import { startWith, switchMap, takeUntil, filter, map, finalize, take } from 'rxjs/operators';
import { NbAdjustment, NbPosition, } from '../cdk/overlay/overlay-position';
import { NbPortalDirective } from '../cdk/overlay/mapping';
import { NbTrigger } from '../cdk/overlay/overlay-trigger';
import { ESCAPE } from '../cdk/keycodes/keycodes';
import { NB_DOCUMENT } from '../../theme.options';
import { NbOptionComponent } from '../option/option.component';
import { convertToBoolProperty } from '../helpers';
import { NB_SELECT_INJECTION_TOKEN } from './select-injection-tokens';
import { NbFormFieldControl, NbFormFieldControlConfig } from '../form-field/form-field-control';
import * as i0 from "@angular/core";
import * as i1 from "../cdk/overlay/overlay-service";
import * as i2 from "../cdk/overlay/overlay-position";
import * as i3 from "../cdk/overlay/overlay-trigger";
import * as i4 from "../cdk/a11y/focus-key-manager";
import * as i5 from "../cdk/a11y/a11y.module";
import * as i6 from "../../services/status.service";
import * as i7 from "../icon/icon.component";
import * as i8 from "../option/option-list.component";
import * as i9 from "@angular/common";
import * as i10 from "../cdk/overlay/mapping";
export class NbSelectLabelComponent {
}
NbSelectLabelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbSelectLabelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NbSelectLabelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0", type: NbSelectLabelComponent, selector: "nb-select-label", ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbSelectLabelComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-select-label',
                    template: '<ng-content></ng-content>',
                }]
        }] });
export function nbSelectFormFieldControlConfigFactory() {
    const config = new NbFormFieldControlConfig();
    config.supportsSuffix = false;
    return config;
}
/**
 * The `NbSelectComponent` provides a capability to select one of the passed items.
 *
 * @stacked-example(Showcase, select/select-showcase.component)
 *
 * ### Installation
 *
 * Import `NbSelectModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbSelectModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * If you want to use it as the multi-select control you have to mark it as `multiple`.
 * In this case, `nb-select` will work only with arrays - accept arrays and propagate arrays.
 *
 * @stacked-example(Multiple, select/select-multiple.component)
 *
 * Items without values will clean the selection. Both `null` and `undefined` values will also clean the selection.
 *
 * @stacked-example(Clean selection, select/select-clean.component)
 *
 * Select may be bounded using `selected` input:
 *
 * ```html
 * <nb-select [(selected)]="selected"></nb-selected>
 * ```
 *
 * Or you can bind control with form controls or ngModel:
 *
 * @stacked-example(Select form binding, select/select-form.component)
 *
 * Options in the select may be grouped using `nb-option-group` component.
 *
 * @stacked-example(Grouping, select/select-groups.component)
 *
 * Select may have a placeholder that will be shown when nothing selected:
 *
 * @stacked-example(Placeholder, select/select-placeholder.component)
 *
 * You can disable select, options and whole groups.
 *
 * @stacked-example(Disabled select, select/select-disabled.component)
 *
 * Also, the custom label may be provided in select.
 * This custom label will be used for instead placeholder when something selected.
 *
 * @stacked-example(Custom label, select/select-label.component)
 *
 * Default `nb-select` size is `medium` and status is `basic`.
 * Select is available in multiple colors using `status` property:
 *
 * @stacked-example(Select statuses, select/select-status.component)
 *
 * There are five select sizes:
 *
 * @stacked-example(Select sizes, select/select-sizes.component)
 *
 * And two additional style types - `filled`:
 *
 * @stacked-example(Filled select, select/select-filled.component)
 *
 * and `hero`:
 *
 * @stacked-example(Select colors, select/select-hero.component)
 *
 * Select is available in different shapes, that could be combined with the other properties:
 *
 * @stacked-example(Select shapes, select/select-shapes.component)
 *
 * By default, the component selects options whose values are strictly equal (`===`) with the select value.
 * To change such behavior, pass a custom comparator function to the `compareWith` attribute.
 *
 * @stacked-example(Select custom comparator, select/select-compare-with.component)
 *
 * You can add an additional icon to the select via the `nb-form-field` component:
 * @stacked-example(Select with icon, select/select-icon.component)
 *
 * @additional-example(Interactive, select/select-interactive.component)
 *
 * @styles
 *
 * select-cursor:
 * select-disabled-cursor:
 * select-min-width:
 * select-outline-width:
 * select-outline-color:
 * select-icon-offset:
 * select-text-font-family:
 * select-placeholder-text-font-family:
 * select-tiny-text-font-size:
 * select-tiny-text-font-weight:
 * select-tiny-text-line-height:
 * select-tiny-placeholder-text-font-size:
 * select-tiny-placeholder-text-font-weight:
 * select-tiny-max-width:
 * select-small-text-font-size:
 * select-small-text-font-weight:
 * select-small-text-line-height:
 * select-small-placeholder-text-font-size:
 * select-small-placeholder-text-font-weight:
 * select-small-max-width:
 * select-medium-text-font-size:
 * select-medium-text-font-weight:
 * select-medium-text-line-height:
 * select-medium-placeholder-text-font-size:
 * select-medium-placeholder-text-font-weight:
 * select-medium-max-width:
 * select-large-text-font-size:
 * select-large-text-font-weight:
 * select-large-text-line-height:
 * select-large-placeholder-text-font-size:
 * select-large-placeholder-text-font-weight:
 * select-large-max-width:
 * select-giant-text-font-size:
 * select-giant-text-font-weight:
 * select-giant-text-line-height:
 * select-giant-placeholder-text-font-size:
 * select-giant-placeholder-text-font-weight:
 * select-giant-max-width:
 * select-rectangle-border-radius:
 * select-semi-round-border-radius:
 * select-round-border-radius:
 * select-outline-border-style:
 * select-outline-border-width:
 * select-outline-tiny-padding:
 * select-outline-small-padding:
 * select-outline-medium-padding:
 * select-outline-large-padding:
 * select-outline-giant-padding:
 * select-outline-basic-icon-color:
 * select-outline-basic-text-color:
 * select-outline-basic-placeholder-text-color:
 * select-outline-basic-background-color:
 * select-outline-basic-border-color:
 * select-outline-basic-focus-background-color:
 * select-outline-basic-focus-border-color:
 * select-outline-basic-hover-background-color:
 * select-outline-basic-hover-border-color:
 * select-outline-basic-disabled-background-color:
 * select-outline-basic-disabled-border-color:
 * select-outline-basic-disabled-icon-color:
 * select-outline-basic-disabled-text-color:
 * select-outline-primary-icon-color:
 * select-outline-primary-text-color:
 * select-outline-primary-placeholder-text-color:
 * select-outline-primary-background-color:
 * select-outline-primary-border-color:
 * select-outline-primary-focus-background-color:
 * select-outline-primary-focus-border-color:
 * select-outline-primary-hover-background-color:
 * select-outline-primary-hover-border-color:
 * select-outline-primary-disabled-background-color:
 * select-outline-primary-disabled-border-color:
 * select-outline-primary-disabled-icon-color:
 * select-outline-primary-disabled-text-color:
 * select-outline-success-icon-color:
 * select-outline-success-text-color:
 * select-outline-success-placeholder-text-color:
 * select-outline-success-background-color:
 * select-outline-success-border-color:
 * select-outline-success-focus-background-color:
 * select-outline-success-focus-border-color:
 * select-outline-success-hover-background-color:
 * select-outline-success-hover-border-color:
 * select-outline-success-disabled-background-color:
 * select-outline-success-disabled-border-color:
 * select-outline-success-disabled-icon-color:
 * select-outline-success-disabled-text-color:
 * select-outline-info-icon-color:
 * select-outline-info-text-color:
 * select-outline-info-placeholder-text-color:
 * select-outline-info-background-color:
 * select-outline-info-border-color:
 * select-outline-info-focus-background-color:
 * select-outline-info-focus-border-color:
 * select-outline-info-hover-background-color:
 * select-outline-info-hover-border-color:
 * select-outline-info-disabled-background-color:
 * select-outline-info-disabled-border-color:
 * select-outline-info-disabled-icon-color:
 * select-outline-info-disabled-text-color:
 * select-outline-warning-icon-color:
 * select-outline-warning-text-color:
 * select-outline-warning-placeholder-text-color:
 * select-outline-warning-background-color:
 * select-outline-warning-border-color:
 * select-outline-warning-focus-background-color:
 * select-outline-warning-focus-border-color:
 * select-outline-warning-hover-background-color:
 * select-outline-warning-hover-border-color:
 * select-outline-warning-disabled-background-color:
 * select-outline-warning-disabled-border-color:
 * select-outline-warning-disabled-icon-color:
 * select-outline-warning-disabled-text-color:
 * select-outline-danger-icon-color:
 * select-outline-danger-text-color:
 * select-outline-danger-placeholder-text-color:
 * select-outline-danger-background-color:
 * select-outline-danger-border-color:
 * select-outline-danger-focus-background-color:
 * select-outline-danger-focus-border-color:
 * select-outline-danger-hover-background-color:
 * select-outline-danger-hover-border-color:
 * select-outline-danger-disabled-background-color:
 * select-outline-danger-disabled-border-color:
 * select-outline-danger-disabled-icon-color:
 * select-outline-danger-disabled-text-color:
 * select-outline-control-icon-color:
 * select-outline-control-text-color:
 * select-outline-control-placeholder-text-color:
 * select-outline-control-background-color:
 * select-outline-control-border-color:
 * select-outline-control-focus-background-color:
 * select-outline-control-focus-border-color:
 * select-outline-control-hover-background-color:
 * select-outline-control-hover-border-color:
 * select-outline-control-disabled-background-color:
 * select-outline-control-disabled-border-color:
 * select-outline-control-disabled-icon-color:
 * select-outline-control-disabled-text-color:
 * select-outline-adjacent-border-style:
 * select-outline-adjacent-border-width:
 * select-outline-basic-open-border-color:
 * select-outline-basic-adjacent-border-color:
 * select-outline-primary-open-border-color:
 * select-outline-primary-adjacent-border-color:
 * select-outline-success-open-border-color:
 * select-outline-success-adjacent-border-color:
 * select-outline-info-open-border-color:
 * select-outline-info-adjacent-border-color:
 * select-outline-warning-open-border-color:
 * select-outline-warning-adjacent-border-color:
 * select-outline-danger-open-border-color:
 * select-outline-danger-adjacent-border-color:
 * select-outline-control-open-border-color:
 * select-outline-control-adjacent-border-color:
 * select-filled-border-style:
 * select-filled-border-width:
 * select-filled-tiny-padding:
 * select-filled-small-padding:
 * select-filled-medium-padding:
 * select-filled-large-padding:
 * select-filled-giant-padding:
 * select-filled-basic-background-color:
 * select-filled-basic-border-color:
 * select-filled-basic-icon-color:
 * select-filled-basic-text-color:
 * select-filled-basic-placeholder-text-color:
 * select-filled-basic-focus-background-color:
 * select-filled-basic-focus-border-color:
 * select-filled-basic-hover-background-color:
 * select-filled-basic-hover-border-color:
 * select-filled-basic-disabled-background-color:
 * select-filled-basic-disabled-border-color:
 * select-filled-basic-disabled-icon-color:
 * select-filled-basic-disabled-text-color:
 * select-filled-primary-background-color:
 * select-filled-primary-border-color:
 * select-filled-primary-icon-color:
 * select-filled-primary-text-color:
 * select-filled-primary-placeholder-text-color:
 * select-filled-primary-focus-background-color:
 * select-filled-primary-focus-border-color:
 * select-filled-primary-hover-background-color:
 * select-filled-primary-hover-border-color:
 * select-filled-primary-disabled-background-color:
 * select-filled-primary-disabled-border-color:
 * select-filled-primary-disabled-icon-color:
 * select-filled-primary-disabled-text-color:
 * select-filled-success-background-color:
 * select-filled-success-border-color:
 * select-filled-success-icon-color:
 * select-filled-success-text-color:
 * select-filled-success-placeholder-text-color:
 * select-filled-success-focus-background-color:
 * select-filled-success-focus-border-color:
 * select-filled-success-hover-background-color:
 * select-filled-success-hover-border-color:
 * select-filled-success-disabled-background-color:
 * select-filled-success-disabled-border-color:
 * select-filled-success-disabled-icon-color:
 * select-filled-success-disabled-text-color:
 * select-filled-info-background-color:
 * select-filled-info-border-color:
 * select-filled-info-icon-color:
 * select-filled-info-text-color:
 * select-filled-info-placeholder-text-color:
 * select-filled-info-focus-background-color:
 * select-filled-info-focus-border-color:
 * select-filled-info-hover-background-color:
 * select-filled-info-hover-border-color:
 * select-filled-info-disabled-background-color:
 * select-filled-info-disabled-border-color:
 * select-filled-info-disabled-icon-color:
 * select-filled-info-disabled-text-color:
 * select-filled-warning-background-color:
 * select-filled-warning-border-color:
 * select-filled-warning-icon-color:
 * select-filled-warning-text-color:
 * select-filled-warning-placeholder-text-color:
 * select-filled-warning-focus-background-color:
 * select-filled-warning-focus-border-color:
 * select-filled-warning-hover-background-color:
 * select-filled-warning-hover-border-color:
 * select-filled-warning-disabled-background-color:
 * select-filled-warning-disabled-border-color:
 * select-filled-warning-disabled-icon-color:
 * select-filled-warning-disabled-text-color:
 * select-filled-danger-background-color:
 * select-filled-danger-border-color:
 * select-filled-danger-icon-color:
 * select-filled-danger-text-color:
 * select-filled-danger-placeholder-text-color:
 * select-filled-danger-focus-background-color:
 * select-filled-danger-focus-border-color:
 * select-filled-danger-hover-background-color:
 * select-filled-danger-hover-border-color:
 * select-filled-danger-disabled-background-color:
 * select-filled-danger-disabled-border-color:
 * select-filled-danger-disabled-icon-color:
 * select-filled-danger-disabled-text-color:
 * select-filled-control-background-color:
 * select-filled-control-border-color:
 * select-filled-control-icon-color:
 * select-filled-control-text-color:
 * select-filled-control-placeholder-text-color:
 * select-filled-control-focus-background-color:
 * select-filled-control-focus-border-color:
 * select-filled-control-hover-background-color:
 * select-filled-control-hover-border-color:
 * select-filled-control-disabled-background-color:
 * select-filled-control-disabled-border-color:
 * select-filled-control-disabled-icon-color:
 * select-filled-control-disabled-text-color:
 * select-hero-tiny-padding:
 * select-hero-small-padding:
 * select-hero-medium-padding:
 * select-hero-large-padding:
 * select-hero-giant-padding:
 * select-hero-basic-left-background-color:
 * select-hero-basic-right-background-color:
 * select-hero-basic-icon-color:
 * select-hero-basic-text-color:
 * select-hero-basic-placeholder-text-color:
 * select-hero-basic-focus-left-background-color:
 * select-hero-basic-focus-right-background-color:
 * select-hero-basic-hover-left-background-color:
 * select-hero-basic-hover-right-background-color:
 * select-hero-basic-disabled-background-color:
 * select-hero-basic-disabled-icon-color:
 * select-hero-basic-disabled-text-color:
 * select-hero-primary-left-background-color:
 * select-hero-primary-right-background-color:
 * select-hero-primary-icon-color:
 * select-hero-primary-text-color:
 * select-hero-primary-placeholder-text-color:
 * select-hero-primary-focus-left-background-color:
 * select-hero-primary-focus-right-background-color:
 * select-hero-primary-hover-left-background-color:
 * select-hero-primary-hover-right-background-color:
 * select-hero-primary-disabled-background-color:
 * select-hero-primary-disabled-icon-color:
 * select-hero-primary-disabled-text-color:
 * select-hero-success-left-background-color:
 * select-hero-success-right-background-color:
 * select-hero-success-icon-color:
 * select-hero-success-text-color:
 * select-hero-success-placeholder-text-color:
 * select-hero-success-focus-left-background-color:
 * select-hero-success-focus-right-background-color:
 * select-hero-success-hover-left-background-color:
 * select-hero-success-hover-right-background-color:
 * select-hero-success-disabled-background-color:
 * select-hero-success-disabled-icon-color:
 * select-hero-success-disabled-text-color:
 * select-hero-info-left-background-color:
 * select-hero-info-right-background-color:
 * select-hero-info-icon-color:
 * select-hero-info-text-color:
 * select-hero-info-placeholder-text-color:
 * select-hero-info-focus-left-background-color:
 * select-hero-info-focus-right-background-color:
 * select-hero-info-hover-left-background-color:
 * select-hero-info-hover-right-background-color:
 * select-hero-info-disabled-background-color:
 * select-hero-info-disabled-icon-color:
 * select-hero-info-disabled-text-color:
 * select-hero-warning-left-background-color:
 * select-hero-warning-right-background-color:
 * select-hero-warning-icon-color:
 * select-hero-warning-text-color:
 * select-hero-warning-placeholder-text-color:
 * select-hero-warning-focus-left-background-color:
 * select-hero-warning-focus-right-background-color:
 * select-hero-warning-hover-left-background-color:
 * select-hero-warning-hover-right-background-color:
 * select-hero-warning-disabled-background-color:
 * select-hero-warning-disabled-icon-color:
 * select-hero-warning-disabled-text-color:
 * select-hero-danger-left-background-color:
 * select-hero-danger-right-background-color:
 * select-hero-danger-icon-color:
 * select-hero-danger-text-color:
 * select-hero-danger-placeholder-text-color:
 * select-hero-danger-focus-left-background-color:
 * select-hero-danger-focus-right-background-color:
 * select-hero-danger-hover-left-background-color:
 * select-hero-danger-hover-right-background-color:
 * select-hero-danger-disabled-background-color:
 * select-hero-danger-disabled-icon-color:
 * select-hero-danger-disabled-text-color:
 * select-hero-control-left-background-color:
 * select-hero-control-right-background-color:
 * select-hero-control-icon-color:
 * select-hero-control-text-color:
 * select-hero-control-placeholder-text-color:
 * select-hero-control-focus-left-background-color:
 * select-hero-control-focus-right-background-color:
 * select-hero-control-hover-left-background-color:
 * select-hero-control-hover-right-background-color:
 * select-hero-control-disabled-background-color:
 * select-hero-control-disabled-icon-color:
 * select-hero-control-disabled-text-color:
 * */
export class NbSelectComponent {
    constructor(document, overlay, hostRef, positionBuilder, triggerStrategyBuilder, cd, focusKeyManagerFactoryService, focusMonitor, renderer, zone, statusService) {
        this.document = document;
        this.overlay = overlay;
        this.hostRef = hostRef;
        this.positionBuilder = positionBuilder;
        this.triggerStrategyBuilder = triggerStrategyBuilder;
        this.cd = cd;
        this.focusKeyManagerFactoryService = focusKeyManagerFactoryService;
        this.focusMonitor = focusMonitor;
        this.renderer = renderer;
        this.zone = zone;
        this.statusService = statusService;
        /**
         * Select size, available sizes:
         * `tiny`, `small`, `medium` (default), `large`, `giant`
         */
        this.size = 'medium';
        /**
         * Select status (adds specific styles):
         * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`
         */
        this.status = 'basic';
        /**
         * Select shapes: `rectangle` (default), `round`, `semi-round`
         */
        this.shape = 'rectangle';
        /**
         * Select appearances: `outline` (default), `filled`, `hero`
         */
        this.appearance = 'outline';
        this._fullWidth = false;
        /**
         * Renders select placeholder if nothing selected.
         * */
        this.placeholder = '';
        this._compareWith = (v1, v2) => v1 === v2;
        this._multiple = false;
        /**
         * Determines options overlay offset (in pixels).
         **/
        this.optionsOverlayOffset = 8;
        /**
         * Determines options overlay scroll strategy.
         **/
        this.scrollStrategy = 'block';
        /**
         * Will be emitted when selected value changes.
         * */
        this.selectedChange = new EventEmitter();
        /**
         * List of selected options.
         * */
        this.selectionModel = [];
        /**
         * Current overlay position because of we have to toggle overlayPosition
         * in [ngClass] direction and this directive can use only string.
         */
        this.overlayPosition = '';
        this.alive = true;
        this.destroy$ = new Subject();
        /**
         * Function passed through control value accessor to propagate changes.
         * */
        this.onChange = () => { };
        this.onTouched = () => { };
        /*
         * @docs-private
         **/
        this.status$ = new BehaviorSubject(this.status);
        /*
         * @docs-private
         **/
        this.size$ = new BehaviorSubject(this.size);
        /*
         * @docs-private
         **/
        this.focused$ = new BehaviorSubject(false);
        /*
         * @docs-private
         **/
        this.disabled$ = new BehaviorSubject(this.disabled);
        /*
         * @docs-private
         **/
        this.fullWidth$ = new BehaviorSubject(this.fullWidth);
    }
    /**
     * Specifies width (in pixels) to be set on `nb-option`s container (`nb-option-list`)
     * */
    get optionsWidth() {
        return this._optionsWidth ?? this.hostWidth;
    }
    set optionsWidth(value) {
        this._optionsWidth = value;
    }
    /**
     * Adds `outline` styles
     */
    get outline() {
        return this.appearance === 'outline';
    }
    set outline(value) {
        if (convertToBoolProperty(value)) {
            this.appearance = 'outline';
        }
    }
    /**
     * Adds `filled` styles
     */
    get filled() {
        return this.appearance === 'filled';
    }
    set filled(value) {
        if (convertToBoolProperty(value)) {
            this.appearance = 'filled';
        }
    }
    /**
     * Adds `hero` styles
     */
    get hero() {
        return this.appearance === 'hero';
    }
    set hero(value) {
        if (convertToBoolProperty(value)) {
            this.appearance = 'hero';
        }
    }
    /**
     * Disables the select
     */
    get disabled() {
        return !!this._disabled;
    }
    set disabled(value) {
        this._disabled = convertToBoolProperty(value);
    }
    /**
     * If set element will fill its container
     */
    get fullWidth() {
        return this._fullWidth;
    }
    set fullWidth(value) {
        this._fullWidth = convertToBoolProperty(value);
    }
    /**
     * A function to compare option value with selected value.
     * By default, values are compared with strict equality (`===`).
     */
    get compareWith() {
        return this._compareWith;
    }
    set compareWith(fn) {
        if (typeof fn !== 'function') {
            return;
        }
        this._compareWith = fn;
        if (this.selectionModel.length && this.canSelectValue()) {
            this.setSelection(this.selected);
        }
    }
    /**
     * Accepts selected item or array of selected items.
     * */
    set selected(value) {
        this.writeValue(value);
    }
    get selected() {
        return this.multiple ? this.selectionModel.map((o) => o.value) : this.selectionModel[0].value;
    }
    /**
     * Gives capability just write `multiple` over the element.
     * */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = convertToBoolProperty(value);
    }
    get additionalClasses() {
        if (this.statusService.isCustomStatus(this.status)) {
            return [this.statusService.getStatusClass(this.status)];
        }
        return [];
    }
    /**
     * Determines is select opened.
     * */
    get isOpen() {
        return this.ref && this.ref.hasAttached();
    }
    /**
     * Determines is select hidden.
     * */
    get isHidden() {
        return !this.isOpen;
    }
    /**
     * Returns width of the select button.
     * */
    get hostWidth() {
        return this.button.nativeElement.getBoundingClientRect().width;
    }
    get selectButtonClasses() {
        const classes = [];
        if (!this.selectionModel.length) {
            classes.push('placeholder');
        }
        if (!this.selectionModel.length && !this.placeholder) {
            classes.push('empty');
        }
        if (this.isOpen) {
            classes.push(this.overlayPosition);
        }
        return classes;
    }
    /**
     * Content rendered in the label.
     * */
    get selectionView() {
        if (this.selectionModel.length > 1) {
            return this.selectionModel.map((option) => option.content).join(', ');
        }
        return this.selectionModel[0].content;
    }
    ngOnChanges({ disabled, status, size, fullWidth }) {
        if (disabled) {
            this.disabled$.next(disabled.currentValue);
        }
        if (status) {
            this.status$.next(status.currentValue);
        }
        if (size) {
            this.size$.next(size.currentValue);
        }
        if (fullWidth) {
            this.fullWidth$.next(this.fullWidth);
        }
    }
    ngAfterContentInit() {
        this.options.changes
            .pipe(startWith(this.options), filter(() => this.queue != null && this.canSelectValue()), 
        // Call 'writeValue' when current change detection run is finished.
        // When writing is finished, change detection starts again, since
        // microtasks queue is empty.
        // Prevents ExpressionChangedAfterItHasBeenCheckedError.
        switchMap((options) => from(Promise.resolve(options))), takeUntil(this.destroy$))
            .subscribe(() => this.writeValue(this.queue));
    }
    ngAfterViewInit() {
        this.triggerStrategy = this.createTriggerStrategy();
        this.subscribeOnButtonFocus();
        this.subscribeOnTriggers();
        this.subscribeOnOptionClick();
        // TODO: #2254
        this.zone.runOutsideAngular(() => setTimeout(() => {
            this.renderer.addClass(this.hostRef.nativeElement, 'nb-transition');
        }));
    }
    ngOnDestroy() {
        this.alive = false;
        this.destroy$.next();
        this.destroy$.complete();
        if (this.ref) {
            this.ref.dispose();
        }
        if (this.triggerStrategy) {
            this.triggerStrategy.destroy();
        }
    }
    show() {
        if (this.shouldShow()) {
            this.attachToOverlay();
            this.positionStrategy.positionChange.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
                this.setActiveOption();
            });
            this.cd.markForCheck();
        }
    }
    hide() {
        if (this.isOpen) {
            this.ref.detach();
            this.cd.markForCheck();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cd.markForCheck();
    }
    writeValue(value) {
        if (!this.alive) {
            return;
        }
        if (this.canSelectValue()) {
            this.setSelection(value);
            if (this.selectionModel.length) {
                this.queue = null;
            }
        }
        else {
            this.queue = value;
        }
    }
    /**
     * Selects option or clear all selected options if value is null.
     * */
    handleOptionClick(option) {
        this.queue = null;
        if (option.value == null) {
            this.reset();
        }
        else {
            this.selectOption(option);
        }
        this.cd.markForCheck();
    }
    /**
     * Deselect all selected options.
     * */
    reset() {
        this.selectionModel.forEach((option) => option.deselect());
        this.selectionModel = [];
        this.hide();
        this.button.nativeElement.focus();
        this.emitSelected(this.multiple ? [] : null);
    }
    /**
     * Determines how to select option as multiple or single.
     * */
    selectOption(option) {
        if (this.multiple) {
            this.handleMultipleSelect(option);
        }
        else {
            this.handleSingleSelect(option);
        }
    }
    /**
     * Select single option.
     * */
    handleSingleSelect(option) {
        const selected = this.selectionModel.pop();
        if (selected && !this._compareWith(selected.value, option.value)) {
            selected.deselect();
        }
        this.selectionModel = [option];
        option.select();
        this.hide();
        this.button.nativeElement.focus();
        this.emitSelected(option.value);
    }
    /**
     * Select for multiple options.
     * */
    handleMultipleSelect(option) {
        if (option.selected) {
            this.selectionModel = this.selectionModel.filter((s) => !this._compareWith(s.value, option.value));
            option.deselect();
        }
        else {
            this.selectionModel.push(option);
            option.select();
        }
        this.emitSelected(this.selectionModel.map((opt) => opt.value));
    }
    attachToOverlay() {
        if (!this.ref) {
            this.createOverlay();
            this.subscribeOnPositionChange();
            this.createKeyManager();
            this.subscribeOnOverlayKeys();
        }
        this.ref.attach(this.portal);
    }
    setActiveOption() {
        if (this.selectionModel.length) {
            this.keyManager.setActiveItem(this.selectionModel[0]);
        }
        else {
            this.keyManager.setFirstItemActive();
        }
    }
    createOverlay() {
        const scrollStrategy = this.createScrollStrategy();
        this.positionStrategy = this.createPositionStrategy();
        this.ref = this.overlay.create({
            positionStrategy: this.positionStrategy,
            scrollStrategy,
            panelClass: this.optionsPanelClass,
        });
    }
    createKeyManager() {
        this.keyManager = this.focusKeyManagerFactoryService.create(this.options).withTypeAhead(200);
    }
    createPositionStrategy() {
        return this.positionBuilder
            .connectedTo(this.button)
            .position(NbPosition.BOTTOM)
            .offset(this.optionsOverlayOffset)
            .adjustment(NbAdjustment.VERTICAL);
    }
    createScrollStrategy() {
        return this.overlay.scrollStrategies[this.scrollStrategy]();
    }
    createTriggerStrategy() {
        return this.triggerStrategyBuilder
            .trigger(NbTrigger.CLICK)
            .host(this.hostRef.nativeElement)
            .container(() => this.getContainer())
            .build();
    }
    subscribeOnTriggers() {
        this.triggerStrategy.show$.subscribe(() => this.show());
        this.triggerStrategy.hide$.pipe(filter(() => this.isOpen)).subscribe(($event) => {
            this.hide();
            if (!this.isClickedWithinComponent($event)) {
                this.onTouched();
            }
        });
    }
    subscribeOnPositionChange() {
        this.positionStrategy.positionChange.pipe(takeUntil(this.destroy$)).subscribe((position) => {
            this.overlayPosition = position;
            this.cd.detectChanges();
        });
    }
    subscribeOnOptionClick() {
        /**
         * If the user changes provided options list in the runtime we have to handle this
         * and resubscribe on options selection changes event.
         * Otherwise, the user will not be able to select new options.
         * */
        this.options.changes
            .pipe(startWith(this.options), switchMap((options) => {
            return merge(...options.map((option) => option.click));
        }), takeUntil(this.destroy$))
            .subscribe((clickedOption) => this.handleOptionClick(clickedOption));
    }
    subscribeOnOverlayKeys() {
        this.ref
            .keydownEvents()
            .pipe(filter(() => this.isOpen), takeUntil(this.destroy$))
            .subscribe((event) => {
            if (event.keyCode === ESCAPE) {
                this.button.nativeElement.focus();
                this.hide();
            }
            else {
                this.keyManager.onKeydown(event);
            }
        });
        this.keyManager.tabOut.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.hide();
            this.onTouched();
        });
    }
    subscribeOnButtonFocus() {
        this.focusMonitor
            .monitor(this.button)
            .pipe(map((origin) => !!origin), finalize(() => this.focusMonitor.stopMonitoring(this.button)), takeUntil(this.destroy$))
            .subscribe(this.focused$);
    }
    getContainer() {
        return (this.ref &&
            this.ref.hasAttached() &&
            {
                location: {
                    nativeElement: this.ref.overlayElement,
                },
            });
    }
    /**
     * Propagate selected value.
     * */
    emitSelected(selected) {
        this.onChange(selected);
        this.selectedChange.emit(selected);
    }
    /**
     * Set selected value in model.
     * */
    setSelection(value) {
        const isResetValue = value == null;
        let safeValue = value;
        if (this.multiple) {
            safeValue = value ?? [];
        }
        const isArray = Array.isArray(safeValue);
        if (this.multiple && !isArray && !isResetValue) {
            throw new Error("Can't assign single value if select is marked as multiple");
        }
        if (!this.multiple && isArray) {
            throw new Error("Can't assign array if select is not marked as multiple");
        }
        const previouslySelectedOptions = this.selectionModel;
        this.selectionModel = [];
        if (this.multiple) {
            safeValue.forEach((option) => this.selectValue(option));
        }
        else {
            this.selectValue(safeValue);
        }
        // find options which were selected before and trigger deselect
        previouslySelectedOptions
            .filter((option) => !this.selectionModel.includes(option))
            .forEach((option) => option.deselect());
        this.cd.markForCheck();
    }
    /**
     * Selects value.
     * */
    selectValue(value) {
        if (value == null) {
            return;
        }
        const corresponding = this.options.find((option) => this._compareWith(option.value, value));
        if (corresponding) {
            corresponding.select();
            this.selectionModel.push(corresponding);
        }
    }
    shouldShow() {
        return this.isHidden && this.options?.length > 0;
    }
    /**
     * Sets touched if focus moved outside of button and overlay,
     * ignoring the case when focus moved to options overlay.
     */
    trySetTouched() {
        if (this.isHidden) {
            this.onTouched();
        }
    }
    isClickedWithinComponent($event) {
        return this.hostRef.nativeElement === $event.target || this.hostRef.nativeElement.contains($event.target);
    }
    canSelectValue() {
        return !!(this.options && this.options.length);
    }
    get tiny() {
        return this.size === 'tiny';
    }
    get small() {
        return this.size === 'small';
    }
    get medium() {
        return this.size === 'medium';
    }
    get large() {
        return this.size === 'large';
    }
    get giant() {
        return this.size === 'giant';
    }
    get primary() {
        return this.status === 'primary';
    }
    get info() {
        return this.status === 'info';
    }
    get success() {
        return this.status === 'success';
    }
    get warning() {
        return this.status === 'warning';
    }
    get danger() {
        return this.status === 'danger';
    }
    get basic() {
        return this.status === 'basic';
    }
    get control() {
        return this.status === 'control';
    }
    get rectangle() {
        return this.shape === 'rectangle';
    }
    get round() {
        return this.shape === 'round';
    }
    get semiRound() {
        return this.shape === 'semi-round';
    }
}
NbSelectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbSelectComponent, deps: [{ token: NB_DOCUMENT }, { token: i1.NbOverlayService }, { token: i0.ElementRef }, { token: i2.NbPositionBuilderService }, { token: i3.NbTriggerStrategyBuilderService }, { token: i0.ChangeDetectorRef }, { token: i4.NbFocusKeyManagerFactoryService }, { token: i5.NbFocusMonitor }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i6.NbStatusService }], target: i0.ɵɵFactoryTarget.Component });
NbSelectComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0", type: NbSelectComponent, selector: "nb-select", inputs: { size: "size", status: "status", shape: "shape", appearance: "appearance", optionsListClass: "optionsListClass", optionsPanelClass: "optionsPanelClass", optionsWidth: "optionsWidth", outline: "outline", filled: "filled", hero: "hero", disabled: "disabled", fullWidth: "fullWidth", placeholder: "placeholder", compareWith: "compareWith", selected: "selected", multiple: "multiple", optionsOverlayOffset: "optionsOverlayOffset", scrollStrategy: "scrollStrategy" }, outputs: { selectedChange: "selectedChange" }, host: { properties: { "class.appearance-outline": "this.outline", "class.appearance-filled": "this.filled", "class.appearance-hero": "this.hero", "class.full-width": "this.fullWidth", "class": "this.additionalClasses", "class.open": "this.isOpen", "class.size-tiny": "this.tiny", "class.size-small": "this.small", "class.size-medium": "this.medium", "class.size-large": "this.large", "class.size-giant": "this.giant", "class.status-primary": "this.primary", "class.status-info": "this.info", "class.status-success": "this.success", "class.status-warning": "this.warning", "class.status-danger": "this.danger", "class.status-basic": "this.basic", "class.status-control": "this.control", "class.shape-rectangle": "this.rectangle", "class.shape-round": "this.round", "class.shape-semi-round": "this.semiRound" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NbSelectComponent),
            multi: true,
        },
        { provide: NB_SELECT_INJECTION_TOKEN, useExisting: NbSelectComponent },
        { provide: NbFormFieldControl, useExisting: NbSelectComponent },
        { provide: NbFormFieldControlConfig, useFactory: nbSelectFormFieldControlConfigFactory },
    ], queries: [{ propertyName: "customLabel", first: true, predicate: NbSelectLabelComponent, descendants: true }, { propertyName: "options", predicate: NbOptionComponent, descendants: true }], viewQueries: [{ propertyName: "portal", first: true, predicate: NbPortalDirective, descendants: true }, { propertyName: "button", first: true, predicate: ["selectButton"], descendants: true, read: ElementRef }], usesOnChanges: true, ngImport: i0, template: "<button\n  [disabled]=\"disabled\"\n  [ngClass]=\"selectButtonClasses\"\n  (blur)=\"trySetTouched()\"\n  (keydown.arrowDown)=\"show()\"\n  (keydown.arrowUp)=\"show()\"\n  class=\"select-button\"\n  type=\"button\"\n  #selectButton\n>\n  <span (click)=\"disabled && $event.stopPropagation()\">\n    <ng-container *ngIf=\"selectionModel.length; else placeholderTemplate\">\n      <ng-container *ngIf=\"customLabel; else defaultSelectionTemplate\">\n        <ng-content select=\"nb-select-label\"></ng-content>\n      </ng-container>\n\n      <ng-template #defaultSelectionTemplate>{{ selectionView }}</ng-template>\n    </ng-container>\n\n    <ng-template #placeholderTemplate>{{ placeholder }}</ng-template>\n  </span>\n\n  <nb-icon\n    icon=\"chevron-down-outline\"\n    pack=\"ang-essentials\"\n    (click)=\"disabled && $event.stopPropagation()\"\n    aria-hidden=\"true\"\n  >\n  </nb-icon>\n</button>\n\n<nb-option-list\n  *nbPortal\n  [size]=\"size\"\n  [position]=\"overlayPosition\"\n  [style.width.px]=\"optionsWidth\"\n  [ngClass]=\"optionsListClass\"\n>\n  <ng-content select=\"nb-option, nb-option-group\"></ng-content>\n</nb-option-list>\n", styles: ["/**\n * @license\n * \n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//*!\n * @license\n * \n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:inline-block;max-width:100%}[dir=ltr] :host .select-button{text-align:left}[dir=ltr] :host .select-button nb-icon{right:.2em}[dir=rtl] :host .select-button{text-align:right}[dir=rtl] :host .select-button nb-icon{left:.2em}:host(.full-width){width:100%}:host(.nb-transition) .select-button{transition-duration:.15s;transition-property:background-color,border-color,border-radius,box-shadow,color;transition-timing-function:ease-in}.select-button{position:relative;width:100%;overflow:hidden;text-overflow:ellipsis;text-transform:none;white-space:nowrap}nb-icon{font-size:1.5em;position:absolute;top:50%;transform:translateY(-50%);transition-duration:.15s;transition-property:transform;transition-timing-function:ease-in}[dir=ltr] nb-icon{right:.5rem}[dir=rtl] nb-icon{left:.5rem}:host(.open) nb-icon{transform:translateY(-50%) rotate(180deg)}\n"], components: [{ type: i7.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { type: i8.NbOptionListComponent, selector: "nb-option-list", inputs: ["size", "position"] }], directives: [{ type: i9.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i10.NbPortalDirective, selector: "[nbPortal]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-select', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NbSelectComponent),
                            multi: true,
                        },
                        { provide: NB_SELECT_INJECTION_TOKEN, useExisting: NbSelectComponent },
                        { provide: NbFormFieldControl, useExisting: NbSelectComponent },
                        { provide: NbFormFieldControlConfig, useFactory: nbSelectFormFieldControlConfigFactory },
                    ], template: "<button\n  [disabled]=\"disabled\"\n  [ngClass]=\"selectButtonClasses\"\n  (blur)=\"trySetTouched()\"\n  (keydown.arrowDown)=\"show()\"\n  (keydown.arrowUp)=\"show()\"\n  class=\"select-button\"\n  type=\"button\"\n  #selectButton\n>\n  <span (click)=\"disabled && $event.stopPropagation()\">\n    <ng-container *ngIf=\"selectionModel.length; else placeholderTemplate\">\n      <ng-container *ngIf=\"customLabel; else defaultSelectionTemplate\">\n        <ng-content select=\"nb-select-label\"></ng-content>\n      </ng-container>\n\n      <ng-template #defaultSelectionTemplate>{{ selectionView }}</ng-template>\n    </ng-container>\n\n    <ng-template #placeholderTemplate>{{ placeholder }}</ng-template>\n  </span>\n\n  <nb-icon\n    icon=\"chevron-down-outline\"\n    pack=\"ang-essentials\"\n    (click)=\"disabled && $event.stopPropagation()\"\n    aria-hidden=\"true\"\n  >\n  </nb-icon>\n</button>\n\n<nb-option-list\n  *nbPortal\n  [size]=\"size\"\n  [position]=\"overlayPosition\"\n  [style.width.px]=\"optionsWidth\"\n  [ngClass]=\"optionsListClass\"\n>\n  <ng-content select=\"nb-option, nb-option-group\"></ng-content>\n</nb-option-list>\n", styles: ["/**\n * @license\n * \n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//*!\n * @license\n * \n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:inline-block;max-width:100%}[dir=ltr] :host .select-button{text-align:left}[dir=ltr] :host .select-button nb-icon{right:.2em}[dir=rtl] :host .select-button{text-align:right}[dir=rtl] :host .select-button nb-icon{left:.2em}:host(.full-width){width:100%}:host(.nb-transition) .select-button{transition-duration:.15s;transition-property:background-color,border-color,border-radius,box-shadow,color;transition-timing-function:ease-in}.select-button{position:relative;width:100%;overflow:hidden;text-overflow:ellipsis;text-transform:none;white-space:nowrap}nb-icon{font-size:1.5em;position:absolute;top:50%;transform:translateY(-50%);transition-duration:.15s;transition-property:transform;transition-timing-function:ease-in}[dir=ltr] nb-icon{right:.5rem}[dir=rtl] nb-icon{left:.5rem}:host(.open) nb-icon{transform:translateY(-50%) rotate(180deg)}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_DOCUMENT]
                }] }, { type: i1.NbOverlayService }, { type: i0.ElementRef }, { type: i2.NbPositionBuilderService }, { type: i3.NbTriggerStrategyBuilderService }, { type: i0.ChangeDetectorRef }, { type: i4.NbFocusKeyManagerFactoryService }, { type: i5.NbFocusMonitor }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i6.NbStatusService }]; }, propDecorators: { size: [{
                type: Input
            }], status: [{
                type: Input
            }], shape: [{
                type: Input
            }], appearance: [{
                type: Input
            }], optionsListClass: [{
                type: Input
            }], optionsPanelClass: [{
                type: Input
            }], optionsWidth: [{
                type: Input
            }], outline: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.appearance-outline']
            }], filled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.appearance-filled']
            }], hero: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.appearance-hero']
            }], disabled: [{
                type: Input
            }], fullWidth: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.full-width']
            }], placeholder: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], selected: [{
                type: Input
            }], multiple: [{
                type: Input
            }], optionsOverlayOffset: [{
                type: Input
            }], scrollStrategy: [{
                type: Input
            }], additionalClasses: [{
                type: HostBinding,
                args: ['class']
            }], selectedChange: [{
                type: Output
            }], options: [{
                type: ContentChildren,
                args: [NbOptionComponent, { descendants: true }]
            }], customLabel: [{
                type: ContentChild,
                args: [NbSelectLabelComponent]
            }], portal: [{
                type: ViewChild,
                args: [NbPortalDirective]
            }], button: [{
                type: ViewChild,
                args: ['selectButton', { read: ElementRef }]
            }], isOpen: [{
                type: HostBinding,
                args: ['class.open']
            }], tiny: [{
                type: HostBinding,
                args: ['class.size-tiny']
            }], small: [{
                type: HostBinding,
                args: ['class.size-small']
            }], medium: [{
                type: HostBinding,
                args: ['class.size-medium']
            }], large: [{
                type: HostBinding,
                args: ['class.size-large']
            }], giant: [{
                type: HostBinding,
                args: ['class.size-giant']
            }], primary: [{
                type: HostBinding,
                args: ['class.status-primary']
            }], info: [{
                type: HostBinding,
                args: ['class.status-info']
            }], success: [{
                type: HostBinding,
                args: ['class.status-success']
            }], warning: [{
                type: HostBinding,
                args: ['class.status-warning']
            }], danger: [{
                type: HostBinding,
                args: ['class.status-danger']
            }], basic: [{
                type: HostBinding,
                args: ['class.status-basic']
            }], control: [{
                type: HostBinding,
                args: ['class.status-control']
            }], rectangle: [{
                type: HostBinding,
                args: ['class.shape-rectangle']
            }], round: [{
                type: HostBinding,
                args: ['class.shape-round']
            }], semiRound: [{
                type: HostBinding,
                args: ['class.shape-semi-round']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBR0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLFdBQVcsRUFDWCxNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFFTixTQUFTLEdBS1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzlGLE9BQU8sRUFFTCxZQUFZLEVBQ1osVUFBVSxHQUVYLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUFnQixpQkFBaUIsRUFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUUzRixPQUFPLEVBQUUsU0FBUyxFQUFzRCxNQUFNLGdDQUFnQyxDQUFDO0FBRS9HLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUlsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRC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VixjQUFjO3NCQUF2QixNQUFNO2dCQU1vRCxPQUFPO3NCQUFqRSxlQUFlO3VCQUFDLGlCQUFpQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtnQkFLbkIsV0FBVztzQkFBaEQsWUFBWTt1QkFBQyxzQkFBc0I7Z0JBS04sTUFBTTtzQkFBbkMsU0FBUzt1QkFBQyxpQkFBaUI7Z0JBRXFCLE1BQU07c0JBQXRELFNBQVM7dUJBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtnQkFNM0MsTUFBTTtzQkFEVCxXQUFXO3VCQUFDLFlBQVk7Z0JBZ2dCckIsSUFBSTtzQkFEUCxXQUFXO3VCQUFDLGlCQUFpQjtnQkFLMUIsS0FBSztzQkFEUixXQUFXO3VCQUFDLGtCQUFrQjtnQkFLM0IsTUFBTTtzQkFEVCxXQUFXO3VCQUFDLG1CQUFtQjtnQkFLNUIsS0FBSztzQkFEUixXQUFXO3VCQUFDLGtCQUFrQjtnQkFLM0IsS0FBSztzQkFEUixXQUFXO3VCQUFDLGtCQUFrQjtnQkFLM0IsT0FBTztzQkFEVixXQUFXO3VCQUFDLHNCQUFzQjtnQkFLL0IsSUFBSTtzQkFEUCxXQUFXO3VCQUFDLG1CQUFtQjtnQkFLNUIsT0FBTztzQkFEVixXQUFXO3VCQUFDLHNCQUFzQjtnQkFLL0IsT0FBTztzQkFEVixXQUFXO3VCQUFDLHNCQUFzQjtnQkFLL0IsTUFBTTtzQkFEVCxXQUFXO3VCQUFDLHFCQUFxQjtnQkFLOUIsS0FBSztzQkFEUixXQUFXO3VCQUFDLG9CQUFvQjtnQkFLN0IsT0FBTztzQkFEVixXQUFXO3VCQUFDLHNCQUFzQjtnQkFLL0IsU0FBUztzQkFEWixXQUFXO3VCQUFDLHVCQUF1QjtnQkFLaEMsS0FBSztzQkFEUixXQUFXO3VCQUFDLG1CQUFtQjtnQkFLNUIsU0FBUztzQkFEWixXQUFXO3VCQUFDLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50UmVmLFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkNoYW5nZXMsXG4gIFJlbmRlcmVyMixcbiAgTmdab25lLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ2xhc3MgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdCwgZnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCwgZmlsdGVyLCBtYXAsIGZpbmFsaXplLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOYlN0YXR1c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zdGF0dXMuc2VydmljZSc7XG5pbXBvcnQge1xuICBOYkFkanVzdGFibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LFxuICBOYkFkanVzdG1lbnQsXG4gIE5iUG9zaXRpb24sXG4gIE5iUG9zaXRpb25CdWlsZGVyU2VydmljZSxcbn0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS1wb3NpdGlvbic7XG5pbXBvcnQgeyBOYk92ZXJsYXlSZWYsIE5iUG9ydGFsRGlyZWN0aXZlLCBOYlNjcm9sbFN0cmF0ZWd5IH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvbWFwcGluZyc7XG5pbXBvcnQgeyBOYk92ZXJsYXlTZXJ2aWNlIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS1zZXJ2aWNlJztcbmltcG9ydCB7IE5iVHJpZ2dlciwgTmJUcmlnZ2VyU3RyYXRlZ3ksIE5iVHJpZ2dlclN0cmF0ZWd5QnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9vdmVybGF5LXRyaWdnZXInO1xuaW1wb3J0IHsgTmJGb2N1c0tleU1hbmFnZXIsIE5iRm9jdXNLZXlNYW5hZ2VyRmFjdG9yeVNlcnZpY2UgfSBmcm9tICcuLi9jZGsvYTExeS9mb2N1cy1rZXktbWFuYWdlcic7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICcuLi9jZGsva2V5Y29kZXMva2V5Y29kZXMnO1xuaW1wb3J0IHsgTmJDb21wb25lbnRTaXplIH0gZnJvbSAnLi4vY29tcG9uZW50LXNpemUnO1xuaW1wb3J0IHsgTmJDb21wb25lbnRTaGFwZSB9IGZyb20gJy4uL2NvbXBvbmVudC1zaGFwZSc7XG5pbXBvcnQgeyBOYkNvbXBvbmVudE9yQ3VzdG9tU3RhdHVzIH0gZnJvbSAnLi4vY29tcG9uZW50LXN0YXR1cyc7XG5pbXBvcnQgeyBOQl9ET0NVTUVOVCB9IGZyb20gJy4uLy4uL3RoZW1lLm9wdGlvbnMnO1xuaW1wb3J0IHsgTmJPcHRpb25Db21wb25lbnQgfSBmcm9tICcuLi9vcHRpb24vb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBjb252ZXJ0VG9Cb29sUHJvcGVydHksIE5iQm9vbGVhbklucHV0IH0gZnJvbSAnLi4vaGVscGVycyc7XG5pbXBvcnQgeyBOQl9TRUxFQ1RfSU5KRUNUSU9OX1RPS0VOIH0gZnJvbSAnLi9zZWxlY3QtaW5qZWN0aW9uLXRva2Vucyc7XG5pbXBvcnQgeyBOYkZvcm1GaWVsZENvbnRyb2wsIE5iRm9ybUZpZWxkQ29udHJvbENvbmZpZyB9IGZyb20gJy4uL2Zvcm0tZmllbGQvZm9ybS1maWVsZC1jb250cm9sJztcbmltcG9ydCB7IE5iRm9jdXNNb25pdG9yIH0gZnJvbSAnLi4vY2RrL2ExMXkvYTExeS5tb2R1bGUnO1xuaW1wb3J0IHsgTmJTY3JvbGxTdHJhdGVnaWVzIH0gZnJvbSAnLi4vY2RrL2FkYXB0ZXIvYmxvY2stc2Nyb2xsLXN0cmF0ZWd5LWFkYXB0ZXInO1xuXG5leHBvcnQgdHlwZSBOYlNlbGVjdENvbXBhcmVGdW5jdGlvbjxUID0gYW55PiA9ICh2MTogYW55LCB2MjogYW55KSA9PiBib29sZWFuO1xuZXhwb3J0IHR5cGUgTmJTZWxlY3RBcHBlYXJhbmNlID0gJ291dGxpbmUnIHwgJ2ZpbGxlZCcgfCAnaGVybyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLXNlbGVjdC1sYWJlbCcsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIE5iU2VsZWN0TGFiZWxDb21wb25lbnQge31cblxuZXhwb3J0IGZ1bmN0aW9uIG5iU2VsZWN0Rm9ybUZpZWxkQ29udHJvbENvbmZpZ0ZhY3RvcnkoKSB7XG4gIGNvbnN0IGNvbmZpZyA9IG5ldyBOYkZvcm1GaWVsZENvbnRyb2xDb25maWcoKTtcbiAgY29uZmlnLnN1cHBvcnRzU3VmZml4ID0gZmFsc2U7XG4gIHJldHVybiBjb25maWc7XG59XG5cbi8qKlxuICogVGhlIGBOYlNlbGVjdENvbXBvbmVudGAgcHJvdmlkZXMgYSBjYXBhYmlsaXR5IHRvIHNlbGVjdCBvbmUgb2YgdGhlIHBhc3NlZCBpdGVtcy5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKFNob3djYXNlLCBzZWxlY3Qvc2VsZWN0LXNob3djYXNlLmNvbXBvbmVudClcbiAqXG4gKiAjIyMgSW5zdGFsbGF0aW9uXG4gKlxuICogSW1wb3J0IGBOYlNlbGVjdE1vZHVsZWAgdG8geW91ciBmZWF0dXJlIG1vZHVsZS5cbiAqIGBgYHRzXG4gKiBATmdNb2R1bGUoe1xuICogICBpbXBvcnRzOiBbXG4gKiAgICAgLy8gLi4uXG4gKiAgICAgTmJTZWxlY3RNb2R1bGUsXG4gKiAgIF0sXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIFBhZ2VNb2R1bGUgeyB9XG4gKiBgYGBcbiAqICMjIyBVc2FnZVxuICpcbiAqIElmIHlvdSB3YW50IHRvIHVzZSBpdCBhcyB0aGUgbXVsdGktc2VsZWN0IGNvbnRyb2wgeW91IGhhdmUgdG8gbWFyayBpdCBhcyBgbXVsdGlwbGVgLlxuICogSW4gdGhpcyBjYXNlLCBgbmItc2VsZWN0YCB3aWxsIHdvcmsgb25seSB3aXRoIGFycmF5cyAtIGFjY2VwdCBhcnJheXMgYW5kIHByb3BhZ2F0ZSBhcnJheXMuXG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShNdWx0aXBsZSwgc2VsZWN0L3NlbGVjdC1tdWx0aXBsZS5jb21wb25lbnQpXG4gKlxuICogSXRlbXMgd2l0aG91dCB2YWx1ZXMgd2lsbCBjbGVhbiB0aGUgc2VsZWN0aW9uLiBCb3RoIGBudWxsYCBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzIHdpbGwgYWxzbyBjbGVhbiB0aGUgc2VsZWN0aW9uLlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoQ2xlYW4gc2VsZWN0aW9uLCBzZWxlY3Qvc2VsZWN0LWNsZWFuLmNvbXBvbmVudClcbiAqXG4gKiBTZWxlY3QgbWF5IGJlIGJvdW5kZWQgdXNpbmcgYHNlbGVjdGVkYCBpbnB1dDpcbiAqXG4gKiBgYGBodG1sXG4gKiA8bmItc2VsZWN0IFsoc2VsZWN0ZWQpXT1cInNlbGVjdGVkXCI+PC9uYi1zZWxlY3RlZD5cbiAqIGBgYFxuICpcbiAqIE9yIHlvdSBjYW4gYmluZCBjb250cm9sIHdpdGggZm9ybSBjb250cm9scyBvciBuZ01vZGVsOlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoU2VsZWN0IGZvcm0gYmluZGluZywgc2VsZWN0L3NlbGVjdC1mb3JtLmNvbXBvbmVudClcbiAqXG4gKiBPcHRpb25zIGluIHRoZSBzZWxlY3QgbWF5IGJlIGdyb3VwZWQgdXNpbmcgYG5iLW9wdGlvbi1ncm91cGAgY29tcG9uZW50LlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoR3JvdXBpbmcsIHNlbGVjdC9zZWxlY3QtZ3JvdXBzLmNvbXBvbmVudClcbiAqXG4gKiBTZWxlY3QgbWF5IGhhdmUgYSBwbGFjZWhvbGRlciB0aGF0IHdpbGwgYmUgc2hvd24gd2hlbiBub3RoaW5nIHNlbGVjdGVkOlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoUGxhY2Vob2xkZXIsIHNlbGVjdC9zZWxlY3QtcGxhY2Vob2xkZXIuY29tcG9uZW50KVxuICpcbiAqIFlvdSBjYW4gZGlzYWJsZSBzZWxlY3QsIG9wdGlvbnMgYW5kIHdob2xlIGdyb3Vwcy5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKERpc2FibGVkIHNlbGVjdCwgc2VsZWN0L3NlbGVjdC1kaXNhYmxlZC5jb21wb25lbnQpXG4gKlxuICogQWxzbywgdGhlIGN1c3RvbSBsYWJlbCBtYXkgYmUgcHJvdmlkZWQgaW4gc2VsZWN0LlxuICogVGhpcyBjdXN0b20gbGFiZWwgd2lsbCBiZSB1c2VkIGZvciBpbnN0ZWFkIHBsYWNlaG9sZGVyIHdoZW4gc29tZXRoaW5nIHNlbGVjdGVkLlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoQ3VzdG9tIGxhYmVsLCBzZWxlY3Qvc2VsZWN0LWxhYmVsLmNvbXBvbmVudClcbiAqXG4gKiBEZWZhdWx0IGBuYi1zZWxlY3RgIHNpemUgaXMgYG1lZGl1bWAgYW5kIHN0YXR1cyBpcyBgYmFzaWNgLlxuICogU2VsZWN0IGlzIGF2YWlsYWJsZSBpbiBtdWx0aXBsZSBjb2xvcnMgdXNpbmcgYHN0YXR1c2AgcHJvcGVydHk6XG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShTZWxlY3Qgc3RhdHVzZXMsIHNlbGVjdC9zZWxlY3Qtc3RhdHVzLmNvbXBvbmVudClcbiAqXG4gKiBUaGVyZSBhcmUgZml2ZSBzZWxlY3Qgc2l6ZXM6XG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShTZWxlY3Qgc2l6ZXMsIHNlbGVjdC9zZWxlY3Qtc2l6ZXMuY29tcG9uZW50KVxuICpcbiAqIEFuZCB0d28gYWRkaXRpb25hbCBzdHlsZSB0eXBlcyAtIGBmaWxsZWRgOlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoRmlsbGVkIHNlbGVjdCwgc2VsZWN0L3NlbGVjdC1maWxsZWQuY29tcG9uZW50KVxuICpcbiAqIGFuZCBgaGVyb2A6XG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShTZWxlY3QgY29sb3JzLCBzZWxlY3Qvc2VsZWN0LWhlcm8uY29tcG9uZW50KVxuICpcbiAqIFNlbGVjdCBpcyBhdmFpbGFibGUgaW4gZGlmZmVyZW50IHNoYXBlcywgdGhhdCBjb3VsZCBiZSBjb21iaW5lZCB3aXRoIHRoZSBvdGhlciBwcm9wZXJ0aWVzOlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoU2VsZWN0IHNoYXBlcywgc2VsZWN0L3NlbGVjdC1zaGFwZXMuY29tcG9uZW50KVxuICpcbiAqIEJ5IGRlZmF1bHQsIHRoZSBjb21wb25lbnQgc2VsZWN0cyBvcHRpb25zIHdob3NlIHZhbHVlcyBhcmUgc3RyaWN0bHkgZXF1YWwgKGA9PT1gKSB3aXRoIHRoZSBzZWxlY3QgdmFsdWUuXG4gKiBUbyBjaGFuZ2Ugc3VjaCBiZWhhdmlvciwgcGFzcyBhIGN1c3RvbSBjb21wYXJhdG9yIGZ1bmN0aW9uIHRvIHRoZSBgY29tcGFyZVdpdGhgIGF0dHJpYnV0ZS5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKFNlbGVjdCBjdXN0b20gY29tcGFyYXRvciwgc2VsZWN0L3NlbGVjdC1jb21wYXJlLXdpdGguY29tcG9uZW50KVxuICpcbiAqIFlvdSBjYW4gYWRkIGFuIGFkZGl0aW9uYWwgaWNvbiB0byB0aGUgc2VsZWN0IHZpYSB0aGUgYG5iLWZvcm0tZmllbGRgIGNvbXBvbmVudDpcbiAqIEBzdGFja2VkLWV4YW1wbGUoU2VsZWN0IHdpdGggaWNvbiwgc2VsZWN0L3NlbGVjdC1pY29uLmNvbXBvbmVudClcbiAqXG4gKiBAYWRkaXRpb25hbC1leGFtcGxlKEludGVyYWN0aXZlLCBzZWxlY3Qvc2VsZWN0LWludGVyYWN0aXZlLmNvbXBvbmVudClcbiAqXG4gKiBAc3R5bGVzXG4gKlxuICogc2VsZWN0LWN1cnNvcjpcbiAqIHNlbGVjdC1kaXNhYmxlZC1jdXJzb3I6XG4gKiBzZWxlY3QtbWluLXdpZHRoOlxuICogc2VsZWN0LW91dGxpbmUtd2lkdGg6XG4gKiBzZWxlY3Qtb3V0bGluZS1jb2xvcjpcbiAqIHNlbGVjdC1pY29uLW9mZnNldDpcbiAqIHNlbGVjdC10ZXh0LWZvbnQtZmFtaWx5OlxuICogc2VsZWN0LXBsYWNlaG9sZGVyLXRleHQtZm9udC1mYW1pbHk6XG4gKiBzZWxlY3QtdGlueS10ZXh0LWZvbnQtc2l6ZTpcbiAqIHNlbGVjdC10aW55LXRleHQtZm9udC13ZWlnaHQ6XG4gKiBzZWxlY3QtdGlueS10ZXh0LWxpbmUtaGVpZ2h0OlxuICogc2VsZWN0LXRpbnktcGxhY2Vob2xkZXItdGV4dC1mb250LXNpemU6XG4gKiBzZWxlY3QtdGlueS1wbGFjZWhvbGRlci10ZXh0LWZvbnQtd2VpZ2h0OlxuICogc2VsZWN0LXRpbnktbWF4LXdpZHRoOlxuICogc2VsZWN0LXNtYWxsLXRleHQtZm9udC1zaXplOlxuICogc2VsZWN0LXNtYWxsLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBzZWxlY3Qtc21hbGwtdGV4dC1saW5lLWhlaWdodDpcbiAqIHNlbGVjdC1zbWFsbC1wbGFjZWhvbGRlci10ZXh0LWZvbnQtc2l6ZTpcbiAqIHNlbGVjdC1zbWFsbC1wbGFjZWhvbGRlci10ZXh0LWZvbnQtd2VpZ2h0OlxuICogc2VsZWN0LXNtYWxsLW1heC13aWR0aDpcbiAqIHNlbGVjdC1tZWRpdW0tdGV4dC1mb250LXNpemU6XG4gKiBzZWxlY3QtbWVkaXVtLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBzZWxlY3QtbWVkaXVtLXRleHQtbGluZS1oZWlnaHQ6XG4gKiBzZWxlY3QtbWVkaXVtLXBsYWNlaG9sZGVyLXRleHQtZm9udC1zaXplOlxuICogc2VsZWN0LW1lZGl1bS1wbGFjZWhvbGRlci10ZXh0LWZvbnQtd2VpZ2h0OlxuICogc2VsZWN0LW1lZGl1bS1tYXgtd2lkdGg6XG4gKiBzZWxlY3QtbGFyZ2UtdGV4dC1mb250LXNpemU6XG4gKiBzZWxlY3QtbGFyZ2UtdGV4dC1mb250LXdlaWdodDpcbiAqIHNlbGVjdC1sYXJnZS10ZXh0LWxpbmUtaGVpZ2h0OlxuICogc2VsZWN0LWxhcmdlLXBsYWNlaG9sZGVyLXRleHQtZm9udC1zaXplOlxuICogc2VsZWN0LWxhcmdlLXBsYWNlaG9sZGVyLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBzZWxlY3QtbGFyZ2UtbWF4LXdpZHRoOlxuICogc2VsZWN0LWdpYW50LXRleHQtZm9udC1zaXplOlxuICogc2VsZWN0LWdpYW50LXRleHQtZm9udC13ZWlnaHQ6XG4gKiBzZWxlY3QtZ2lhbnQtdGV4dC1saW5lLWhlaWdodDpcbiAqIHNlbGVjdC1naWFudC1wbGFjZWhvbGRlci10ZXh0LWZvbnQtc2l6ZTpcbiAqIHNlbGVjdC1naWFudC1wbGFjZWhvbGRlci10ZXh0LWZvbnQtd2VpZ2h0OlxuICogc2VsZWN0LWdpYW50LW1heC13aWR0aDpcbiAqIHNlbGVjdC1yZWN0YW5nbGUtYm9yZGVyLXJhZGl1czpcbiAqIHNlbGVjdC1zZW1pLXJvdW5kLWJvcmRlci1yYWRpdXM6XG4gKiBzZWxlY3Qtcm91bmQtYm9yZGVyLXJhZGl1czpcbiAqIHNlbGVjdC1vdXRsaW5lLWJvcmRlci1zdHlsZTpcbiAqIHNlbGVjdC1vdXRsaW5lLWJvcmRlci13aWR0aDpcbiAqIHNlbGVjdC1vdXRsaW5lLXRpbnktcGFkZGluZzpcbiAqIHNlbGVjdC1vdXRsaW5lLXNtYWxsLXBhZGRpbmc6XG4gKiBzZWxlY3Qtb3V0bGluZS1tZWRpdW0tcGFkZGluZzpcbiAqIHNlbGVjdC1vdXRsaW5lLWxhcmdlLXBhZGRpbmc6XG4gKiBzZWxlY3Qtb3V0bGluZS1naWFudC1wYWRkaW5nOlxuICogc2VsZWN0LW91dGxpbmUtYmFzaWMtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWJhc2ljLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1iYXNpYy1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtYmFzaWMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWJhc2ljLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWJhc2ljLWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1iYXNpYy1mb2N1cy1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1iYXNpYy1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtYmFzaWMtaG92ZXItYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtYmFzaWMtZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWJhc2ljLWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWJhc2ljLWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1iYXNpYy1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtcHJpbWFyeS1pY29uLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtcHJpbWFyeS10ZXh0LWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtcHJpbWFyeS1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtcHJpbWFyeS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtcHJpbWFyeS1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1wcmltYXJ5LWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1wcmltYXJ5LWZvY3VzLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXByaW1hcnktaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXByaW1hcnktaG92ZXItYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtcHJpbWFyeS1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtcHJpbWFyeS1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1wcmltYXJ5LWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1wcmltYXJ5LWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1zdWNjZXNzLWljb24tY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1zdWNjZXNzLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1zdWNjZXNzLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1zdWNjZXNzLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1zdWNjZXNzLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXN1Y2Nlc3MtZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXN1Y2Nlc3MtZm9jdXMtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtc3VjY2Vzcy1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtc3VjY2Vzcy1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1zdWNjZXNzLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1zdWNjZXNzLWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXN1Y2Nlc3MtZGlzYWJsZWQtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXN1Y2Nlc3MtZGlzYWJsZWQtdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWluZm8taWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWluZm8tdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWluZm8tcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWluZm8tYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWluZm8tYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtaW5mby1mb2N1cy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtaW5mby1mb2N1cy1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1pbmZvLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1pbmZvLWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWluZm8tZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWluZm8tZGlzYWJsZWQtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtaW5mby1kaXNhYmxlZC1pY29uLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtaW5mby1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtd2FybmluZy1pY29uLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtd2FybmluZy10ZXh0LWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtd2FybmluZy1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtd2FybmluZy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtd2FybmluZy1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS13YXJuaW5nLWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS13YXJuaW5nLWZvY3VzLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXdhcm5pbmctaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXdhcm5pbmctaG92ZXItYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtd2FybmluZy1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtd2FybmluZy1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS13YXJuaW5nLWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS13YXJuaW5nLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1kYW5nZXItaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWRhbmdlci10ZXh0LWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtZGFuZ2VyLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1kYW5nZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWRhbmdlci1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1kYW5nZXItZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWRhbmdlci1mb2N1cy1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1kYW5nZXItaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWRhbmdlci1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1kYW5nZXItZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWRhbmdlci1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1kYW5nZXItZGlzYWJsZWQtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWRhbmdlci1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtY29udHJvbC1pY29uLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtY29udHJvbC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtY29udHJvbC1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtY29udHJvbC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtY29udHJvbC1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1jb250cm9sLWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1jb250cm9sLWZvY3VzLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWNvbnRyb2wtaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWNvbnRyb2wtaG92ZXItYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtY29udHJvbC1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtY29udHJvbC1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1jb250cm9sLWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1jb250cm9sLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1hZGphY2VudC1ib3JkZXItc3R5bGU6XG4gKiBzZWxlY3Qtb3V0bGluZS1hZGphY2VudC1ib3JkZXItd2lkdGg6XG4gKiBzZWxlY3Qtb3V0bGluZS1iYXNpYy1vcGVuLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWJhc2ljLWFkamFjZW50LWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXByaW1hcnktb3Blbi1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1wcmltYXJ5LWFkamFjZW50LWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXN1Y2Nlc3Mtb3Blbi1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1zdWNjZXNzLWFkamFjZW50LWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWluZm8tb3Blbi1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1pbmZvLWFkamFjZW50LWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLXdhcm5pbmctb3Blbi1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS13YXJuaW5nLWFkamFjZW50LWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWRhbmdlci1vcGVuLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1vdXRsaW5lLWRhbmdlci1hZGphY2VudC1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3Qtb3V0bGluZS1jb250cm9sLW9wZW4tYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LW91dGxpbmUtY29udHJvbC1hZGphY2VudC1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWJvcmRlci1zdHlsZTpcbiAqIHNlbGVjdC1maWxsZWQtYm9yZGVyLXdpZHRoOlxuICogc2VsZWN0LWZpbGxlZC10aW55LXBhZGRpbmc6XG4gKiBzZWxlY3QtZmlsbGVkLXNtYWxsLXBhZGRpbmc6XG4gKiBzZWxlY3QtZmlsbGVkLW1lZGl1bS1wYWRkaW5nOlxuICogc2VsZWN0LWZpbGxlZC1sYXJnZS1wYWRkaW5nOlxuICogc2VsZWN0LWZpbGxlZC1naWFudC1wYWRkaW5nOlxuICogc2VsZWN0LWZpbGxlZC1iYXNpYy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1iYXNpYy1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWJhc2ljLWljb24tY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWJhc2ljLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWJhc2ljLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWJhc2ljLWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWJhc2ljLWZvY3VzLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtYmFzaWMtaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtYmFzaWMtaG92ZXItYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1iYXNpYy1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1iYXNpYy1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWJhc2ljLWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWJhc2ljLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXByaW1hcnktYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtcHJpbWFyeS1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXByaW1hcnktaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtcHJpbWFyeS10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1wcmltYXJ5LXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXByaW1hcnktZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtcHJpbWFyeS1mb2N1cy1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXByaW1hcnktaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtcHJpbWFyeS1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXByaW1hcnktZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtcHJpbWFyeS1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXByaW1hcnktZGlzYWJsZWQtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtcHJpbWFyeS1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1zdWNjZXNzLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXN1Y2Nlc3MtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1zdWNjZXNzLWljb24tY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXN1Y2Nlc3MtdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtc3VjY2Vzcy1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1zdWNjZXNzLWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXN1Y2Nlc3MtZm9jdXMtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1zdWNjZXNzLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXN1Y2Nlc3MtaG92ZXItYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1zdWNjZXNzLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXN1Y2Nlc3MtZGlzYWJsZWQtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1zdWNjZXNzLWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXN1Y2Nlc3MtZGlzYWJsZWQtdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtaW5mby1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1pbmZvLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtaW5mby1pY29uLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1pbmZvLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWluZm8tcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtaW5mby1mb2N1cy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1pbmZvLWZvY3VzLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtaW5mby1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1pbmZvLWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtaW5mby1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1pbmZvLWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtaW5mby1kaXNhYmxlZC1pY29uLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1pbmZvLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXdhcm5pbmctYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtd2FybmluZy1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXdhcm5pbmctaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtd2FybmluZy10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC13YXJuaW5nLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXdhcm5pbmctZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtd2FybmluZy1mb2N1cy1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXdhcm5pbmctaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtd2FybmluZy1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXdhcm5pbmctZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtd2FybmluZy1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLXdhcm5pbmctZGlzYWJsZWQtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtd2FybmluZy1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1kYW5nZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtZGFuZ2VyLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtZGFuZ2VyLWljb24tY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWRhbmdlci10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1kYW5nZXItcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtZGFuZ2VyLWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWRhbmdlci1mb2N1cy1ib3JkZXItY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWRhbmdlci1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1kYW5nZXItaG92ZXItYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1kYW5nZXItZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtZGFuZ2VyLWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtZGFuZ2VyLWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWRhbmdlci1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1jb250cm9sLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWNvbnRyb2wtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1jb250cm9sLWljb24tY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWNvbnRyb2wtdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1maWxsZWQtY29udHJvbC1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1jb250cm9sLWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWNvbnRyb2wtZm9jdXMtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1jb250cm9sLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWNvbnRyb2wtaG92ZXItYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1jb250cm9sLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWNvbnRyb2wtZGlzYWJsZWQtYm9yZGVyLWNvbG9yOlxuICogc2VsZWN0LWZpbGxlZC1jb250cm9sLWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3QtZmlsbGVkLWNvbnRyb2wtZGlzYWJsZWQtdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXRpbnktcGFkZGluZzpcbiAqIHNlbGVjdC1oZXJvLXNtYWxsLXBhZGRpbmc6XG4gKiBzZWxlY3QtaGVyby1tZWRpdW0tcGFkZGluZzpcbiAqIHNlbGVjdC1oZXJvLWxhcmdlLXBhZGRpbmc6XG4gKiBzZWxlY3QtaGVyby1naWFudC1wYWRkaW5nOlxuICogc2VsZWN0LWhlcm8tYmFzaWMtbGVmdC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tYmFzaWMtcmlnaHQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWJhc2ljLWljb24tY29sb3I6XG4gKiBzZWxlY3QtaGVyby1iYXNpYy10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWhlcm8tYmFzaWMtcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWJhc2ljLWZvY3VzLWxlZnQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWJhc2ljLWZvY3VzLXJpZ2h0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1iYXNpYy1ob3Zlci1sZWZ0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1iYXNpYy1ob3Zlci1yaWdodC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tYmFzaWMtZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWJhc2ljLWRpc2FibGVkLWljb24tY29sb3I6XG4gKiBzZWxlY3QtaGVyby1iYXNpYy1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWhlcm8tcHJpbWFyeS1sZWZ0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1wcmltYXJ5LXJpZ2h0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1wcmltYXJ5LWljb24tY29sb3I6XG4gKiBzZWxlY3QtaGVyby1wcmltYXJ5LXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1wcmltYXJ5LXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1wcmltYXJ5LWZvY3VzLWxlZnQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXByaW1hcnktZm9jdXMtcmlnaHQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXByaW1hcnktaG92ZXItbGVmdC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tcHJpbWFyeS1ob3Zlci1yaWdodC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tcHJpbWFyeS1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tcHJpbWFyeS1kaXNhYmxlZC1pY29uLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tcHJpbWFyeS1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWhlcm8tc3VjY2Vzcy1sZWZ0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1zdWNjZXNzLXJpZ2h0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1zdWNjZXNzLWljb24tY29sb3I6XG4gKiBzZWxlY3QtaGVyby1zdWNjZXNzLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1zdWNjZXNzLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1zdWNjZXNzLWZvY3VzLWxlZnQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXN1Y2Nlc3MtZm9jdXMtcmlnaHQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXN1Y2Nlc3MtaG92ZXItbGVmdC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tc3VjY2Vzcy1ob3Zlci1yaWdodC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tc3VjY2Vzcy1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tc3VjY2Vzcy1kaXNhYmxlZC1pY29uLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tc3VjY2Vzcy1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWhlcm8taW5mby1sZWZ0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1pbmZvLXJpZ2h0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1pbmZvLWljb24tY29sb3I6XG4gKiBzZWxlY3QtaGVyby1pbmZvLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1pbmZvLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1pbmZvLWZvY3VzLWxlZnQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWluZm8tZm9jdXMtcmlnaHQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWluZm8taG92ZXItbGVmdC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8taW5mby1ob3Zlci1yaWdodC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8taW5mby1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8taW5mby1kaXNhYmxlZC1pY29uLWNvbG9yOlxuICogc2VsZWN0LWhlcm8taW5mby1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWhlcm8td2FybmluZy1sZWZ0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby13YXJuaW5nLXJpZ2h0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby13YXJuaW5nLWljb24tY29sb3I6XG4gKiBzZWxlY3QtaGVyby13YXJuaW5nLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby13YXJuaW5nLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby13YXJuaW5nLWZvY3VzLWxlZnQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXdhcm5pbmctZm9jdXMtcmlnaHQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLXdhcm5pbmctaG92ZXItbGVmdC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8td2FybmluZy1ob3Zlci1yaWdodC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8td2FybmluZy1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8td2FybmluZy1kaXNhYmxlZC1pY29uLWNvbG9yOlxuICogc2VsZWN0LWhlcm8td2FybmluZy1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWhlcm8tZGFuZ2VyLWxlZnQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWRhbmdlci1yaWdodC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tZGFuZ2VyLWljb24tY29sb3I6XG4gKiBzZWxlY3QtaGVyby1kYW5nZXItdGV4dC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWRhbmdlci1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWhlcm8tZGFuZ2VyLWZvY3VzLWxlZnQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWRhbmdlci1mb2N1cy1yaWdodC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tZGFuZ2VyLWhvdmVyLWxlZnQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWRhbmdlci1ob3Zlci1yaWdodC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tZGFuZ2VyLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1kYW5nZXItZGlzYWJsZWQtaWNvbi1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWRhbmdlci1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogc2VsZWN0LWhlcm8tY29udHJvbC1sZWZ0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1jb250cm9sLXJpZ2h0LWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1jb250cm9sLWljb24tY29sb3I6XG4gKiBzZWxlY3QtaGVyby1jb250cm9sLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1jb250cm9sLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBzZWxlY3QtaGVyby1jb250cm9sLWZvY3VzLWxlZnQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWNvbnRyb2wtZm9jdXMtcmlnaHQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNlbGVjdC1oZXJvLWNvbnRyb2wtaG92ZXItbGVmdC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tY29udHJvbC1ob3Zlci1yaWdodC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tY29udHJvbC1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tY29udHJvbC1kaXNhYmxlZC1pY29uLWNvbG9yOlxuICogc2VsZWN0LWhlcm8tY29udHJvbC1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmJTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7IHByb3ZpZGU6IE5CX1NFTEVDVF9JTkpFQ1RJT05fVE9LRU4sIHVzZUV4aXN0aW5nOiBOYlNlbGVjdENvbXBvbmVudCB9LFxuICAgIHsgcHJvdmlkZTogTmJGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTmJTZWxlY3RDb21wb25lbnQgfSxcbiAgICB7IHByb3ZpZGU6IE5iRm9ybUZpZWxkQ29udHJvbENvbmZpZywgdXNlRmFjdG9yeTogbmJTZWxlY3RGb3JtRmllbGRDb250cm9sQ29uZmlnRmFjdG9yeSB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOYlNlbGVjdENvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgTmJGb3JtRmllbGRDb250cm9sXG57XG4gIC8qKlxuICAgKiBTZWxlY3Qgc2l6ZSwgYXZhaWxhYmxlIHNpemVzOlxuICAgKiBgdGlueWAsIGBzbWFsbGAsIGBtZWRpdW1gIChkZWZhdWx0KSwgYGxhcmdlYCwgYGdpYW50YFxuICAgKi9cbiAgQElucHV0KCkgc2l6ZTogTmJDb21wb25lbnRTaXplID0gJ21lZGl1bSc7XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBzdGF0dXMgKGFkZHMgc3BlY2lmaWMgc3R5bGVzKTpcbiAgICogYGJhc2ljYCwgYHByaW1hcnlgLCBgaW5mb2AsIGBzdWNjZXNzYCwgYHdhcm5pbmdgLCBgZGFuZ2VyYCwgYGNvbnRyb2xgXG4gICAqL1xuICBASW5wdXQoKSBzdGF0dXM6IE5iQ29tcG9uZW50T3JDdXN0b21TdGF0dXMgPSAnYmFzaWMnO1xuXG4gIC8qKlxuICAgKiBTZWxlY3Qgc2hhcGVzOiBgcmVjdGFuZ2xlYCAoZGVmYXVsdCksIGByb3VuZGAsIGBzZW1pLXJvdW5kYFxuICAgKi9cbiAgQElucHV0KCkgc2hhcGU6IE5iQ29tcG9uZW50U2hhcGUgPSAncmVjdGFuZ2xlJztcblxuICAvKipcbiAgICogU2VsZWN0IGFwcGVhcmFuY2VzOiBgb3V0bGluZWAgKGRlZmF1bHQpLCBgZmlsbGVkYCwgYGhlcm9gXG4gICAqL1xuICBASW5wdXQoKSBhcHBlYXJhbmNlOiBOYlNlbGVjdEFwcGVhcmFuY2UgPSAnb3V0bGluZSc7XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyBjbGFzcyB0byBiZSBzZXQgb24gYG5iLW9wdGlvbmBzIGNvbnRhaW5lciAoYG5iLW9wdGlvbi1saXN0YClcbiAgICogKi9cbiAgQElucHV0KCkgb3B0aW9uc0xpc3RDbGFzczogTmdDbGFzc1snbmdDbGFzcyddO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgY2xhc3MgZm9yIHRoZSBvdmVybGF5IHBhbmVsIHdpdGggb3B0aW9uc1xuICAgKiAqL1xuICBASW5wdXQoKSBvcHRpb25zUGFuZWxDbGFzczogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyB3aWR0aCAoaW4gcGl4ZWxzKSB0byBiZSBzZXQgb24gYG5iLW9wdGlvbmBzIGNvbnRhaW5lciAoYG5iLW9wdGlvbi1saXN0YClcbiAgICogKi9cbiAgQElucHV0KClcbiAgZ2V0IG9wdGlvbnNXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zV2lkdGggPz8gdGhpcy5ob3N0V2lkdGg7XG4gIH1cbiAgc2V0IG9wdGlvbnNXaWR0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fb3B0aW9uc1dpZHRoID0gdmFsdWU7XG4gIH1cbiAgcHJvdGVjdGVkIF9vcHRpb25zV2lkdGg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogQWRkcyBgb3V0bGluZWAgc3R5bGVzXG4gICAqL1xuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFwcGVhcmFuY2Utb3V0bGluZScpXG4gIGdldCBvdXRsaW5lKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFwcGVhcmFuY2UgPT09ICdvdXRsaW5lJztcbiAgfVxuICBzZXQgb3V0bGluZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmIChjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpKSB7XG4gICAgICB0aGlzLmFwcGVhcmFuY2UgPSAnb3V0bGluZSc7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9vdXRsaW5lOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogQWRkcyBgZmlsbGVkYCBzdHlsZXNcbiAgICovXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYXBwZWFyYW5jZS1maWxsZWQnKVxuICBnZXQgZmlsbGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFwcGVhcmFuY2UgPT09ICdmaWxsZWQnO1xuICB9XG4gIHNldCBmaWxsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoY29udmVydFRvQm9vbFByb3BlcnR5KHZhbHVlKSkge1xuICAgICAgdGhpcy5hcHBlYXJhbmNlID0gJ2ZpbGxlZCc7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9maWxsZWQ6IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBBZGRzIGBoZXJvYCBzdHlsZXNcbiAgICovXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYXBwZWFyYW5jZS1oZXJvJylcbiAgZ2V0IGhlcm8oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZWFyYW5jZSA9PT0gJ2hlcm8nO1xuICB9XG4gIHNldCBoZXJvKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuYXBwZWFyYW5jZSA9ICdoZXJvJztcbiAgICB9XG4gIH1cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hlcm86IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBEaXNhYmxlcyB0aGUgc2VsZWN0XG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfZGlzYWJsZWQ6IGJvb2xlYW47XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogTmJCb29sZWFuSW5wdXQ7XG5cbiAgLyoqXG4gICAqIElmIHNldCBlbGVtZW50IHdpbGwgZmlsbCBpdHMgY29udGFpbmVyXG4gICAqL1xuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZ1bGwtd2lkdGgnKVxuICBnZXQgZnVsbFdpZHRoKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9mdWxsV2lkdGg7XG4gIH1cbiAgc2V0IGZ1bGxXaWR0aCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Z1bGxXaWR0aCA9IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9mdWxsV2lkdGg6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Z1bGxXaWR0aDogTmJCb29sZWFuSW5wdXQ7XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgc2VsZWN0IHBsYWNlaG9sZGVyIGlmIG5vdGhpbmcgc2VsZWN0ZWQuXG4gICAqICovXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0byBjb21wYXJlIG9wdGlvbiB2YWx1ZSB3aXRoIHNlbGVjdGVkIHZhbHVlLlxuICAgKiBCeSBkZWZhdWx0LCB2YWx1ZXMgYXJlIGNvbXBhcmVkIHdpdGggc3RyaWN0IGVxdWFsaXR5IChgPT09YCkuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgY29tcGFyZVdpdGgoKTogTmJTZWxlY3RDb21wYXJlRnVuY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLl9jb21wYXJlV2l0aDtcbiAgfVxuICBzZXQgY29tcGFyZVdpdGgoZm46IE5iU2VsZWN0Q29tcGFyZUZ1bmN0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbXBhcmVXaXRoID0gZm47XG5cbiAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlbC5sZW5ndGggJiYgdGhpcy5jYW5TZWxlY3RWYWx1ZSgpKSB7XG4gICAgICB0aGlzLnNldFNlbGVjdGlvbih0aGlzLnNlbGVjdGVkKTtcbiAgICB9XG4gIH1cbiAgcHJvdGVjdGVkIF9jb21wYXJlV2l0aDogTmJTZWxlY3RDb21wYXJlRnVuY3Rpb24gPSAodjE6IGFueSwgdjI6IGFueSkgPT4gdjEgPT09IHYyO1xuXG4gIC8qKlxuICAgKiBBY2NlcHRzIHNlbGVjdGVkIGl0ZW0gb3IgYXJyYXkgb2Ygc2VsZWN0ZWQgaXRlbXMuXG4gICAqICovXG4gIEBJbnB1dCgpXG4gIHNldCBzZWxlY3RlZCh2YWx1ZSkge1xuICAgIHRoaXMud3JpdGVWYWx1ZSh2YWx1ZSk7XG4gIH1cbiAgZ2V0IHNlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gdGhpcy5zZWxlY3Rpb25Nb2RlbC5tYXAoKG8pID0+IG8udmFsdWUpIDogdGhpcy5zZWxlY3Rpb25Nb2RlbFswXS52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlcyBjYXBhYmlsaXR5IGp1c3Qgd3JpdGUgYG11bHRpcGxlYCBvdmVyIHRoZSBlbGVtZW50LlxuICAgKiAqL1xuICBASW5wdXQoKVxuICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICB9XG4gIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX211bHRpcGxlID0gY29udmVydFRvQm9vbFByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX211bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9tdWx0aXBsZTogTmJCb29sZWFuSW5wdXQ7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgb3B0aW9ucyBvdmVybGF5IG9mZnNldCAoaW4gcGl4ZWxzKS5cbiAgICoqL1xuICBASW5wdXQoKSBvcHRpb25zT3ZlcmxheU9mZnNldCA9IDg7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgb3B0aW9ucyBvdmVybGF5IHNjcm9sbCBzdHJhdGVneS5cbiAgICoqL1xuICBASW5wdXQoKSBzY3JvbGxTdHJhdGVneTogTmJTY3JvbGxTdHJhdGVnaWVzID0gJ2Jsb2NrJztcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGFkZGl0aW9uYWxDbGFzc2VzKCk6IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5zdGF0dXNTZXJ2aWNlLmlzQ3VzdG9tU3RhdHVzKHRoaXMuc3RhdHVzKSkge1xuICAgICAgcmV0dXJuIFt0aGlzLnN0YXR1c1NlcnZpY2UuZ2V0U3RhdHVzQ2xhc3ModGhpcy5zdGF0dXMpXTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFdpbGwgYmUgZW1pdHRlZCB3aGVuIHNlbGVjdGVkIHZhbHVlIGNoYW5nZXMuXG4gICAqICovXG4gIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgYE5iT3B0aW9uQ29tcG9uZW50YCdzIGNvbXBvbmVudHMgcGFzc2VkIGFzIGNvbnRlbnQuXG4gICAqIFRPRE8gbWF5YmUgaXQgd291bGQgYmUgYmV0dGVyIHByb3ZpZGUgd3JhcHBlclxuICAgKiAqL1xuICBAQ29udGVudENoaWxkcmVuKE5iT3B0aW9uQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG9wdGlvbnM6IFF1ZXJ5TGlzdDxOYk9wdGlvbkNvbXBvbmVudD47XG5cbiAgLyoqXG4gICAqIEN1c3RvbSBzZWxlY3QgbGFiZWwsIHdpbGwgYmUgcmVuZGVyZWQgaW5zdGVhZCBvZiBkZWZhdWx0IGVudW1lcmF0aW9uIHdpdGggY29tYS5cbiAgICogKi9cbiAgQENvbnRlbnRDaGlsZChOYlNlbGVjdExhYmVsQ29tcG9uZW50KSBjdXN0b21MYWJlbDtcblxuICAvKipcbiAgICogTmJDYXJkIHdpdGggb3B0aW9ucyBjb250ZW50LlxuICAgKiAqL1xuICBAVmlld0NoaWxkKE5iUG9ydGFsRGlyZWN0aXZlKSBwb3J0YWw6IE5iUG9ydGFsRGlyZWN0aXZlO1xuXG4gIEBWaWV3Q2hpbGQoJ3NlbGVjdEJ1dHRvbicsIHsgcmVhZDogRWxlbWVudFJlZiB9KSBidXR0b246IEVsZW1lbnRSZWY8SFRNTEJ1dHRvbkVsZW1lbnQ+O1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlzIHNlbGVjdCBvcGVuZWQuXG4gICAqICovXG4gIEBIb3N0QmluZGluZygnY2xhc3Mub3BlbicpXG4gIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucmVmICYmIHRoaXMucmVmLmhhc0F0dGFjaGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBvZiBzZWxlY3RlZCBvcHRpb25zLlxuICAgKiAqL1xuICBzZWxlY3Rpb25Nb2RlbDogTmJPcHRpb25Db21wb25lbnRbXSA9IFtdO1xuXG4gIHBvc2l0aW9uU3RyYXRlZ3k6IE5iQWRqdXN0YWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3k7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgb3ZlcmxheSBwb3NpdGlvbiBiZWNhdXNlIG9mIHdlIGhhdmUgdG8gdG9nZ2xlIG92ZXJsYXlQb3NpdGlvblxuICAgKiBpbiBbbmdDbGFzc10gZGlyZWN0aW9uIGFuZCB0aGlzIGRpcmVjdGl2ZSBjYW4gdXNlIG9ubHkgc3RyaW5nLlxuICAgKi9cbiAgb3ZlcmxheVBvc2l0aW9uOiBOYlBvc2l0aW9uID0gJycgYXMgTmJQb3NpdGlvbjtcblxuICBwcm90ZWN0ZWQgcmVmOiBOYk92ZXJsYXlSZWY7XG5cbiAgcHJvdGVjdGVkIHRyaWdnZXJTdHJhdGVneTogTmJUcmlnZ2VyU3RyYXRlZ3k7XG5cbiAgcHJvdGVjdGVkIGFsaXZlOiBib29sZWFuID0gdHJ1ZTtcblxuICBwcm90ZWN0ZWQgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHByb3RlY3RlZCBrZXlNYW5hZ2VyOiBOYkZvY3VzS2V5TWFuYWdlcjxOYk9wdGlvbkNvbXBvbmVudD47XG5cbiAgLyoqXG4gICAqIElmIGEgdXNlciBhc3NpZ25zIHZhbHVlIGJlZm9yZSBjb250ZW50IG5iLW9wdGlvbnMncyByZW5kZXJlZCB0aGUgdmFsdWUgd2lsbCBiZSBwdXR0ZWQgaW4gdGhpcyB2YXJpYWJsZS5cbiAgICogQW5kIHRoZW4gYXBwbGllZCBhZnRlciBjb250ZW50IHJlbmRlcmVkLlxuICAgKiBPbmx5IHRoZSBsYXN0IHZhbHVlIHdpbGwgYmUgYXBwbGllZC5cbiAgICogKi9cbiAgcHJvdGVjdGVkIHF1ZXVlO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiBwYXNzZWQgdGhyb3VnaCBjb250cm9sIHZhbHVlIGFjY2Vzc29yIHRvIHByb3BhZ2F0ZSBjaGFuZ2VzLlxuICAgKiAqL1xuICBwcm90ZWN0ZWQgb25DaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIHByb3RlY3RlZCBvblRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgLypcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKiovXG4gIHN0YXR1cyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE5iQ29tcG9uZW50T3JDdXN0b21TdGF0dXM+KHRoaXMuc3RhdHVzKTtcblxuICAvKlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqKi9cbiAgc2l6ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE5iQ29tcG9uZW50U2l6ZT4odGhpcy5zaXplKTtcblxuICAvKlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqKi9cbiAgZm9jdXNlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvKlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqKi9cbiAgZGlzYWJsZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0aGlzLmRpc2FibGVkKTtcblxuICAvKlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqKi9cbiAgZnVsbFdpZHRoJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odGhpcy5mdWxsV2lkdGgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoTkJfRE9DVU1FTlQpIHByb3RlY3RlZCBkb2N1bWVudCxcbiAgICBwcm90ZWN0ZWQgb3ZlcmxheTogTmJPdmVybGF5U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgaG9zdFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJvdGVjdGVkIHBvc2l0aW9uQnVpbGRlcjogTmJQb3NpdGlvbkJ1aWxkZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB0cmlnZ2VyU3RyYXRlZ3lCdWlsZGVyOiBOYlRyaWdnZXJTdHJhdGVneUJ1aWxkZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIGZvY3VzS2V5TWFuYWdlckZhY3RvcnlTZXJ2aWNlOiBOYkZvY3VzS2V5TWFuYWdlckZhY3RvcnlTZXJ2aWNlPE5iT3B0aW9uQ29tcG9uZW50PixcbiAgICBwcm90ZWN0ZWQgZm9jdXNNb25pdG9yOiBOYkZvY3VzTW9uaXRvcixcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcm90ZWN0ZWQgem9uZTogTmdab25lLFxuICAgIHByb3RlY3RlZCBzdGF0dXNTZXJ2aWNlOiBOYlN0YXR1c1NlcnZpY2UsXG4gICkge31cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpcyBzZWxlY3QgaGlkZGVuLlxuICAgKiAqL1xuICBnZXQgaXNIaWRkZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmlzT3BlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdpZHRoIG9mIHRoZSBzZWxlY3QgYnV0dG9uLlxuICAgKiAqL1xuICBnZXQgaG9zdFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYnV0dG9uLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIH1cblxuICBnZXQgc2VsZWN0QnV0dG9uQ2xhc3NlcygpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFtdO1xuXG4gICAgaWYgKCF0aGlzLnNlbGVjdGlvbk1vZGVsLmxlbmd0aCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKCdwbGFjZWhvbGRlcicpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc2VsZWN0aW9uTW9kZWwubGVuZ3RoICYmICF0aGlzLnBsYWNlaG9sZGVyKSB7XG4gICAgICBjbGFzc2VzLnB1c2goJ2VtcHR5Jyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgY2xhc3Nlcy5wdXNoKHRoaXMub3ZlcmxheVBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3NlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb250ZW50IHJlbmRlcmVkIGluIHRoZSBsYWJlbC5cbiAgICogKi9cbiAgZ2V0IHNlbGVjdGlvblZpZXcoKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZWwubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZWwubWFwKChvcHRpb246IE5iT3B0aW9uQ29tcG9uZW50KSA9PiBvcHRpb24uY29udGVudCkuam9pbignLCAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlbFswXS5jb250ZW50O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoeyBkaXNhYmxlZCwgc3RhdHVzLCBzaXplLCBmdWxsV2lkdGggfTogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgdGhpcy5kaXNhYmxlZCQubmV4dChkaXNhYmxlZC5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoc3RhdHVzKSB7XG4gICAgICB0aGlzLnN0YXR1cyQubmV4dChzdGF0dXMuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKHNpemUpIHtcbiAgICAgIHRoaXMuc2l6ZSQubmV4dChzaXplLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChmdWxsV2lkdGgpIHtcbiAgICAgIHRoaXMuZnVsbFdpZHRoJC5uZXh0KHRoaXMuZnVsbFdpZHRoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zLmNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgodGhpcy5vcHRpb25zKSxcbiAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMucXVldWUgIT0gbnVsbCAmJiB0aGlzLmNhblNlbGVjdFZhbHVlKCkpLFxuICAgICAgICAvLyBDYWxsICd3cml0ZVZhbHVlJyB3aGVuIGN1cnJlbnQgY2hhbmdlIGRldGVjdGlvbiBydW4gaXMgZmluaXNoZWQuXG4gICAgICAgIC8vIFdoZW4gd3JpdGluZyBpcyBmaW5pc2hlZCwgY2hhbmdlIGRldGVjdGlvbiBzdGFydHMgYWdhaW4sIHNpbmNlXG4gICAgICAgIC8vIG1pY3JvdGFza3MgcXVldWUgaXMgZW1wdHkuXG4gICAgICAgIC8vIFByZXZlbnRzIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3IuXG4gICAgICAgIHN3aXRjaE1hcCgob3B0aW9uczogUXVlcnlMaXN0PE5iT3B0aW9uQ29tcG9uZW50PikgPT4gZnJvbShQcm9taXNlLnJlc29sdmUob3B0aW9ucykpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLndyaXRlVmFsdWUodGhpcy5xdWV1ZSkpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMudHJpZ2dlclN0cmF0ZWd5ID0gdGhpcy5jcmVhdGVUcmlnZ2VyU3RyYXRlZ3koKTtcblxuICAgIHRoaXMuc3Vic2NyaWJlT25CdXR0b25Gb2N1cygpO1xuICAgIHRoaXMuc3Vic2NyaWJlT25UcmlnZ2VycygpO1xuICAgIHRoaXMuc3Vic2NyaWJlT25PcHRpb25DbGljaygpO1xuXG4gICAgLy8gVE9ETzogIzIyNTRcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50LCAnbmItdHJhbnNpdGlvbicpO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcblxuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcblxuICAgIGlmICh0aGlzLnJlZikge1xuICAgICAgdGhpcy5yZWYuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy50cmlnZ2VyU3RyYXRlZ3kpIHtcbiAgICAgIHRoaXMudHJpZ2dlclN0cmF0ZWd5LmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBzaG93KCkge1xuICAgIGlmICh0aGlzLnNob3VsZFNob3coKSkge1xuICAgICAgdGhpcy5hdHRhY2hUb092ZXJsYXkoKTtcblxuICAgICAgdGhpcy5wb3NpdGlvblN0cmF0ZWd5LnBvc2l0aW9uQ2hhbmdlLnBpcGUodGFrZSgxKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldEFjdGl2ZU9wdGlvbigpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMucmVmLmRldGFjaCgpO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmFsaXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2FuU2VsZWN0VmFsdWUoKSkge1xuICAgICAgdGhpcy5zZXRTZWxlY3Rpb24odmFsdWUpO1xuICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZWwubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucXVldWUgPSBudWxsO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnF1ZXVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgb3B0aW9uIG9yIGNsZWFyIGFsbCBzZWxlY3RlZCBvcHRpb25zIGlmIHZhbHVlIGlzIG51bGwuXG4gICAqICovXG4gIHByb3RlY3RlZCBoYW5kbGVPcHRpb25DbGljayhvcHRpb246IE5iT3B0aW9uQ29tcG9uZW50KSB7XG4gICAgdGhpcy5xdWV1ZSA9IG51bGw7XG4gICAgaWYgKG9wdGlvbi52YWx1ZSA9PSBudWxsKSB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0T3B0aW9uKG9wdGlvbik7XG4gICAgfVxuXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNlbGVjdCBhbGwgc2VsZWN0ZWQgb3B0aW9ucy5cbiAgICogKi9cbiAgcHJvdGVjdGVkIHJlc2V0KCkge1xuICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwuZm9yRWFjaCgob3B0aW9uOiBOYk9wdGlvbkNvbXBvbmVudCkgPT4gb3B0aW9uLmRlc2VsZWN0KCkpO1xuICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwgPSBbXTtcbiAgICB0aGlzLmhpZGUoKTtcbiAgICB0aGlzLmJ1dHRvbi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgdGhpcy5lbWl0U2VsZWN0ZWQodGhpcy5tdWx0aXBsZSA/IFtdIDogbnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBob3cgdG8gc2VsZWN0IG9wdGlvbiBhcyBtdWx0aXBsZSBvciBzaW5nbGUuXG4gICAqICovXG4gIHByb3RlY3RlZCBzZWxlY3RPcHRpb24ob3B0aW9uOiBOYk9wdGlvbkNvbXBvbmVudCkge1xuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLmhhbmRsZU11bHRpcGxlU2VsZWN0KG9wdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFuZGxlU2luZ2xlU2VsZWN0KG9wdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBzaW5nbGUgb3B0aW9uLlxuICAgKiAqL1xuICBwcm90ZWN0ZWQgaGFuZGxlU2luZ2xlU2VsZWN0KG9wdGlvbjogTmJPcHRpb25Db21wb25lbnQpIHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuc2VsZWN0aW9uTW9kZWwucG9wKCk7XG5cbiAgICBpZiAoc2VsZWN0ZWQgJiYgIXRoaXMuX2NvbXBhcmVXaXRoKHNlbGVjdGVkLnZhbHVlLCBvcHRpb24udmFsdWUpKSB7XG4gICAgICBzZWxlY3RlZC5kZXNlbGVjdCgpO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwgPSBbb3B0aW9uXTtcbiAgICBvcHRpb24uc2VsZWN0KCk7XG4gICAgdGhpcy5oaWRlKCk7XG4gICAgdGhpcy5idXR0b24ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgdGhpcy5lbWl0U2VsZWN0ZWQob3B0aW9uLnZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgZm9yIG11bHRpcGxlIG9wdGlvbnMuXG4gICAqICovXG4gIHByb3RlY3RlZCBoYW5kbGVNdWx0aXBsZVNlbGVjdChvcHRpb246IE5iT3B0aW9uQ29tcG9uZW50KSB7XG4gICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbCA9IHRoaXMuc2VsZWN0aW9uTW9kZWwuZmlsdGVyKChzKSA9PiAhdGhpcy5fY29tcGFyZVdpdGgocy52YWx1ZSwgb3B0aW9uLnZhbHVlKSk7XG4gICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlbC5wdXNoKG9wdGlvbik7XG4gICAgICBvcHRpb24uc2VsZWN0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5lbWl0U2VsZWN0ZWQodGhpcy5zZWxlY3Rpb25Nb2RlbC5tYXAoKG9wdDogTmJPcHRpb25Db21wb25lbnQpID0+IG9wdC52YWx1ZSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGF0dGFjaFRvT3ZlcmxheSgpIHtcbiAgICBpZiAoIXRoaXMucmVmKSB7XG4gICAgICB0aGlzLmNyZWF0ZU92ZXJsYXkoKTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlT25Qb3NpdGlvbkNoYW5nZSgpO1xuICAgICAgdGhpcy5jcmVhdGVLZXlNYW5hZ2VyKCk7XG4gICAgICB0aGlzLnN1YnNjcmliZU9uT3ZlcmxheUtleXMoKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlZi5hdHRhY2godGhpcy5wb3J0YWwpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldEFjdGl2ZU9wdGlvbigpIHtcbiAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlbC5sZW5ndGgpIHtcbiAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKHRoaXMuc2VsZWN0aW9uTW9kZWxbMF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZU92ZXJsYXkoKSB7XG4gICAgY29uc3Qgc2Nyb2xsU3RyYXRlZ3kgPSB0aGlzLmNyZWF0ZVNjcm9sbFN0cmF0ZWd5KCk7XG4gICAgdGhpcy5wb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5jcmVhdGVQb3NpdGlvblN0cmF0ZWd5KCk7XG4gICAgdGhpcy5yZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKHtcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMucG9zaXRpb25TdHJhdGVneSxcbiAgICAgIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgcGFuZWxDbGFzczogdGhpcy5vcHRpb25zUGFuZWxDbGFzcyxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVLZXlNYW5hZ2VyKCk6IHZvaWQge1xuICAgIHRoaXMua2V5TWFuYWdlciA9IHRoaXMuZm9jdXNLZXlNYW5hZ2VyRmFjdG9yeVNlcnZpY2UuY3JlYXRlKHRoaXMub3B0aW9ucykud2l0aFR5cGVBaGVhZCgyMDApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVBvc2l0aW9uU3RyYXRlZ3koKTogTmJBZGp1c3RhYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25CdWlsZGVyXG4gICAgICAuY29ubmVjdGVkVG8odGhpcy5idXR0b24pXG4gICAgICAucG9zaXRpb24oTmJQb3NpdGlvbi5CT1RUT00pXG4gICAgICAub2Zmc2V0KHRoaXMub3B0aW9uc092ZXJsYXlPZmZzZXQpXG4gICAgICAuYWRqdXN0bWVudChOYkFkanVzdG1lbnQuVkVSVElDQUwpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVNjcm9sbFN0cmF0ZWd5KCk6IE5iU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llc1t0aGlzLnNjcm9sbFN0cmF0ZWd5XSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVRyaWdnZXJTdHJhdGVneSgpOiBOYlRyaWdnZXJTdHJhdGVneSB7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlclN0cmF0ZWd5QnVpbGRlclxuICAgICAgLnRyaWdnZXIoTmJUcmlnZ2VyLkNMSUNLKVxuICAgICAgLmhvc3QodGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQpXG4gICAgICAuY29udGFpbmVyKCgpID0+IHRoaXMuZ2V0Q29udGFpbmVyKCkpXG4gICAgICAuYnVpbGQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzdWJzY3JpYmVPblRyaWdnZXJzKCkge1xuICAgIHRoaXMudHJpZ2dlclN0cmF0ZWd5LnNob3ckLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNob3coKSk7XG4gICAgdGhpcy50cmlnZ2VyU3RyYXRlZ3kuaGlkZSQucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5pc09wZW4pKS5zdWJzY3JpYmUoKCRldmVudDogRXZlbnQpID0+IHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgaWYgKCF0aGlzLmlzQ2xpY2tlZFdpdGhpbkNvbXBvbmVudCgkZXZlbnQpKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlT25Qb3NpdGlvbkNoYW5nZSgpIHtcbiAgICB0aGlzLnBvc2l0aW9uU3RyYXRlZ3kucG9zaXRpb25DaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgocG9zaXRpb246IE5iUG9zaXRpb24pID0+IHtcbiAgICAgIHRoaXMub3ZlcmxheVBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzdWJzY3JpYmVPbk9wdGlvbkNsaWNrKCkge1xuICAgIC8qKlxuICAgICAqIElmIHRoZSB1c2VyIGNoYW5nZXMgcHJvdmlkZWQgb3B0aW9ucyBsaXN0IGluIHRoZSBydW50aW1lIHdlIGhhdmUgdG8gaGFuZGxlIHRoaXNcbiAgICAgKiBhbmQgcmVzdWJzY3JpYmUgb24gb3B0aW9ucyBzZWxlY3Rpb24gY2hhbmdlcyBldmVudC5cbiAgICAgKiBPdGhlcndpc2UsIHRoZSB1c2VyIHdpbGwgbm90IGJlIGFibGUgdG8gc2VsZWN0IG5ldyBvcHRpb25zLlxuICAgICAqICovXG4gICAgdGhpcy5vcHRpb25zLmNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgodGhpcy5vcHRpb25zKSxcbiAgICAgICAgc3dpdGNoTWFwKChvcHRpb25zOiBRdWVyeUxpc3Q8TmJPcHRpb25Db21wb25lbnQ+KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG1lcmdlKC4uLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5jbGljaykpO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoY2xpY2tlZE9wdGlvbjogTmJPcHRpb25Db21wb25lbnQpID0+IHRoaXMuaGFuZGxlT3B0aW9uQ2xpY2soY2xpY2tlZE9wdGlvbikpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmliZU9uT3ZlcmxheUtleXMoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZcbiAgICAgIC5rZXlkb3duRXZlbnRzKClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5pc09wZW4pLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFKSB7XG4gICAgICAgICAgdGhpcy5idXR0b24ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMua2V5TWFuYWdlci50YWJPdXQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlT25CdXR0b25Gb2N1cygpIHtcbiAgICB0aGlzLmZvY3VzTW9uaXRvclxuICAgICAgLm1vbml0b3IodGhpcy5idXR0b24pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChvcmlnaW4pID0+ICEhb3JpZ2luKSxcbiAgICAgICAgZmluYWxpemUoKCkgPT4gdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5idXR0b24pKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLmZvY3VzZWQkKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRDb250YWluZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucmVmICYmXG4gICAgICB0aGlzLnJlZi5oYXNBdHRhY2hlZCgpICYmXG4gICAgICA8Q29tcG9uZW50UmVmPGFueT4+e1xuICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgIG5hdGl2ZUVsZW1lbnQ6IHRoaXMucmVmLm92ZXJsYXlFbGVtZW50LFxuICAgICAgICB9LFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUHJvcGFnYXRlIHNlbGVjdGVkIHZhbHVlLlxuICAgKiAqL1xuICBwcm90ZWN0ZWQgZW1pdFNlbGVjdGVkKHNlbGVjdGVkKSB7XG4gICAgdGhpcy5vbkNoYW5nZShzZWxlY3RlZCk7XG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHNlbGVjdGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgc2VsZWN0ZWQgdmFsdWUgaW4gbW9kZWwuXG4gICAqICovXG4gIHByb3RlY3RlZCBzZXRTZWxlY3Rpb24odmFsdWUpIHtcbiAgICBjb25zdCBpc1Jlc2V0VmFsdWUgPSB2YWx1ZSA9PSBudWxsO1xuICAgIGxldCBzYWZlVmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICBzYWZlVmFsdWUgPSB2YWx1ZSA/PyBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0FycmF5OiBib29sZWFuID0gQXJyYXkuaXNBcnJheShzYWZlVmFsdWUpO1xuXG4gICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgIWlzQXJyYXkgJiYgIWlzUmVzZXRWYWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgYXNzaWduIHNpbmdsZSB2YWx1ZSBpZiBzZWxlY3QgaXMgbWFya2VkIGFzIG11bHRpcGxlXCIpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMubXVsdGlwbGUgJiYgaXNBcnJheSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgYXNzaWduIGFycmF5IGlmIHNlbGVjdCBpcyBub3QgbWFya2VkIGFzIG11bHRpcGxlXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZpb3VzbHlTZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnNlbGVjdGlvbk1vZGVsO1xuICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwgPSBbXTtcblxuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICBzYWZlVmFsdWUuZm9yRWFjaCgob3B0aW9uKSA9PiB0aGlzLnNlbGVjdFZhbHVlKG9wdGlvbikpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdFZhbHVlKHNhZmVWYWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gZmluZCBvcHRpb25zIHdoaWNoIHdlcmUgc2VsZWN0ZWQgYmVmb3JlIGFuZCB0cmlnZ2VyIGRlc2VsZWN0XG4gICAgcHJldmlvdXNseVNlbGVjdGVkT3B0aW9uc1xuICAgICAgLmZpbHRlcigob3B0aW9uOiBOYk9wdGlvbkNvbXBvbmVudCkgPT4gIXRoaXMuc2VsZWN0aW9uTW9kZWwuaW5jbHVkZXMob3B0aW9uKSlcbiAgICAgIC5mb3JFYWNoKChvcHRpb246IE5iT3B0aW9uQ29tcG9uZW50KSA9PiBvcHRpb24uZGVzZWxlY3QoKSk7XG5cbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgdmFsdWUuXG4gICAqICovXG4gIHByb3RlY3RlZCBzZWxlY3RWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29ycmVzcG9uZGluZyA9IHRoaXMub3B0aW9ucy5maW5kKChvcHRpb246IE5iT3B0aW9uQ29tcG9uZW50KSA9PiB0aGlzLl9jb21wYXJlV2l0aChvcHRpb24udmFsdWUsIHZhbHVlKSk7XG5cbiAgICBpZiAoY29ycmVzcG9uZGluZykge1xuICAgICAgY29ycmVzcG9uZGluZy5zZWxlY3QoKTtcbiAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZWwucHVzaChjb3JyZXNwb25kaW5nKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgc2hvdWxkU2hvdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0hpZGRlbiAmJiB0aGlzLm9wdGlvbnM/Lmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0b3VjaGVkIGlmIGZvY3VzIG1vdmVkIG91dHNpZGUgb2YgYnV0dG9uIGFuZCBvdmVybGF5LFxuICAgKiBpZ25vcmluZyB0aGUgY2FzZSB3aGVuIGZvY3VzIG1vdmVkIHRvIG9wdGlvbnMgb3ZlcmxheS5cbiAgICovXG4gIHRyeVNldFRvdWNoZWQoKSB7XG4gICAgaWYgKHRoaXMuaXNIaWRkZW4pIHtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGlzQ2xpY2tlZFdpdGhpbkNvbXBvbmVudCgkZXZlbnQ6IEV2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50ID09PSAkZXZlbnQudGFyZ2V0IHx8IHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKCRldmVudC50YXJnZXQgYXMgTm9kZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2FuU2VsZWN0VmFsdWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2l6ZS10aW55JylcbiAgZ2V0IHRpbnkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ3RpbnknO1xuICB9XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2l6ZS1zbWFsbCcpXG4gIGdldCBzbWFsbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSAnc21hbGwnO1xuICB9XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2l6ZS1tZWRpdW0nKVxuICBnZXQgbWVkaXVtKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNpemUgPT09ICdtZWRpdW0nO1xuICB9XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2l6ZS1sYXJnZScpXG4gIGdldCBsYXJnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSAnbGFyZ2UnO1xuICB9XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2l6ZS1naWFudCcpXG4gIGdldCBnaWFudCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSAnZ2lhbnQnO1xuICB9XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLXByaW1hcnknKVxuICBnZXQgcHJpbWFyeSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdwcmltYXJ5JztcbiAgfVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YXR1cy1pbmZvJylcbiAgZ2V0IGluZm8oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzID09PSAnaW5mbyc7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGF0dXMtc3VjY2VzcycpXG4gIGdldCBzdWNjZXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnO1xuICB9XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLXdhcm5pbmcnKVxuICBnZXQgd2FybmluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICd3YXJuaW5nJztcbiAgfVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YXR1cy1kYW5nZXInKVxuICBnZXQgZGFuZ2VyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gJ2Rhbmdlcic7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGF0dXMtYmFzaWMnKVxuICBnZXQgYmFzaWMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzID09PSAnYmFzaWMnO1xuICB9XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLWNvbnRyb2wnKVxuICBnZXQgY29udHJvbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdjb250cm9sJztcbiAgfVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNoYXBlLXJlY3RhbmdsZScpXG4gIGdldCByZWN0YW5nbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2hhcGUgPT09ICdyZWN0YW5nbGUnO1xuICB9XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2hhcGUtcm91bmQnKVxuICBnZXQgcm91bmQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2hhcGUgPT09ICdyb3VuZCc7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaGFwZS1zZW1pLXJvdW5kJylcbiAgZ2V0IHNlbWlSb3VuZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaGFwZSA9PT0gJ3NlbWktcm91bmQnO1xuICB9XG59XG4iLCI8YnV0dG9uXG4gIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gIFtuZ0NsYXNzXT1cInNlbGVjdEJ1dHRvbkNsYXNzZXNcIlxuICAoYmx1cik9XCJ0cnlTZXRUb3VjaGVkKClcIlxuICAoa2V5ZG93bi5hcnJvd0Rvd24pPVwic2hvdygpXCJcbiAgKGtleWRvd24uYXJyb3dVcCk9XCJzaG93KClcIlxuICBjbGFzcz1cInNlbGVjdC1idXR0b25cIlxuICB0eXBlPVwiYnV0dG9uXCJcbiAgI3NlbGVjdEJ1dHRvblxuPlxuICA8c3BhbiAoY2xpY2spPVwiZGlzYWJsZWQgJiYgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNlbGVjdGlvbk1vZGVsLmxlbmd0aDsgZWxzZSBwbGFjZWhvbGRlclRlbXBsYXRlXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY3VzdG9tTGFiZWw7IGVsc2UgZGVmYXVsdFNlbGVjdGlvblRlbXBsYXRlXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5iLXNlbGVjdC1sYWJlbFwiPjwvbmctY29udGVudD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRTZWxlY3Rpb25UZW1wbGF0ZT57eyBzZWxlY3Rpb25WaWV3IH19PC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDxuZy10ZW1wbGF0ZSAjcGxhY2Vob2xkZXJUZW1wbGF0ZT57eyBwbGFjZWhvbGRlciB9fTwvbmctdGVtcGxhdGU+XG4gIDwvc3Bhbj5cblxuICA8bmItaWNvblxuICAgIGljb249XCJjaGV2cm9uLWRvd24tb3V0bGluZVwiXG4gICAgcGFjaz1cIm5lYnVsYXItZXNzZW50aWFsc1wiXG4gICAgKGNsaWNrKT1cImRpc2FibGVkICYmICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiXG4gICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgPlxuICA8L25iLWljb24+XG48L2J1dHRvbj5cblxuPG5iLW9wdGlvbi1saXN0XG4gICpuYlBvcnRhbFxuICBbc2l6ZV09XCJzaXplXCJcbiAgW3Bvc2l0aW9uXT1cIm92ZXJsYXlQb3NpdGlvblwiXG4gIFtzdHlsZS53aWR0aC5weF09XCJvcHRpb25zV2lkdGhcIlxuICBbbmdDbGFzc109XCJvcHRpb25zTGlzdENsYXNzXCJcbj5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibmItb3B0aW9uLCBuYi1vcHRpb24tZ3JvdXBcIj48L25nLWNvbnRlbnQ+XG48L25iLW9wdGlvbi1saXN0PlxuIl19