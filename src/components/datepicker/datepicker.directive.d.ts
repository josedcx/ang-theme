import { ChangeDetectorRef, ElementRef, InjectionToken, OnDestroy, Type } from '@angular/core';
import { ControlValueAccessor, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { NbDateService } from '../calendar-kit/services/date.service';
import * as i0 from "@angular/core";
/**
 * The `NbDatepickerAdapter` instances provide way how to parse, format and validate
 * different date types.
 * */
export declare abstract class NbDatepickerAdapter<D> {
    /**
     * Picker component class.
     * */
    abstract picker: Type<any>;
    /**
     * Parse date string according to the format.
     * */
    abstract parse(value: string, format: string): D;
    /**
     * Format date according to the format.
     * */
    abstract format(value: D, format: string): string;
    /**
     * Validates date string according to the passed format.
     * */
    abstract isValid(value: string, format: string): boolean;
}
/**
 * Validators config that will be used by form control to perform proper validation.
 * */
export interface NbPickerValidatorConfig<D> {
    /**
     * Minimum date available in picker.
     * */
    min: D;
    /**
     * Maximum date available in picker.
     * */
    max: D;
    /**
     * Predicate that determines is value available for picking.
     * */
    filter: (D: any) => boolean;
}
/**
 * Datepicker is an control that can pick any values anyway.
 * It has to be bound to the datepicker directive through nbDatepicker input.
 * */
export declare abstract class NbDatepicker<T, D = T> {
    /**
     * HTML input element date format.
     * */
    abstract format: string;
    abstract get value(): T;
    abstract set value(value: T);
    abstract get valueChange(): Observable<T>;
    abstract get init(): Observable<void>;
    /**
     * Attaches datepicker to the native input element.
     * */
    abstract attach(hostRef: ElementRef): any;
    /**
     * Returns validator configuration based on the input properties.
     * */
    abstract getValidatorConfig(): NbPickerValidatorConfig<D>;
    abstract show(): any;
    abstract hide(): any;
    abstract shouldHide(): boolean;
    abstract get isShown(): boolean;
    abstract get blur(): Observable<void>;
    abstract get formatChanged$(): Observable<void>;
}
export declare const NB_DATE_ADAPTER: InjectionToken<NbDatepickerAdapter<any>>;
export declare const NB_DATE_SERVICE_OPTIONS: InjectionToken<unknown>;
export declare class NbDatepickerDirective<D> implements OnDestroy, ControlValueAccessor, Validator {
    protected document: any;
    protected datepickerAdapters: NbDatepickerAdapter<D>[];
    protected hostRef: ElementRef;
    protected dateService: NbDateService<D>;
    protected changeDetector: ChangeDetectorRef;
    /**
     * Provides datepicker component.
     * */
    set setPicker(picker: NbDatepicker<D>);
    protected pickerInputsChangedSubscription: Subscription | undefined;
    /**
     * Datepicker adapter.
     * */
    protected datepickerAdapter: NbDatepickerAdapter<D>;
    /**
     * Datepicker instance.
     * */
    protected picker: NbDatepicker<D>;
    protected destroy$: Subject<void>;
    protected isDatepickerReady: boolean;
    protected queue: D | undefined;
    protected onChange: (D: any) => void;
    protected onTouched: () => void;
    /**
     * Form control validators will be called in validators context, so, we need to bind them.
     * */
    protected validator: ValidatorFn;
    constructor(document: any, datepickerAdapters: NbDatepickerAdapter<D>[], hostRef: ElementRef, dateService: NbDateService<D>, changeDetector: ChangeDetectorRef);
    /**
     * Returns html input element.
     * */
    get input(): HTMLInputElement;
    /**
     * Returns host input value.
     * */
    get inputValue(): string;
    ngOnDestroy(): void;
    /**
     * Writes value in picker and html input element.
     * */
    writeValue(value: D): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    /**
     * Form control validation based on picker validator config.
     * */
    validate(): ValidationErrors | null;
    /**
     * Hides picker, focuses the input
     */
    protected hidePicker(): void;
    /**
     * Validates that we can parse value correctly.
     * */
    protected parseValidator(): ValidationErrors | null;
    /**
     * Validates passed value is greater than min.
     * */
    protected minValidator(): ValidationErrors | null;
    /**
     * Validates passed value is smaller than max.
     * */
    protected maxValidator(): ValidationErrors | null;
    /**
     * Validates passed value satisfy the filter.
     * */
    protected filterValidator(): ValidationErrors | null;
    /**
     * Chooses datepicker adapter based on passed picker component.
     * */
    protected chooseDatepickerAdapter(): void;
    /**
     * Attaches picker to the host input element and subscribes on value changes.
     * */
    protected setupPicker(): void;
    protected writePicker(value: D): void;
    protected writeInput(value: D): void;
    /**
     * Validates if no datepicker adapter provided.
     * */
    protected noDatepickerAdapterProvided(): boolean;
    protected subscribeOnInputChange(): void;
    /**
     * Parses input value and write if it isn't null.
     * */
    protected handleInputChange(value: string): void;
    protected parseInputValue(value: any): D | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbDatepickerDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NbDatepickerDirective<any>, "input[nbDatepicker]", never, { "setPicker": "nbDatepicker"; }, {}, never>;
}
