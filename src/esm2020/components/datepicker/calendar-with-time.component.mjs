import { ChangeDetectionStrategy, Component, Input, ViewChild, } from '@angular/core';
import { NbCalendarComponent } from '../calendar/calendar.component';
import { NbCalendarSize } from '../calendar-kit/model';
import { NbPortalOutletDirective } from '../cdk/overlay/mapping';
import { NbTimePickerComponent } from '../timepicker/timepicker.component';
import * as i0 from "@angular/core";
import * as i1 from "../calendar-kit/services/date.service";
import * as i2 from "../calendar-kit/services/calendar-time-model.service";
import * as i3 from "../card/card.component";
import * as i4 from "../calendar/base-calendar.component";
import * as i5 from "../timepicker/timepicker.component";
import * as i6 from "../calendar-kit/components/calendar-actions/calendar-actions.component";
import * as i7 from "../cdk/overlay/mapping";
export class NbCalendarWithTimeComponent extends NbCalendarComponent {
    constructor(dateService, cd, calendarTimeModelService) {
        super();
        this.dateService = dateService;
        this.cd = cd;
        this.calendarTimeModelService = calendarTimeModelService;
    }
    ngOnInit() {
        if (!this.date) {
            this.date = this.calendarTimeModelService.getResetTime();
        }
    }
    ngAfterViewInit() {
        this.portalOutlet.attachTemplatePortal(this.timepicker.portal);
    }
    onDateValueChange(date) {
        const hours = this.dateService.getHours(this.date);
        const minutes = this.dateService.getMinutes(this.date);
        const seconds = this.dateService.getSeconds(this.date);
        const milliseconds = this.dateService.getMilliseconds(this.date);
        let newDate = this.dateService.setHours(date, hours);
        newDate = this.dateService.setMinutes(newDate, minutes);
        newDate = this.dateService.setMinutes(newDate, minutes);
        newDate = this.dateService.setSeconds(newDate, seconds);
        newDate = this.dateService.setMilliseconds(newDate, milliseconds);
        this.date = newDate;
    }
    onTimeChange(selectedTime) {
        let newDate = this.dateService.clone(this.date);
        newDate = this.dateService.setHours(newDate, this.dateService.getHours(selectedTime.time));
        newDate = this.dateService.setMinutes(newDate, this.dateService.getMinutes(selectedTime.time));
        newDate = this.dateService.setSeconds(newDate, this.dateService.getSeconds(selectedTime.time));
        newDate = this.dateService.setMilliseconds(newDate, this.dateService.getMilliseconds(selectedTime.time));
        this.date = newDate;
    }
    saveValue() {
        this.dateChange.emit(this.date);
    }
    saveCurrentTime() {
        this.dateChange.emit(this.dateService.today());
    }
    showSeconds() {
        return this.withSeconds && !this.singleColumn;
    }
    isLarge() {
        return this.size === NbCalendarSize.LARGE;
    }
}
NbCalendarWithTimeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbCalendarWithTimeComponent, deps: [{ token: i1.NbDateService }, { token: i0.ChangeDetectorRef }, { token: i2.NbCalendarTimeModelService }], target: i0.ɵɵFactoryTarget.Component });
NbCalendarWithTimeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0", type: NbCalendarWithTimeComponent, selector: "nb-calendar-with-time", inputs: { visibleDate: "visibleDate", twelveHoursFormat: "twelveHoursFormat", showAmPmLabel: "showAmPmLabel", withSeconds: "withSeconds", singleColumn: "singleColumn", step: "step", timeFormat: "timeFormat", title: "title", applyButtonText: "applyButtonText", currentTimeButtonText: "currentTimeButtonText", showCurrentTimeButton: "showCurrentTimeButton" }, viewQueries: [{ propertyName: "portalOutlet", first: true, predicate: NbPortalOutletDirective, descendants: true }, { propertyName: "timepicker", first: true, predicate: NbTimePickerComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <nb-card class="calendar-with-time">
      <nb-card-body class="picker-body">
        <nb-base-calendar
          [boundingMonth]="boundingMonth"
          [startView]="startView"
          [date]="date"
          [min]="min"
          [max]="max"
          [filter]="filter"
          [dayCellComponent]="dayCellComponent"
          [monthCellComponent]="monthCellComponent"
          [yearCellComponent]="yearCellComponent"
          [size]="size"
          [visibleDate]="visibleDate"
          [showNavigation]="showNavigation"
          [showWeekNumber]="showWeekNumber"
          [weekNumberSymbol]="weekNumberSymbol"
          (dateChange)="onDateValueChange($event)"
        >
        </nb-base-calendar>
        <div
          class="timepicker-section"
          [class.size-large]="isLarge()"
          [class.timepicker-single-column-width]="singleColumn"
          [class.timepicker-multiple-column-width]="!singleColumn"
        >
          <div class="picker-title">{{ title }}</div>
          <nb-timepicker
            (onSelectTime)="onTimeChange($event)"
            [date]="date"
            [twelveHoursFormat]="twelveHoursFormat"
            [showAmPmLabel]="showAmPmLabel"
            [withSeconds]="showSeconds()"
            [showFooter]="false"
            [singleColumn]="singleColumn"
            [step]="step"
          >
          </nb-timepicker>
          <ng-container nbPortalOutlet></ng-container>
        </div>
      </nb-card-body>
      <nb-card-footer class="picker-footer">
        <nb-calendar-actions
          [applyButtonText]="applyButtonText"
          [currentTimeButtonText]="currentTimeButtonText"
          [showCurrentTimeButton]="showCurrentTimeButton"
          (setCurrentTime)="saveCurrentTime()"
          (saveValue)="saveValue()"
        ></nb-calendar-actions>
      </nb-card-footer>
    </nb-card>
  `, isInline: true, styles: ["/**\n * @license\n * \n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//**\n * @license\n * \n * Licensed under the MIT License. See License.txt in the project root for license information.\n*/:host ::ng-deep nb-card.nb-timepicker-container{flex:1 0 0;border-radius:0;width:auto;border-right:0;border-bottom:0}[dir=ltr] :host .picker-footer{padding-left:.625rem}[dir=rtl] :host .picker-footer{padding-right:.625rem}.picker-body{align-items:stretch;display:flex;padding:0}.picker-body nb-base-calendar ::ng-deep nb-card{border-radius:0}.calendar-with-time{overflow:hidden}.timepicker-section{display:flex;flex-direction:column}\n"], components: [{ type: i3.NbCardComponent, selector: "nb-card", inputs: ["size", "status", "accent"] }, { type: i3.NbCardBodyComponent, selector: "nb-card-body" }, { type: i4.NbBaseCalendarComponent, selector: "nb-base-calendar", inputs: ["boundingMonth", "startView", "min", "max", "filter", "dayCellComponent", "monthCellComponent", "yearCellComponent", "size", "visibleDate", "showNavigation", "date", "showWeekNumber", "weekNumberSymbol"], outputs: ["dateChange"] }, { type: i5.NbTimePickerComponent, selector: "nb-timepicker", inputs: ["timeFormat", "twelveHoursFormat", "showAmPmLabel", "withSeconds", "singleColumn", "step", "date", "showFooter", "applyButtonText", "hoursText", "minutesText", "secondsText", "ampmText", "currentTimeButtonText"], outputs: ["onSelectTime"], exportAs: ["nbTimepicker"] }, { type: i3.NbCardFooterComponent, selector: "nb-card-footer" }, { type: i6.NbCalendarActionsComponent, selector: "nb-calendar-actions", inputs: ["applyButtonText", "currentTimeButtonText", "showCurrentTimeButton"], outputs: ["setCurrentTime", "saveValue"] }], directives: [{ type: i7.NbPortalOutletDirective, selector: "[nbPortalOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbCalendarWithTimeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-calendar-with-time', template: `
    <nb-card class="calendar-with-time">
      <nb-card-body class="picker-body">
        <nb-base-calendar
          [boundingMonth]="boundingMonth"
          [startView]="startView"
          [date]="date"
          [min]="min"
          [max]="max"
          [filter]="filter"
          [dayCellComponent]="dayCellComponent"
          [monthCellComponent]="monthCellComponent"
          [yearCellComponent]="yearCellComponent"
          [size]="size"
          [visibleDate]="visibleDate"
          [showNavigation]="showNavigation"
          [showWeekNumber]="showWeekNumber"
          [weekNumberSymbol]="weekNumberSymbol"
          (dateChange)="onDateValueChange($event)"
        >
        </nb-base-calendar>
        <div
          class="timepicker-section"
          [class.size-large]="isLarge()"
          [class.timepicker-single-column-width]="singleColumn"
          [class.timepicker-multiple-column-width]="!singleColumn"
        >
          <div class="picker-title">{{ title }}</div>
          <nb-timepicker
            (onSelectTime)="onTimeChange($event)"
            [date]="date"
            [twelveHoursFormat]="twelveHoursFormat"
            [showAmPmLabel]="showAmPmLabel"
            [withSeconds]="showSeconds()"
            [showFooter]="false"
            [singleColumn]="singleColumn"
            [step]="step"
          >
          </nb-timepicker>
          <ng-container nbPortalOutlet></ng-container>
        </div>
      </nb-card-body>
      <nb-card-footer class="picker-footer">
        <nb-calendar-actions
          [applyButtonText]="applyButtonText"
          [currentTimeButtonText]="currentTimeButtonText"
          [showCurrentTimeButton]="showCurrentTimeButton"
          (setCurrentTime)="saveCurrentTime()"
          (saveValue)="saveValue()"
        ></nb-calendar-actions>
      </nb-card-footer>
    </nb-card>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/**\n * @license\n * \n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//**\n * @license\n * \n * Licensed under the MIT License. See License.txt in the project root for license information.\n*/:host ::ng-deep nb-card.nb-timepicker-container{flex:1 0 0;border-radius:0;width:auto;border-right:0;border-bottom:0}[dir=ltr] :host .picker-footer{padding-left:.625rem}[dir=rtl] :host .picker-footer{padding-right:.625rem}.picker-body{align-items:stretch;display:flex;padding:0}.picker-body nb-base-calendar ::ng-deep nb-card{border-radius:0}.calendar-with-time{overflow:hidden}.timepicker-section{display:flex;flex-direction:column}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NbDateService }, { type: i0.ChangeDetectorRef }, { type: i2.NbCalendarTimeModelService }]; }, propDecorators: { visibleDate: [{
                type: Input
            }], twelveHoursFormat: [{
                type: Input
            }], showAmPmLabel: [{
                type: Input
            }], withSeconds: [{
                type: Input
            }], singleColumn: [{
                type: Input
            }], step: [{
                type: Input
            }], timeFormat: [{
                type: Input
            }], title: [{
                type: Input
            }], applyButtonText: [{
                type: Input
            }], currentTimeButtonText: [{
                type: Input
            }], showCurrentTimeButton: [{
                type: Input
            }], portalOutlet: [{
                type: ViewChild,
                args: [NbPortalOutletDirective]
            }], timepicker: [{
                type: ViewChild,
                args: [NbTimePickerComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2l0aC10aW1lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9kYXRlcGlja2VyL2NhbGVuZGFyLXdpdGgtdGltZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsS0FBSyxFQUVMLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUlyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7Ozs7Ozs7OztBQTREM0UsTUFBTSxPQUFPLDJCQUErQixTQUFRLG1CQUFzQjtJQW9EeEUsWUFDWSxXQUE2QixFQUNoQyxFQUFxQixFQUNsQix3QkFBdUQ7UUFFakUsS0FBSyxFQUFFLENBQUM7UUFKRSxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDaEMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDbEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUErQjtJQUduRSxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDMUQ7SUFDSCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsaUJBQWlCLENBQUMsSUFBTztRQUN2QixNQUFN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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0RULG1CQUVnQix1QkFBdUIsQ0FBQyxNQUFNOzZLQU10QyxXQUFXO3NCQUFuQixLQUFLO2dCQUtHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFLRyxhQUFhO3NCQUFyQixLQUFLO2dCQU1HLFdBQVc7c0JBQW5CLEtBQUs7Z0JBS0csWUFBWTtzQkFBcEIsS0FBSztnQkFNRyxJQUFJO3NCQUFaLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsZUFBZTtzQkFBdkIsS0FBSztnQkFFRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBRUcscUJBQXFCO3NCQUE3QixLQUFLO2dCQUU4QixZQUFZO3NCQUEvQyxTQUFTO3VCQUFDLHVCQUF1QjtnQkFDQSxVQUFVO3NCQUEzQyxTQUFTO3VCQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmJDYWxlbmRhckNvbXBvbmVudCB9IGZyb20gJy4uL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYlNlbGVjdGVkVGltZVBheWxvYWQgfSBmcm9tICcuLi90aW1lcGlja2VyL21vZGVsJztcbmltcG9ydCB7IE5iRGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9jYWxlbmRhci1raXQvc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5iQ2FsZW5kYXJUaW1lTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi4vY2FsZW5kYXIta2l0L3NlcnZpY2VzL2NhbGVuZGFyLXRpbWUtbW9kZWwuc2VydmljZSc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyU2l6ZSB9IGZyb20gJy4uL2NhbGVuZGFyLWtpdC9tb2RlbCc7XG5pbXBvcnQgeyBOYlBvcnRhbE91dGxldERpcmVjdGl2ZSB9IGZyb20gJy4uL2Nkay9vdmVybGF5L21hcHBpbmcnO1xuaW1wb3J0IHsgTmJUaW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vdGltZXBpY2tlci90aW1lcGlja2VyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLWNhbGVuZGFyLXdpdGgtdGltZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5iLWNhcmQgY2xhc3M9XCJjYWxlbmRhci13aXRoLXRpbWVcIj5cbiAgICAgIDxuYi1jYXJkLWJvZHkgY2xhc3M9XCJwaWNrZXItYm9keVwiPlxuICAgICAgICA8bmItYmFzZS1jYWxlbmRhclxuICAgICAgICAgIFtib3VuZGluZ01vbnRoXT1cImJvdW5kaW5nTW9udGhcIlxuICAgICAgICAgIFtzdGFydFZpZXddPVwic3RhcnRWaWV3XCJcbiAgICAgICAgICBbZGF0ZV09XCJkYXRlXCJcbiAgICAgICAgICBbbWluXT1cIm1pblwiXG4gICAgICAgICAgW21heF09XCJtYXhcIlxuICAgICAgICAgIFtmaWx0ZXJdPVwiZmlsdGVyXCJcbiAgICAgICAgICBbZGF5Q2VsbENvbXBvbmVudF09XCJkYXlDZWxsQ29tcG9uZW50XCJcbiAgICAgICAgICBbbW9udGhDZWxsQ29tcG9uZW50XT1cIm1vbnRoQ2VsbENvbXBvbmVudFwiXG4gICAgICAgICAgW3llYXJDZWxsQ29tcG9uZW50XT1cInllYXJDZWxsQ29tcG9uZW50XCJcbiAgICAgICAgICBbc2l6ZV09XCJzaXplXCJcbiAgICAgICAgICBbdmlzaWJsZURhdGVdPVwidmlzaWJsZURhdGVcIlxuICAgICAgICAgIFtzaG93TmF2aWdhdGlvbl09XCJzaG93TmF2aWdhdGlvblwiXG4gICAgICAgICAgW3Nob3dXZWVrTnVtYmVyXT1cInNob3dXZWVrTnVtYmVyXCJcbiAgICAgICAgICBbd2Vla051bWJlclN5bWJvbF09XCJ3ZWVrTnVtYmVyU3ltYm9sXCJcbiAgICAgICAgICAoZGF0ZUNoYW5nZSk9XCJvbkRhdGVWYWx1ZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICA8L25iLWJhc2UtY2FsZW5kYXI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cInRpbWVwaWNrZXItc2VjdGlvblwiXG4gICAgICAgICAgW2NsYXNzLnNpemUtbGFyZ2VdPVwiaXNMYXJnZSgpXCJcbiAgICAgICAgICBbY2xhc3MudGltZXBpY2tlci1zaW5nbGUtY29sdW1uLXdpZHRoXT1cInNpbmdsZUNvbHVtblwiXG4gICAgICAgICAgW2NsYXNzLnRpbWVwaWNrZXItbXVsdGlwbGUtY29sdW1uLXdpZHRoXT1cIiFzaW5nbGVDb2x1bW5cIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci10aXRsZVwiPnt7IHRpdGxlIH19PC9kaXY+XG4gICAgICAgICAgPG5iLXRpbWVwaWNrZXJcbiAgICAgICAgICAgIChvblNlbGVjdFRpbWUpPVwib25UaW1lQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgW2RhdGVdPVwiZGF0ZVwiXG4gICAgICAgICAgICBbdHdlbHZlSG91cnNGb3JtYXRdPVwidHdlbHZlSG91cnNGb3JtYXRcIlxuICAgICAgICAgICAgW3Nob3dBbVBtTGFiZWxdPVwic2hvd0FtUG1MYWJlbFwiXG4gICAgICAgICAgICBbd2l0aFNlY29uZHNdPVwic2hvd1NlY29uZHMoKVwiXG4gICAgICAgICAgICBbc2hvd0Zvb3Rlcl09XCJmYWxzZVwiXG4gICAgICAgICAgICBbc2luZ2xlQ29sdW1uXT1cInNpbmdsZUNvbHVtblwiXG4gICAgICAgICAgICBbc3RlcF09XCJzdGVwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgPC9uYi10aW1lcGlja2VyPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgbmJQb3J0YWxPdXRsZXQ+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uYi1jYXJkLWJvZHk+XG4gICAgICA8bmItY2FyZC1mb290ZXIgY2xhc3M9XCJwaWNrZXItZm9vdGVyXCI+XG4gICAgICAgIDxuYi1jYWxlbmRhci1hY3Rpb25zXG4gICAgICAgICAgW2FwcGx5QnV0dG9uVGV4dF09XCJhcHBseUJ1dHRvblRleHRcIlxuICAgICAgICAgIFtjdXJyZW50VGltZUJ1dHRvblRleHRdPVwiY3VycmVudFRpbWVCdXR0b25UZXh0XCJcbiAgICAgICAgICBbc2hvd0N1cnJlbnRUaW1lQnV0dG9uXT1cInNob3dDdXJyZW50VGltZUJ1dHRvblwiXG4gICAgICAgICAgKHNldEN1cnJlbnRUaW1lKT1cInNhdmVDdXJyZW50VGltZSgpXCJcbiAgICAgICAgICAoc2F2ZVZhbHVlKT1cInNhdmVWYWx1ZSgpXCJcbiAgICAgICAgPjwvbmItY2FsZW5kYXItYWN0aW9ucz5cbiAgICAgIDwvbmItY2FyZC1mb290ZXI+XG4gICAgPC9uYi1jYXJkPlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci13aXRoLXRpbWUtY29udGFpbmVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOYkNhbGVuZGFyV2l0aFRpbWVDb21wb25lbnQ8RD4gZXh0ZW5kcyBOYkNhbGVuZGFyQ29tcG9uZW50PEQ+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgLyoqXG4gICAqIERlZmluZXMgc2VsZWN0ZWQgZGF0ZS5cbiAgICogKi9cbiAgQElucHV0KCkgdmlzaWJsZURhdGU6IEQ7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgMTIgaG91cnMgZm9ybWF0IGxpa2UgJzA3OjAwIFBNJy5cbiAgICogKi9cbiAgQElucHV0KCkgdHdlbHZlSG91cnNGb3JtYXQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIERlZmluZXMgc2hvdWxkIHNob3cgYW0vcG0gbGFiZWwgaWYgdHdlbHZlSG91cnNGb3JtYXQgZW5hYmxlZC5cbiAgICogKi9cbiAgQElucHV0KCkgc2hvd0FtUG1MYWJlbDogYm9vbGVhbjtcblxuICAvKipcbiAgICogU2hvdyBzZWNvbmRzIGluIHRpbWVwaWNrZXIuXG4gICAqIElnbm9yZWQgd2hlbiBzaW5nbGVDb2x1bW4gaXMgdHJ1ZS5cbiAgICogKi9cbiAgQElucHV0KCkgd2l0aFNlY29uZHM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNob3cgdGltZXBpY2tlciB2YWx1ZXMgaW4gb25lIGNvbHVtbiB3aXRoIDYwIG1pbnV0ZXMgc3RlcCBieSBkZWZhdWx0LlxuICAgKiAqL1xuICBASW5wdXQoKSBzaW5nbGVDb2x1bW46IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIERlZmluZXMgbWludXRlcyBzdGVwIHdoZW4gd2UgdXNlIGZpbGwgdGltZSBmb3JtYXQuXG4gICAqIElmIHNldCB0byAyMCwgaXQgd2lsbCBiZTogJzEyOjAwLCAxMjoyMDogMTI6NDAsIDEzOjAwLi4uJ1xuICAgKiAqL1xuICBASW5wdXQoKSBzdGVwOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdGltZSBmb3JtYXQuXG4gICAqICovXG4gIEBJbnB1dCgpIHRpbWVGb3JtYXQ6IHN0cmluZztcblxuICAvKipcbiAgICogRGVmaW5lcyB0ZXh0IG92ZXIgdGhlIHRpbWVwaWNrZXIuXG4gICAqICovXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgYXBwbHlCdXR0b25UZXh0OiBzdHJpbmc7XG5cbiAgQElucHV0KCkgY3VycmVudFRpbWVCdXR0b25UZXh0OiBzdHJpbmc7XG5cbiAgQElucHV0KCkgc2hvd0N1cnJlbnRUaW1lQnV0dG9uOiBib29sZWFuO1xuXG4gIEBWaWV3Q2hpbGQoTmJQb3J0YWxPdXRsZXREaXJlY3RpdmUpIHBvcnRhbE91dGxldDogTmJQb3J0YWxPdXRsZXREaXJlY3RpdmU7XG4gIEBWaWV3Q2hpbGQoTmJUaW1lUGlja2VyQ29tcG9uZW50KSB0aW1lcGlja2VyOiBOYlRpbWVQaWNrZXJDb21wb25lbnQ8RD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGRhdGVTZXJ2aWNlOiBOYkRhdGVTZXJ2aWNlPEQ+LFxuICAgIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIGNhbGVuZGFyVGltZU1vZGVsU2VydmljZTogTmJDYWxlbmRhclRpbWVNb2RlbFNlcnZpY2U8RD4sXG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGF0ZSkge1xuICAgICAgdGhpcy5kYXRlID0gdGhpcy5jYWxlbmRhclRpbWVNb2RlbFNlcnZpY2UuZ2V0UmVzZXRUaW1lKCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMucG9ydGFsT3V0bGV0LmF0dGFjaFRlbXBsYXRlUG9ydGFsKHRoaXMudGltZXBpY2tlci5wb3J0YWwpO1xuICB9XG5cbiAgb25EYXRlVmFsdWVDaGFuZ2UoZGF0ZTogRCk6IHZvaWQge1xuICAgIGNvbnN0IGhvdXJzID0gdGhpcy5kYXRlU2VydmljZS5nZXRIb3Vycyh0aGlzLmRhdGUpO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSB0aGlzLmRhdGVTZXJ2aWNlLmdldE1pbnV0ZXModGhpcy5kYXRlKTtcbiAgICBjb25zdCBzZWNvbmRzID0gdGhpcy5kYXRlU2VydmljZS5nZXRTZWNvbmRzKHRoaXMuZGF0ZSk7XG4gICAgY29uc3QgbWlsbGlzZWNvbmRzID0gdGhpcy5kYXRlU2VydmljZS5nZXRNaWxsaXNlY29uZHModGhpcy5kYXRlKTtcblxuICAgIGxldCBuZXdEYXRlID0gdGhpcy5kYXRlU2VydmljZS5zZXRIb3VycyhkYXRlLCBob3Vycyk7XG4gICAgbmV3RGF0ZSA9IHRoaXMuZGF0ZVNlcnZpY2Uuc2V0TWludXRlcyhuZXdEYXRlLCBtaW51dGVzKTtcbiAgICBuZXdEYXRlID0gdGhpcy5kYXRlU2VydmljZS5zZXRNaW51dGVzKG5ld0RhdGUsIG1pbnV0ZXMpO1xuICAgIG5ld0RhdGUgPSB0aGlzLmRhdGVTZXJ2aWNlLnNldFNlY29uZHMobmV3RGF0ZSwgc2Vjb25kcyk7XG4gICAgbmV3RGF0ZSA9IHRoaXMuZGF0ZVNlcnZpY2Uuc2V0TWlsbGlzZWNvbmRzKG5ld0RhdGUsIG1pbGxpc2Vjb25kcyk7XG5cbiAgICB0aGlzLmRhdGUgPSBuZXdEYXRlO1xuICB9XG5cbiAgb25UaW1lQ2hhbmdlKHNlbGVjdGVkVGltZTogTmJTZWxlY3RlZFRpbWVQYXlsb2FkPEQ+KTogdm9pZCB7XG4gICAgbGV0IG5ld0RhdGUgPSB0aGlzLmRhdGVTZXJ2aWNlLmNsb25lKHRoaXMuZGF0ZSk7XG5cbiAgICBuZXdEYXRlID0gdGhpcy5kYXRlU2VydmljZS5zZXRIb3VycyhuZXdEYXRlLCB0aGlzLmRhdGVTZXJ2aWNlLmdldEhvdXJzKHNlbGVjdGVkVGltZS50aW1lKSk7XG4gICAgbmV3RGF0ZSA9IHRoaXMuZGF0ZVNlcnZpY2Uuc2V0TWludXRlcyhuZXdEYXRlLCB0aGlzLmRhdGVTZXJ2aWNlLmdldE1pbnV0ZXMoc2VsZWN0ZWRUaW1lLnRpbWUpKTtcbiAgICBuZXdEYXRlID0gdGhpcy5kYXRlU2VydmljZS5zZXRTZWNvbmRzKG5ld0RhdGUsIHRoaXMuZGF0ZVNlcnZpY2UuZ2V0U2Vjb25kcyhzZWxlY3RlZFRpbWUudGltZSkpO1xuICAgIG5ld0RhdGUgPSB0aGlzLmRhdGVTZXJ2aWNlLnNldE1pbGxpc2Vjb25kcyhuZXdEYXRlLCB0aGlzLmRhdGVTZXJ2aWNlLmdldE1pbGxpc2Vjb25kcyhzZWxlY3RlZFRpbWUudGltZSkpO1xuXG4gICAgdGhpcy5kYXRlID0gbmV3RGF0ZTtcbiAgfVxuXG4gIHNhdmVWYWx1ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGVDaGFuZ2UuZW1pdCh0aGlzLmRhdGUpO1xuICB9XG5cbiAgc2F2ZUN1cnJlbnRUaW1lKCk6IHZvaWQge1xuICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KHRoaXMuZGF0ZVNlcnZpY2UudG9kYXkoKSk7XG4gIH1cblxuICBzaG93U2Vjb25kcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy53aXRoU2Vjb25kcyAmJiAhdGhpcy5zaW5nbGVDb2x1bW47XG4gIH1cblxuICBpc0xhcmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNpemUgPT09IE5iQ2FsZW5kYXJTaXplLkxBUkdFO1xuICB9XG59XG4iXX0=