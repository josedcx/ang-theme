/**
 * @license
 * 
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Directive, forwardRef, HostBinding, HostListener, Input, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { filter, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { NbTrigger } from '../cdk/overlay/overlay-trigger';
import { ENTER, ESCAPE } from '../cdk/keycodes/keycodes';
import { NbAdjustment, NbPosition, } from '../cdk/overlay/overlay-position';
import { NbKeyManagerActiveItemMode, } from '../cdk/a11y/descendant-key-manager';
import * as i0 from "@angular/core";
import * as i1 from "../cdk/overlay/overlay-service";
import * as i2 from "../cdk/overlay/overlay-trigger";
import * as i3 from "../cdk/overlay/overlay-position";
import * as i4 from "../cdk/a11y/descendant-key-manager";
/**
 * The `NbAutocompleteDirective` provides a capability to expand input with
 * `NbAutocompleteComponent` overlay containing options to select and fill input with.
 *
 * @stacked-example(Showcase, autocomplete/autocomplete-showcase.component)
 *
 * ### Installation
 *
 * Import `NbAutocompleteModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbAutocompleteModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * You can bind control with form controls or ngModel.
 *
 * @stacked-example(Autocomplete form binding, autocomplete/autocomplete-form.component)
 *
 * Options in the autocomplete may be grouped using `nb-option-group` component.
 *
 * @stacked-example(Grouping, autocomplete/autocomplete-group.component)
 *
 * Autocomplete may change selected option value via provided function.
 *
 * @stacked-example(Custom display, autocomplete/autocomplete-custom-display.component)
 *
 * Also, autocomplete may make first option in option list active automatically.
 *
 * @stacked-example(Active first, autocomplete/autocomplete-active-first.component)
 *
 * */
