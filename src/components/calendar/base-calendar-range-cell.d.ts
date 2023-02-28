import { NbCalendarRange } from "./calendar-range.component";
export declare abstract class NbBaseCalendarRangeCell<D> {
  abstract selectedValue: NbCalendarRange<D>;
  get hasRange(): boolean;
}
