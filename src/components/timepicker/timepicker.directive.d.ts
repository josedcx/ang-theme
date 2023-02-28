import { AfterViewInit, ChangeDetectorRef, ComponentRef, ElementRef, Renderer2 } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ControlValueAccessor } from '@angular/forms';
import { NbTimePickerComponent } from './timepicker.component';
import { NbOverlayRef, NbScrollStrategy } from '../cdk/overlay/mapping';
import { NbAdjustableConnectedPositionStrategy, NbPositionBuilderService } from '../cdk/overlay/overlay-position';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NbCalendarTimeModelService } from '../calendar-kit/services/calendar-time-model.service';
import * as i0 from "@angular/core";

export declare class NbTimePickerDirective<D> implements AfterViewInit, ControlValueAccessor {
    protected document: any;
    protected positionBuilder: NbPositionBuilderService;
    protected hostRef: ElementRef;
    protected triggerStrategyBuilder: NbTriggerStrategyBuilderService;
    protected overlay: NbOverlayService;
    protected cd: ChangeDetectorRef;
    protected calendarTimeModelService: NbCalendarTimeModelService<D>;
    protected dateService: NbDateService<D>;
    protected renderer: Renderer2;
    protected placeholder: string;
    /**
     * Provides timepicker component.
     * */
    get timepicker(): NbTimePickerComponent<D>;
    set timepicker(timePicker: NbTimePickerComponent<D>);
    protected _timePickerComponent: NbTimePickerComponent<D>;
    protected pickerInputsChangedSubscription: Subscription | undefined;
    /**
     * Time picker overlay offset.
     * */
    overlayOffset: number;
    /**
     * String representation of latest selected date.
     * Updated when value is updated programmatically (writeValue), via timepicker (subscribeOnApplyClick)
     * or via input field (handleInputChange)
     * @docs-private
     */
    protected lastInputValue: string;
    /**
     * Positioning strategy used by overlay.
     * @docs-private
     * */
    protected positionStrategy: NbAdjustableConnectedPositionStrategy;
    protected overlayRef: NbOverlayRef;
    protected destroy$: Subject<void>;
    protected onChange: (value: D) => void;
    protected onTouched: () => void;
    /**
     * Trigger strategy used by overlay.
     * @docs-private
     * */
    protected triggerStrategy: NbTriggerStrategy;
    /**
     * Returns html input element.
     * @docs-private
     * */
    get input(): HTMLInputElement;
    /**
     * Determines is timepicker overlay opened.
     * @docs-private
     * */
    get isOpen(): boolean;
    /**
     * Determines is timepicker overlay closed.
     * @docs-private
     * */
    get isClosed(): boolean;
    constructor(document: any, positionBuilder: NbPositionBuilderService, hostRef: ElementRef, triggerStrategyBuilder: NbTriggerStrategyBuilderService, overlay: NbOverlayService, cd: ChangeDetectorRef, calendarTimeModelService: NbCalendarTimeModelService<D>, dateService: NbDateService<D>, renderer: Renderer2, placeholder: string);
    /**
     * Returns host input value.
     * @docs-private
     * */
    get inputValue(): string;
    set inputValue(value: string);
    ngAfterViewInit(): void;
    show(): void;
    hide(): void;
    /**
     * Attaches picker to the timepicker portal.
     * @docs-private
     * */
    protected attachToOverlay(): void;
    setupTimepicker(): void;
    protected initOverlay(): void;
    protected subscribeOnApplyClick(): void;
    protected createOverlay(): void;
    protected subscribeOnTriggers(): void;
    protected createTriggerStrategy(): NbTriggerStrategy;
    protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy;
    protected getContainer(): ComponentRef<any>;
    protected createScrollStrategy(): NbScrollStrategy;
    protected subscribeOnInputChange(): void;
    protected subscribeToBlur(): void;
    /**
     * Parses input value and write if it isn't null.
     * @docs-private
     * */
    protected handleInputChange(value: string): void;
    protected updateValue(value: D): void;
    writeValue(value: D): void;
    registerOnChange(fn: (value: any) => {}): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    protected parseNativeDateString(value: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbTimePickerDirective<any>, [null, null, null, null, null, null, null, null, null, { attribute: "placeholder"; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NbTimePickerDirective<any>, "input[nbTimepicker]", never, { "timepicker": "nbTimepicker"; "overlayOffset": "overlayOffset"; }, {}, never>;
}
