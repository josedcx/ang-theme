import { EventEmitter } from "@angular/core";
export interface NbCalendarDay {
  name: string;
  isHoliday: boolean;
}
export declare type NbCalendarViewModeValues = "year" | "month" | "date";
export declare enum NbCalendarViewMode {
  YEAR = "year",
  MONTH = "month",
  DATE = "date",
}
export declare type NbCalendarSizeValues = "medium" | "large";
export declare enum NbCalendarSize {
  MEDIUM = "medium",
  LARGE = "large",
}
export interface NbCalendarCell<D, T> {
  date: D;
  select: EventEmitter<D>;
  selectedValue?: T;
  visibleDate?: D;
  min?: D;
  max?: D;
  filter?: (D: any) => boolean;
  size?: NbCalendarSize;
}
