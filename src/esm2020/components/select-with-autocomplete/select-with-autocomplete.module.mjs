import { NgModule } from '@angular/core';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbSharedModule } from '../shared/shared.module';
import { NbInputModule } from '../input/input.module';
import { NbCardModule } from '../card/card.module';
import { NbButtonModule } from '../button/button.module';
import { NbSelectWithAutocompleteComponent } from './select-with-autocomplete.component';
import { NbOptionModule } from '../option/option-list.module';
import { NbSelectModule } from '../select/select.module';
import { NbIconModule } from '../icon/icon.module';
import { NbFormFieldModule } from '../form-field/form-field.module';
import * as i0 from "@angular/core";
const NB_SELECT_COMPONENTS = [NbSelectWithAutocompleteComponent];
export class NbSelectWithAutocompleteModule {
}
NbSelectWithAutocompleteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbSelectWithAutocompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NbSelectWithAutocompleteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbSelectWithAutocompleteModule, declarations: [NbSelectWithAutocompleteComponent], imports: [NbSharedModule,
        NbOverlayModule,
        NbButtonModule,
        NbInputModule,
        NbCardModule,
        NbIconModule,
        NbOptionModule,
        NbFormFieldModule,
        NbSelectModule], exports: [NbSelectWithAutocompleteComponent, NbOptionModule, NbSelectModule] });
NbSelectWithAutocompleteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbSelectWithAutocompleteModule, imports: [[
            NbSharedModule,
            NbOverlayModule,
            NbButtonModule,
            NbInputModule,
            NbCardModule,
            NbIconModule,
            NbOptionModule,
            NbFormFieldModule,
            NbSelectModule,
        ], NbOptionModule, NbSelectModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbSelectWithAutocompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NbSharedModule,
                        NbOverlayModule,
                        NbButtonModule,
                        NbInputModule,
                        NbCardModule,
                        NbIconModule,
                        NbOptionModule,
                        NbFormFieldModule,
                        NbSelectModule,
                    ],
                    exports: [...NB_SELECT_COMPONENTS, NbOptionModule, NbSelectModule],
                    declarations: [...NB_SELECT_COMPONENTS],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXdpdGgtYXV0b2NvbXBsZXRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9zZWxlY3Qtd2l0aC1hdXRvY29tcGxldGUvc2VsZWN0LXdpdGgtYXV0b2NvbXBsZXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDekYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBRXBFLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBaUJqRSxNQUFNLE9BQU8sOEJBQThCOzsySEFBOUIsOEJBQThCOzRIQUE5Qiw4QkFBOEIsaUJBakJiLGlDQUFpQyxhQUkzRCxjQUFjO1FBQ2QsZUFBZTtRQUNmLGNBQWM7UUFDZCxhQUFhO1FBQ2IsWUFBWTtRQUNaLFlBQVk7UUFDWixjQUFjO1FBQ2QsaUJBQWlCO1FBQ2pCLGNBQWMsYUFaWSxpQ0FBaUMsRUFjMUIsY0FBYyxFQUFFLGNBQWM7NEhBR3RELDhCQUE4QixZQWRoQztZQUNQLGNBQWM7WUFDZCxlQUFlO1lBQ2YsY0FBYztZQUNkLGFBQWE7WUFDYixZQUFZO1lBQ1osWUFBWTtZQUNaLGNBQWM7WUFDZCxpQkFBaUI7WUFDakIsY0FBYztTQUNmLEVBQ2tDLGNBQWMsRUFBRSxjQUFjOzJGQUd0RCw4QkFBOEI7a0JBZjFDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsaUJBQWlCO3dCQUNqQixjQUFjO3FCQUNmO29CQUNELE9BQU8sRUFBRSxDQUFDLEdBQUcsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQztvQkFDbEUsWUFBWSxFQUFFLENBQUMsR0FBRyxvQkFBb0IsQ0FBQztpQkFDeEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOYk92ZXJsYXlNb2R1bGUgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9vdmVybGF5Lm1vZHVsZSc7XG5pbXBvcnQgeyBOYlNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IE5iSW5wdXRNb2R1bGUgfSBmcm9tICcuLi9pbnB1dC9pbnB1dC5tb2R1bGUnO1xuaW1wb3J0IHsgTmJDYXJkTW9kdWxlIH0gZnJvbSAnLi4vY2FyZC9jYXJkLm1vZHVsZSc7XG5pbXBvcnQgeyBOYkJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9idXR0b24ubW9kdWxlJztcbmltcG9ydCB7IE5iU2VsZWN0V2l0aEF1dG9jb21wbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LXdpdGgtYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYk9wdGlvbk1vZHVsZSB9IGZyb20gJy4uL29wdGlvbi9vcHRpb24tbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHsgTmJTZWxlY3RNb2R1bGUgfSBmcm9tICcuLi9zZWxlY3Qvc2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOYkljb25Nb2R1bGUgfSBmcm9tICcuLi9pY29uL2ljb24ubW9kdWxlJztcbmltcG9ydCB7IE5iRm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnLi4vZm9ybS1maWVsZC9mb3JtLWZpZWxkLm1vZHVsZSc7XG5cbmNvbnN0IE5CX1NFTEVDVF9DT01QT05FTlRTID0gW05iU2VsZWN0V2l0aEF1dG9jb21wbGV0ZUNvbXBvbmVudF07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBOYlNoYXJlZE1vZHVsZSxcbiAgICBOYk92ZXJsYXlNb2R1bGUsXG4gICAgTmJCdXR0b25Nb2R1bGUsXG4gICAgTmJJbnB1dE1vZHVsZSxcbiAgICBOYkNhcmRNb2R1bGUsXG4gICAgTmJJY29uTW9kdWxlLFxuICAgIE5iT3B0aW9uTW9kdWxlLFxuICAgIE5iRm9ybUZpZWxkTW9kdWxlLFxuICAgIE5iU2VsZWN0TW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbLi4uTkJfU0VMRUNUX0NPTVBPTkVOVFMsIE5iT3B0aW9uTW9kdWxlLCBOYlNlbGVjdE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogWy4uLk5CX1NFTEVDVF9DT01QT05FTlRTXSxcbn0pXG5leHBvcnQgY2xhc3MgTmJTZWxlY3RXaXRoQXV0b2NvbXBsZXRlTW9kdWxlIHt9XG4iXX0=