export class NbAutocompleteDirective {
    constructor(hostRef, overlay, cd, triggerStrategyBuilder, positionBuilder, activeDescendantKeyManagerFactory, renderer) {
        this.hostRef = hostRef;
        this.overlay = overlay;
        this.cd = cd;
        this.triggerStrategyBuilder = triggerStrategyBuilder;
        this.positionBuilder = positionBuilder;
        this.activeDescendantKeyManagerFactory = activeDescendantKeyManagerFactory;
        this.renderer = renderer;
        this.destroy$ = new Subject();
        this._onChange = () => { };
        this._onTouched = () => { };
        /**
         * Determines options overlay offset (in pixels).
         **/
        this.overlayOffset = 8;
        /**
         * Determines options overlay scroll strategy.
         **/
        this.scrollStrategy = 'block';
        this.role = 'combobox';
        this.ariaAutocomplete = 'list';
        this.hasPopup = 'true';
    }
    /**
     * Determines is autocomplete overlay opened.
     * */
    get isOpen() {
        return this.overlayRef && this.overlayRef.hasAttached();
    }
    /**
     * Determines is autocomplete overlay closed.
     * */
    get isClosed() {
        return !this.isOpen;
    }
    /**
     * Provides autocomplete component.
     * */
    get autocomplete() {
        return this._autocomplete;
    }
    set autocomplete(autocomplete) {
        this._autocomplete = autocomplete;
    }
    get top() {
        return this.isOpen && this.autocomplete.options.length && this.autocomplete.overlayPosition === NbPosition.TOP;
    }
    get bottom() {
        return this.isOpen && this.autocomplete.options.length && this.autocomplete.overlayPosition === NbPosition.BOTTOM;
    }
    get ariaExpanded() {
        return this.isOpen && this.isOpen.toString();
    }
    get ariaOwns() {
        return this.isOpen ? this.autocomplete.id : null;
    }
    get ariaActiveDescendant() {
        return this.isOpen && this.keyManager.activeItem ? this.keyManager.activeItem.id : null;
    }
    ngAfterViewInit() {
        this.triggerStrategy = this.createTriggerStrategy();
        this.subscribeOnTriggers();
    }
    ngOnDestroy() {
        if (this.triggerStrategy) {
            this.triggerStrategy.destroy();
        }
        if (this.positionStrategy) {
            this.positionStrategy.dispose();
        }
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        this.destroy$.next();
        this.destroy$.complete();
    }
    handleInput() {
        const currentValue = this.hostRef.nativeElement.value;
        this._onChange(currentValue);
        this.setHostInputValue(this.getDisplayValue(currentValue));
        this.show();
    }
    handleKeydown() {
        this.show();
    }
    handleBlur() {
        this._onTouched();
    }
    show() {
        if (this.shouldShow()) {
            this.attachToOverlay();
            this.setActiveItem();
        }
    }
    hide() {
        if (this.isOpen) {
            this.overlayRef.detach();
            // Need to update class via @HostBinding
            this.cd.markForCheck();
        }
    }
    writeValue(value) {
        this.handleInputValueUpdate(value);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(disabled) {
        this.renderer.setProperty(this.hostRef.nativeElement, 'disabled', disabled);
    }
    subscribeOnOptionClick() {
        /**
         * If the user changes provided options list in the runtime we have to handle this
         * and resubscribe on options selection changes event.
         * Otherwise, the user will not be able to select new options.
         * */
        this.autocomplete.options.changes
            .pipe(tap(() => this.setActiveItem()), startWith(this.autocomplete.options), switchMap((options) => {
            return merge(...options.map((option) => option.click));
        }), takeUntil(this.destroy$))
            .subscribe((clickedOption) => this.handleInputValueUpdate(clickedOption.value, true));
    }
    subscribeOnPositionChange() {
        this.positionStrategy.positionChange.pipe(takeUntil(this.destroy$)).subscribe((position) => {
            this.autocomplete.overlayPosition = position;
            this.cd.detectChanges();
        });
    }
    getActiveItem() {
        return this.keyManager.activeItem;
    }
    setupAutocomplete() {
        this.autocomplete.setHost(this.customOverlayHost || this.hostRef);
    }
    getDisplayValue(value) {
        const displayFn = this.autocomplete.handleDisplayFn;
        return displayFn ? displayFn(value) : value;
    }
    getContainer() {
        return (this.overlayRef &&
            this.isOpen &&
            {
                location: {
                    nativeElement: this.overlayRef.overlayElement,
                },
            });
    }
    handleInputValueUpdate(value, focusInput = false) {
        this.setHostInputValue(value ?? '');
        this._onChange(value);
        if (focusInput) {
            this.hostRef.nativeElement.focus();
        }
        this.autocomplete.emitSelected(value);
        this.hide();
    }
    subscribeOnTriggers() {
        this.triggerStrategy.show$.pipe(filter(() => this.isClosed)).subscribe(() => this.show());
        this.triggerStrategy.hide$.pipe(filter(() => this.isOpen)).subscribe(() => this.hide());
    }
    createTriggerStrategy() {
        return this.triggerStrategyBuilder
            .trigger(NbTrigger.FOCUS)
            .host(this.hostRef.nativeElement)
            .container(() => this.getContainer())
            .build();
    }
    createKeyManager() {
        this.keyManager = this.activeDescendantKeyManagerFactory.create(this.autocomplete.options);
    }
    setHostInputValue(value) {
        this.hostRef.nativeElement.value = this.getDisplayValue(value);
    }
    createPositionStrategy() {
        return this.positionBuilder
            .connectedTo(this.customOverlayHost || this.hostRef)
            .position(NbPosition.BOTTOM)
            .offset(this.overlayOffset)
            .adjustment(NbAdjustment.VERTICAL);
    }
    subscribeOnOverlayKeys() {
        this.overlayRef
            .keydownEvents()
            .pipe(takeUntil(this.destroy$))
            .subscribe((event) => {
            if (event.keyCode === ESCAPE && this.isOpen) {
                event.preventDefault();
                this.hostRef.nativeElement.focus();
                this.hide();
            }
            else if (event.keyCode === ENTER) {
                event.preventDefault();
                const activeItem = this.getActiveItem();
                if (!activeItem) {
                    return;
                }
                this.handleInputValueUpdate(activeItem.value, true);
            }
            else {
                this.keyManager.onKeydown(event);
            }
        });
    }
    setActiveItem() {
        // If autocomplete has activeFirst input set to true,
        // keyManager set first option active, otherwise - reset active option.
        const mode = this.autocomplete.activeFirst
            ? NbKeyManagerActiveItemMode.FIRST_ACTIVE
            : NbKeyManagerActiveItemMode.RESET_ACTIVE;
        this.keyManager.setActiveItem(mode);
        this.cd.detectChanges();
    }
    attachToOverlay() {
        if (!this.overlayRef) {
            this.setupAutocomplete();
            this.initOverlay();
        }
        this.overlayRef.attach(this.autocomplete.portal);
    }
    createOverlay() {
        const scrollStrategy = this.createScrollStrategy();
        this.overlayRef = this.overlay.create({
            positionStrategy: this.positionStrategy,
            scrollStrategy,
            panelClass: this.autocomplete.optionsPanelClass,
        });
    }
    initOverlay() {
        this.positionStrategy = this.createPositionStrategy();
        this.createKeyManager();
        this.subscribeOnPositionChange();
        this.subscribeOnOptionClick();
        this.checkOverlayVisibility();
        this.createOverlay();
        this.subscribeOnOverlayKeys();
    }
    checkOverlayVisibility() {
        this.autocomplete.options.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
            if (!this.autocomplete.options.length) {
                this.hide();
            }
        });
    }
    createScrollStrategy() {
        return this.overlay.scrollStrategies[this.scrollStrategy]();
    }
    shouldShow() {
        return this.isClosed && this.autocomplete.options.length > 0;
    }
}
NbAutocompleteDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbAutocompleteDirective, deps: [{ token: i0.ElementRef }, { token: i1.NbOverlayService }, { token: i0.ChangeDetectorRef }, { token: i2.NbTriggerStrategyBuilderService }, { token: i3.NbPositionBuilderService }, { token: i4.NbActiveDescendantKeyManagerFactoryService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
NbAutocompleteDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0", type: NbAutocompleteDirective, selector: "input[nbAutocomplete]", inputs: { autocomplete: ["nbAutocomplete", "autocomplete"], overlayOffset: "overlayOffset", scrollStrategy: "scrollStrategy", customOverlayHost: "customOverlayHost" }, host: { listeners: { "input": "handleInput()", "keydown.arrowDown": "handleKeydown()", "keydown.arrowUp": "handleKeydown()", "blur": "handleBlur()" }, properties: { "class.nb-autocomplete-position-top": "this.top", "class.nb-autocomplete-position-bottom": "this.bottom", "attr.role": "this.role", "attr.aria-autocomplete": "this.ariaAutocomplete", "attr.haspopup": "this.hasPopup", "attr.aria-expanded": "this.ariaExpanded", "attr.aria-owns": "this.ariaOwns", "attr.aria-activedescendant": "this.ariaActiveDescendant" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NbAutocompleteDirective),
            multi: true,
        },
    ], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbAutocompleteDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[nbAutocomplete]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NbAutocompleteDirective),
                            multi: true,
                        },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NbOverlayService }, { type: i0.ChangeDetectorRef }, { type: i2.NbTriggerStrategyBuilderService }, { type: i3.NbPositionBuilderService }, { type: i4.NbActiveDescendantKeyManagerFactoryService }, { type: i0.Renderer2 }]; }, propDecorators: { autocomplete: [{
                type: Input,
                args: ['nbAutocomplete']
            }], overlayOffset: [{
                type: Input
            }], scrollStrategy: [{
                type: Input
            }], customOverlayHost: [{
                type: Input
            }], top: [{
                type: HostBinding,
                args: ['class.nb-autocomplete-position-top']
            }], bottom: [{
                type: HostBinding,
                args: ['class.nb-autocomplete-position-bottom']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], ariaAutocomplete: [{
                type: HostBinding,
                args: ['attr.aria-autocomplete']
            }], hasPopup: [{
                type: HostBinding,
                args: ['attr.haspopup']
            }], ariaExpanded: [{
                type: HostBinding,
                args: ['attr.aria-expanded']
            }], ariaOwns: [{
                type: HostBinding,
                args: ['attr.aria-owns']
            }], ariaActiveDescendant: [{
                type: HostBinding,
                args: ['attr.aria-activedescendant']
            }], handleInput: [{
                type: HostListener,
                args: ['input']
            }], handleKeydown: [{
                type: HostListener,
                args: ['keydown.arrowDown']
            }, {
                type: HostListener,
                args: ['keydown.arrowUp']
            }], handleBlur: [{
                type: HostListener,
                args: ['blur']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUlMLFNBQVMsRUFFVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEdBSU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHOUUsT0FBTyxFQUFFLFNBQVMsRUFBc0QsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUvRyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFFTCxZQUFZLEVBQ1osVUFBVSxHQUVYLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUdMLDBCQUEwQixHQUMzQixNQUFNLG9DQUFvQyxDQUFDOzs7Ozs7QUFLNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW9DSztBQVdMLE1BQU0sT0FBTyx1QkFBdUI7SUErRmxDLFlBQ1ksT0FBbUIsRUFDbkIsT0FBeUIsRUFDekIsRUFBcUIsRUFDckIsc0JBQXVELEVBQ3ZELGVBQXlDLEVBQ3pDLGlDQUFtRyxFQUNuRyxRQUFtQjtRQU5uQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLE9BQUUsR0FBRixFQUFFLENBQW1C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WUFBWTt1QkFBQyxtQkFBbUI7O3NCQUNoQyxZQUFZO3VCQUFDLGlCQUFpQjtnQkFNL0IsVUFBVTtzQkFEVCxZQUFZO3VCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOYk92ZXJsYXlSZWYsIE5iU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9tYXBwaW5nJztcbmltcG9ydCB7IE5iVHJpZ2dlciwgTmJUcmlnZ2VyU3RyYXRlZ3ksIE5iVHJpZ2dlclN0cmF0ZWd5QnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9vdmVybGF5LXRyaWdnZXInO1xuaW1wb3J0IHsgTmJPdmVybGF5U2VydmljZSB9IGZyb20gJy4uL2Nkay9vdmVybGF5L292ZXJsYXktc2VydmljZSc7XG5pbXBvcnQgeyBFTlRFUiwgRVNDQVBFIH0gZnJvbSAnLi4vY2RrL2tleWNvZGVzL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIE5iQWRqdXN0YWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gIE5iQWRqdXN0bWVudCxcbiAgTmJQb3NpdGlvbixcbiAgTmJQb3NpdGlvbkJ1aWxkZXJTZXJ2aWNlLFxufSBmcm9tICcuLi9jZGsvb3ZlcmxheS9vdmVybGF5LXBvc2l0aW9uJztcbmltcG9ydCB7XG4gIE5iQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIsXG4gIE5iQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXJGYWN0b3J5U2VydmljZSxcbiAgTmJLZXlNYW5hZ2VyQWN0aXZlSXRlbU1vZGUsXG59IGZyb20gJy4uL2Nkay9hMTF5L2Rlc2NlbmRhbnQta2V5LW1hbmFnZXInO1xuaW1wb3J0IHsgTmJTY3JvbGxTdHJhdGVnaWVzIH0gZnJvbSAnLi4vY2RrL2FkYXB0ZXIvYmxvY2stc2Nyb2xsLXN0cmF0ZWd5LWFkYXB0ZXInO1xuaW1wb3J0IHsgTmJPcHRpb25Db21wb25lbnQgfSBmcm9tICcuLi9vcHRpb24vb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkF1dG9jb21wbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5cbi8qKlxuICogVGhlIGBOYkF1dG9jb21wbGV0ZURpcmVjdGl2ZWAgcHJvdmlkZXMgYSBjYXBhYmlsaXR5IHRvIGV4cGFuZCBpbnB1dCB3aXRoXG4gKiBgTmJBdXRvY29tcGxldGVDb21wb25lbnRgIG92ZXJsYXkgY29udGFpbmluZyBvcHRpb25zIHRvIHNlbGVjdCBhbmQgZmlsbCBpbnB1dCB3aXRoLlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoU2hvd2Nhc2UsIGF1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUtc2hvd2Nhc2UuY29tcG9uZW50KVxuICpcbiAqICMjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBJbXBvcnQgYE5iQXV0b2NvbXBsZXRlTW9kdWxlYCB0byB5b3VyIGZlYXR1cmUgbW9kdWxlLlxuICogYGBgdHNcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICAvLyAuLi5cbiAqICAgICBOYkF1dG9jb21wbGV0ZU1vZHVsZSxcbiAqICAgXSxcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgUGFnZU1vZHVsZSB7IH1cbiAqIGBgYFxuICogIyMjIFVzYWdlXG4gKlxuICogWW91IGNhbiBiaW5kIGNvbnRyb2wgd2l0aCBmb3JtIGNvbnRyb2xzIG9yIG5nTW9kZWwuXG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShBdXRvY29tcGxldGUgZm9ybSBiaW5kaW5nLCBhdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLWZvcm0uY29tcG9uZW50KVxuICpcbiAqIE9wdGlvbnMgaW4gdGhlIGF1dG9jb21wbGV0ZSBtYXkgYmUgZ3JvdXBlZCB1c2luZyBgbmItb3B0aW9uLWdyb3VwYCBjb21wb25lbnQuXG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShHcm91cGluZywgYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS1ncm91cC5jb21wb25lbnQpXG4gKlxuICogQXV0b2NvbXBsZXRlIG1heSBjaGFuZ2Ugc2VsZWN0ZWQgb3B0aW9uIHZhbHVlIHZpYSBwcm92aWRlZCBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKEN1c3RvbSBkaXNwbGF5LCBhdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLWN1c3RvbS1kaXNwbGF5LmNvbXBvbmVudClcbiAqXG4gKiBBbHNvLCBhdXRvY29tcGxldGUgbWF5IG1ha2UgZmlyc3Qgb3B0aW9uIGluIG9wdGlvbiBsaXN0IGFjdGl2ZSBhdXRvbWF0aWNhbGx5LlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoQWN0aXZlIGZpcnN0LCBhdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLWFjdGl2ZS1maXJzdC5jb21wb25lbnQpXG4gKlxuICogKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W25iQXV0b2NvbXBsZXRlXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmJBdXRvY29tcGxldGVEaXJlY3RpdmUpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmJBdXRvY29tcGxldGVEaXJlY3RpdmU8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLyoqXG4gICAqIE5iQXV0b2NvbXBsZXRlQ29tcG9uZW50IGluc3RhbmNlIHBhc3NlZCB2aWEgaW5wdXQuXG4gICAqICovXG4gIHByb3RlY3RlZCBfYXV0b2NvbXBsZXRlOiBOYkF1dG9jb21wbGV0ZUNvbXBvbmVudDxUPjtcblxuICAvKipcbiAgICogVHJpZ2dlciBzdHJhdGVneSB1c2VkIGJ5IG92ZXJsYXkuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICogKi9cbiAgcHJvdGVjdGVkIHRyaWdnZXJTdHJhdGVneTogTmJUcmlnZ2VyU3RyYXRlZ3k7XG5cbiAgcHJvdGVjdGVkIHBvc2l0aW9uU3RyYXRlZ3k6IE5iQWRqdXN0YWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3k7XG5cbiAgcHJvdGVjdGVkIG92ZXJsYXlSZWY6IE5iT3ZlcmxheVJlZjtcblxuICBwcm90ZWN0ZWQga2V5TWFuYWdlcjogTmJBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxOYk9wdGlvbkNvbXBvbmVudDxUPj47XG5cbiAgcHJvdGVjdGVkIGRlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcm90ZWN0ZWQgX29uQ2hhbmdlOiAodmFsdWU6IFQpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICBwcm90ZWN0ZWQgX29uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlzIGF1dG9jb21wbGV0ZSBvdmVybGF5IG9wZW5lZC5cbiAgICogKi9cbiAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaXMgYXV0b2NvbXBsZXRlIG92ZXJsYXkgY2xvc2VkLlxuICAgKiAqL1xuICBnZXQgaXNDbG9zZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmlzT3BlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm92aWRlcyBhdXRvY29tcGxldGUgY29tcG9uZW50LlxuICAgKiAqL1xuICBASW5wdXQoJ25iQXV0b2NvbXBsZXRlJylcbiAgZ2V0IGF1dG9jb21wbGV0ZSgpOiBOYkF1dG9jb21wbGV0ZUNvbXBvbmVudDxUPiB7XG4gICAgcmV0dXJuIHRoaXMuX2F1dG9jb21wbGV0ZTtcbiAgfVxuICBzZXQgYXV0b2NvbXBsZXRlKGF1dG9jb21wbGV0ZTogTmJBdXRvY29tcGxldGVDb21wb25lbnQ8VD4pIHtcbiAgICB0aGlzLl9hdXRvY29tcGxldGUgPSBhdXRvY29tcGxldGU7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBvcHRpb25zIG92ZXJsYXkgb2Zmc2V0IChpbiBwaXhlbHMpLlxuICAgKiovXG4gIEBJbnB1dCgpIG92ZXJsYXlPZmZzZXQ6IG51bWJlciA9IDg7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgb3B0aW9ucyBvdmVybGF5IHNjcm9sbCBzdHJhdGVneS5cbiAgICoqL1xuICBASW5wdXQoKSBzY3JvbGxTdHJhdGVneTogTmJTY3JvbGxTdHJhdGVnaWVzID0gJ2Jsb2NrJztcblxuICBASW5wdXQoKSBjdXN0b21PdmVybGF5SG9zdDogRWxlbWVudFJlZjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5iLWF1dG9jb21wbGV0ZS1wb3NpdGlvbi10b3AnKVxuICBnZXQgdG9wKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzT3BlbiAmJiB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zLmxlbmd0aCAmJiB0aGlzLmF1dG9jb21wbGV0ZS5vdmVybGF5UG9zaXRpb24gPT09IE5iUG9zaXRpb24uVE9QO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uYi1hdXRvY29tcGxldGUtcG9zaXRpb24tYm90dG9tJylcbiAgZ2V0IGJvdHRvbSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc09wZW4gJiYgdGhpcy5hdXRvY29tcGxldGUub3B0aW9ucy5sZW5ndGggJiYgdGhpcy5hdXRvY29tcGxldGUub3ZlcmxheVBvc2l0aW9uID09PSBOYlBvc2l0aW9uLkJPVFRPTTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcm9sZTogc3RyaW5nID0gJ2NvbWJvYm94JztcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1hdXRvY29tcGxldGUnKVxuICBhcmlhQXV0b2NvbXBsZXRlOiBzdHJpbmcgPSAnbGlzdCc7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmhhc3BvcHVwJylcbiAgaGFzUG9wdXA6IHN0cmluZyA9ICd0cnVlJztcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1leHBhbmRlZCcpXG4gIGdldCBhcmlhRXhwYW5kZWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pc09wZW4gJiYgdGhpcy5pc09wZW4udG9TdHJpbmcoKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLW93bnMnKVxuICBnZXQgYXJpYU93bnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuID8gdGhpcy5hdXRvY29tcGxldGUuaWQgOiBudWxsO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudCcpXG4gIGdldCBhcmlhQWN0aXZlRGVzY2VuZGFudCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc09wZW4gJiYgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0gPyB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbS5pZCA6IG51bGw7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaG9zdFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgb3ZlcmxheTogTmJPdmVybGF5U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByb3RlY3RlZCB0cmlnZ2VyU3RyYXRlZ3lCdWlsZGVyOiBOYlRyaWdnZXJTdHJhdGVneUJ1aWxkZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBwb3NpdGlvbkJ1aWxkZXI6IE5iUG9zaXRpb25CdWlsZGVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXJGYWN0b3J5OiBOYkFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyRmFjdG9yeVNlcnZpY2U8TmJPcHRpb25Db21wb25lbnQ8VD4+LFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLFxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMudHJpZ2dlclN0cmF0ZWd5ID0gdGhpcy5jcmVhdGVUcmlnZ2VyU3RyYXRlZ3koKTtcbiAgICB0aGlzLnN1YnNjcmliZU9uVHJpZ2dlcnMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnRyaWdnZXJTdHJhdGVneSkge1xuICAgICAgdGhpcy50cmlnZ2VyU3RyYXRlZ3kuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBvc2l0aW9uU3RyYXRlZ3kpIHtcbiAgICAgIHRoaXMucG9zaXRpb25TdHJhdGVneS5kaXNwb3NlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcpXG4gIGhhbmRsZUlucHV0KCkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgIHRoaXMuX29uQ2hhbmdlKGN1cnJlbnRWYWx1ZSk7XG4gICAgdGhpcy5zZXRIb3N0SW5wdXRWYWx1ZSh0aGlzLmdldERpc3BsYXlWYWx1ZShjdXJyZW50VmFsdWUpKTtcbiAgICB0aGlzLnNob3coKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uYXJyb3dEb3duJylcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5hcnJvd1VwJylcbiAgaGFuZGxlS2V5ZG93bigpIHtcbiAgICB0aGlzLnNob3coKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBoYW5kbGVCbHVyKCkge1xuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICB9XG5cbiAgc2hvdygpIHtcbiAgICBpZiAodGhpcy5zaG91bGRTaG93KCkpIHtcbiAgICAgIHRoaXMuYXR0YWNoVG9PdmVybGF5KCk7XG4gICAgICB0aGlzLnNldEFjdGl2ZUl0ZW0oKTtcbiAgICB9XG4gIH1cblxuICBoaWRlKCkge1xuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgLy8gTmVlZCB0byB1cGRhdGUgY2xhc3MgdmlhIEBIb3N0QmluZGluZ1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBUKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVJbnB1dFZhbHVlVXBkYXRlKHZhbHVlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmhvc3RSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgZGlzYWJsZWQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmliZU9uT3B0aW9uQ2xpY2soKSB7XG4gICAgLyoqXG4gICAgICogSWYgdGhlIHVzZXIgY2hhbmdlcyBwcm92aWRlZCBvcHRpb25zIGxpc3QgaW4gdGhlIHJ1bnRpbWUgd2UgaGF2ZSB0byBoYW5kbGUgdGhpc1xuICAgICAqIGFuZCByZXN1YnNjcmliZSBvbiBvcHRpb25zIHNlbGVjdGlvbiBjaGFuZ2VzIGV2ZW50LlxuICAgICAqIE90aGVyd2lzZSwgdGhlIHVzZXIgd2lsbCBub3QgYmUgYWJsZSB0byBzZWxlY3QgbmV3IG9wdGlvbnMuXG4gICAgICogKi9cbiAgICB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zLmNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy5zZXRBY3RpdmVJdGVtKCkpLFxuICAgICAgICBzdGFydFdpdGgodGhpcy5hdXRvY29tcGxldGUub3B0aW9ucyksXG4gICAgICAgIHN3aXRjaE1hcCgob3B0aW9uczogUXVlcnlMaXN0PE5iT3B0aW9uQ29tcG9uZW50PFQ+PikgPT4ge1xuICAgICAgICAgIHJldHVybiBtZXJnZSguLi5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24uY2xpY2spKTtcbiAgICAgICAgfSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGNsaWNrZWRPcHRpb246IE5iT3B0aW9uQ29tcG9uZW50PFQ+KSA9PiB0aGlzLmhhbmRsZUlucHV0VmFsdWVVcGRhdGUoY2xpY2tlZE9wdGlvbi52YWx1ZSwgdHJ1ZSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmliZU9uUG9zaXRpb25DaGFuZ2UoKSB7XG4gICAgdGhpcy5wb3NpdGlvblN0cmF0ZWd5LnBvc2l0aW9uQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKHBvc2l0aW9uOiBOYlBvc2l0aW9uKSA9PiB7XG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZS5vdmVybGF5UG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEFjdGl2ZUl0ZW0oKTogTmJPcHRpb25Db21wb25lbnQ8VD4ge1xuICAgIHJldHVybiB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXR1cEF1dG9jb21wbGV0ZSgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZS5zZXRIb3N0KHRoaXMuY3VzdG9tT3ZlcmxheUhvc3QgfHwgdGhpcy5ob3N0UmVmKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXREaXNwbGF5VmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIGNvbnN0IGRpc3BsYXlGbiA9IHRoaXMuYXV0b2NvbXBsZXRlLmhhbmRsZURpc3BsYXlGbjtcbiAgICByZXR1cm4gZGlzcGxheUZuID8gZGlzcGxheUZuKHZhbHVlKSA6IHZhbHVlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldENvbnRhaW5lcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5vdmVybGF5UmVmICYmXG4gICAgICB0aGlzLmlzT3BlbiAmJlxuICAgICAgPENvbXBvbmVudFJlZjxhbnk+PntcbiAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICBuYXRpdmVFbGVtZW50OiB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVJbnB1dFZhbHVlVXBkYXRlKHZhbHVlOiBULCBmb2N1c0lucHV0OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICB0aGlzLnNldEhvc3RJbnB1dFZhbHVlKHZhbHVlID8/ICcnKTtcbiAgICB0aGlzLl9vbkNoYW5nZSh2YWx1ZSk7XG4gICAgaWYgKGZvY3VzSW5wdXQpIHtcbiAgICAgIHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIHRoaXMuYXV0b2NvbXBsZXRlLmVtaXRTZWxlY3RlZCh2YWx1ZSk7XG4gICAgdGhpcy5oaWRlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlT25UcmlnZ2VycygpIHtcbiAgICB0aGlzLnRyaWdnZXJTdHJhdGVneS5zaG93JC5waXBlKGZpbHRlcigoKSA9PiB0aGlzLmlzQ2xvc2VkKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2hvdygpKTtcblxuICAgIHRoaXMudHJpZ2dlclN0cmF0ZWd5LmhpZGUkLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMuaXNPcGVuKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGlkZSgpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVUcmlnZ2VyU3RyYXRlZ3koKTogTmJUcmlnZ2VyU3RyYXRlZ3kge1xuICAgIHJldHVybiB0aGlzLnRyaWdnZXJTdHJhdGVneUJ1aWxkZXJcbiAgICAgIC50cmlnZ2VyKE5iVHJpZ2dlci5GT0NVUylcbiAgICAgIC5ob3N0KHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50KVxuICAgICAgLmNvbnRhaW5lcigoKSA9PiB0aGlzLmdldENvbnRhaW5lcigpKVxuICAgICAgLmJ1aWxkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlS2V5TWFuYWdlcigpOiB2b2lkIHtcbiAgICB0aGlzLmtleU1hbmFnZXIgPSB0aGlzLmFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyRmFjdG9yeS5jcmVhdGUodGhpcy5hdXRvY29tcGxldGUub3B0aW9ucyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0SG9zdElucHV0VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLmhvc3RSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuZ2V0RGlzcGxheVZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVQb3NpdGlvblN0cmF0ZWd5KCk6IE5iQWRqdXN0YWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uQnVpbGRlclxuICAgICAgLmNvbm5lY3RlZFRvKHRoaXMuY3VzdG9tT3ZlcmxheUhvc3QgfHwgdGhpcy5ob3N0UmVmKVxuICAgICAgLnBvc2l0aW9uKE5iUG9zaXRpb24uQk9UVE9NKVxuICAgICAgLm9mZnNldCh0aGlzLm92ZXJsYXlPZmZzZXQpXG4gICAgICAuYWRqdXN0bWVudChOYkFkanVzdG1lbnQuVkVSVElDQUwpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmliZU9uT3ZlcmxheUtleXMoKTogdm9pZCB7XG4gICAgdGhpcy5vdmVybGF5UmVmXG4gICAgICAua2V5ZG93bkV2ZW50cygpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFICYmIHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLmhvc3RSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBjb25zdCBhY3RpdmVJdGVtID0gdGhpcy5nZXRBY3RpdmVJdGVtKCk7XG4gICAgICAgICAgaWYgKCFhY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuaGFuZGxlSW5wdXRWYWx1ZVVwZGF0ZShhY3RpdmVJdGVtLnZhbHVlLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmtleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0QWN0aXZlSXRlbSgpIHtcbiAgICAvLyBJZiBhdXRvY29tcGxldGUgaGFzIGFjdGl2ZUZpcnN0IGlucHV0IHNldCB0byB0cnVlLFxuICAgIC8vIGtleU1hbmFnZXIgc2V0IGZpcnN0IG9wdGlvbiBhY3RpdmUsIG90aGVyd2lzZSAtIHJlc2V0IGFjdGl2ZSBvcHRpb24uXG4gICAgY29uc3QgbW9kZSA9IHRoaXMuYXV0b2NvbXBsZXRlLmFjdGl2ZUZpcnN0XG4gICAgICA/IE5iS2V5TWFuYWdlckFjdGl2ZUl0ZW1Nb2RlLkZJUlNUX0FDVElWRVxuICAgICAgOiBOYktleU1hbmFnZXJBY3RpdmVJdGVtTW9kZS5SRVNFVF9BQ1RJVkU7XG4gICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0obW9kZSk7XG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXR0YWNoVG9PdmVybGF5KCkge1xuICAgIGlmICghdGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLnNldHVwQXV0b2NvbXBsZXRlKCk7XG4gICAgICB0aGlzLmluaXRPdmVybGF5KCk7XG4gICAgfVxuICAgIHRoaXMub3ZlcmxheVJlZi5hdHRhY2godGhpcy5hdXRvY29tcGxldGUucG9ydGFsKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVPdmVybGF5KCkge1xuICAgIGNvbnN0IHNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5jcmVhdGVTY3JvbGxTdHJhdGVneSgpO1xuICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xuICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5wb3NpdGlvblN0cmF0ZWd5LFxuICAgICAgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICBwYW5lbENsYXNzOiB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zUGFuZWxDbGFzcyxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0T3ZlcmxheSgpIHtcbiAgICB0aGlzLnBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLmNyZWF0ZVBvc2l0aW9uU3RyYXRlZ3koKTtcblxuICAgIHRoaXMuY3JlYXRlS2V5TWFuYWdlcigpO1xuICAgIHRoaXMuc3Vic2NyaWJlT25Qb3NpdGlvbkNoYW5nZSgpO1xuICAgIHRoaXMuc3Vic2NyaWJlT25PcHRpb25DbGljaygpO1xuICAgIHRoaXMuY2hlY2tPdmVybGF5VmlzaWJpbGl0eSgpO1xuICAgIHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuICAgIHRoaXMuc3Vic2NyaWJlT25PdmVybGF5S2V5cygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNoZWNrT3ZlcmxheVZpc2liaWxpdHkoKSB7XG4gICAgdGhpcy5hdXRvY29tcGxldGUub3B0aW9ucy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVTY3JvbGxTdHJhdGVneSgpOiBOYlNjcm9sbFN0cmF0ZWd5IHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXNbdGhpcy5zY3JvbGxTdHJhdGVneV0oKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzaG91bGRTaG93KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzQ2xvc2VkICYmIHRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMubGVuZ3RoID4gMDtcbiAgfVxufVxuIl19