/*
 * @license
 * 
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbDataSource } from '../../cdk/table/data-source';
import { NB_DEFAULT_ROW_LEVEL } from './tree-grid.model';
import * as i0 from "@angular/core";
import * as i1 from "./tree-grid-filter.service";
import * as i2 from "./tree-grid-sort.service";
import * as i3 from "./tree-grid.service";
import * as i4 from "./tree-grid-data.service";
export class NbTreeGridDataSource extends NbDataSource {
    constructor(sortService, filterService, treeGridService, treeGridDataService) {
        super();
        this.sortService = sortService;
        this.filterService = filterService;
        this.treeGridService = treeGridService;
        this.treeGridDataService = treeGridDataService;
        /** Stream emitting render data to the table (depends on ordered data changes). */
        this.renderData = new BehaviorSubject([]);
        this.filterRequest = new BehaviorSubject('');
        this.sortRequest = new BehaviorSubject(null);
    }
    setData(data, customGetters) {
        let presentationData = [];
        if (data) {
            presentationData = this.treeGridDataService.toPresentationNodes(data, customGetters);
        }
        this.data = new BehaviorSubject(presentationData);
        this.updateChangeSubscription();
    }
    connect(collectionViewer) {
        return this.renderData;
    }
    disconnect(collectionViewer) {
    }
    expand(row) {
        this.treeGridService.expand(this.data.value, row);
        this.data.next(this.data.value);
    }
    collapse(row) {
        this.treeGridService.collapse(this.data.value, row);
        this.data.next(this.data.value);
    }
    toggle(row, options) {
        this.treeGridService.toggle(this.data.value, row, options);
        this.data.next(this.data.value);
    }
    toggleByIndex(dataIndex, options) {
        const node = this.renderData.value && this.renderData.value[dataIndex];
        if (node) {
            this.toggle(node.data, options);
        }
    }
    getLevel(rowIndex) {
        const row = this.renderData.value[rowIndex];
        return row ? row.level : NB_DEFAULT_ROW_LEVEL;
    }
    sort(sortRequest) {
        this.sortRequest.next(sortRequest);
    }
    filter(searchQuery) {
        this.filterRequest.next(searchQuery);
    }
    updateChangeSubscription() {
        const dataStream = this.data;
        const filteredData = combineLatest([dataStream, this.filterRequest])
            .pipe(map(([data]) => this.treeGridDataService.copy(data)), map(data => this.filterData(data)));
        const sortedData = combineLatest([filteredData, this.sortRequest])
            .pipe(map(([data]) => this.sortData(data)));
        sortedData
            .pipe(map((data) => this.treeGridDataService.flattenExpanded(data)))
            .subscribe((data) => this.renderData.next(data));
    }
    filterData(data) {
        return this.filterService.filter(this.filterRequest.value, data);
    }
    sortData(data) {
        return this.sortService.sort(this.sortRequest.value, data);
    }
}
export class NbTreeGridDataSourceBuilder {
    constructor(filterService, sortService, treeGridService, treeGridDataService) {
        this.filterService = filterService;
        this.sortService = sortService;
        this.treeGridService = treeGridService;
        this.treeGridDataService = treeGridDataService;
    }
    create(data, customGetters) {
        const dataSource = new NbTreeGridDataSource(this.sortService, this.filterService, this.treeGridService, this.treeGridDataService);
        dataSource.setData(data, customGetters);
        return dataSource;
    }
}
NbTreeGridDataSourceBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbTreeGridDataSourceBuilder, deps: [{ token: i1.NbTreeGridFilterService }, { token: i2.NbTreeGridSortService }, { token: i3.NbTreeGridService }, { token: i4.NbTreeGridDataService }], target: i0.ɵɵFactoryTarget.Injectable });
NbTreeGridDataSourceBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbTreeGridDataSourceBuilder });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbTreeGridDataSourceBuilder, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NbTreeGridFilterService }, { type: i2.NbTreeGridSortService }, { type: i3.NbTreeGridService }, { type: i4.NbTreeGridDataService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLWRhdGEtc291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL3RyZWUtZ3JpZC9kYXRhLXNvdXJjZS90cmVlLWdyaWQtZGF0YS1zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUszRCxPQUFPLEVBQWEsb0JBQW9CLEVBQThCLE1BQU0sbUJBQW1CLENBQUM7Ozs7OztBQU9oRyxNQUFNLE9BQU8sb0JBQXdCLFNBQVEsWUFBMkM7SUFZdEYsWUFBb0IsV0FBcUMsRUFDckMsYUFBeUMsRUFDekMsZUFBcUMsRUFDckMsbUJBQTZDO1FBQy9ELEtBQUssRUFBRSxDQUFDO1FBSlUsZ0JBQVcsR0FBWCxXQUFXLENBQTBCO1FBQ3JDLGtCQUFhLEdBQWIsYUFBYSxDQUE0QjtRQUN6QyxvQkFBZSxHQUFmLGVBQWUsQ0FBc0I7UUFDckMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUEwQjtRQVZqRSxrRkFBa0Y7UUFDakUsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFrQyxFQUFFLENBQUMsQ0FBQztRQUV0RSxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRWhELGdCQUFXLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO0lBT3hFLENBQUM7SUFFRCxPQUFPLENBQUksSUFBUyxFQUFFLGFBQStCO1FBQ25ELElBQUksZ0JBQWdCLEdBQW9DLEVBQUUsQ0FBQztRQUMzRCxJ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QUFlLEVBQ3BCLElBQUksQ0FBQyxtQkFBbUIsQ0FDekIsQ0FBQztRQUVGLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7O3dIQWpCVSwyQkFBMkI7NEhBQTNCLDJCQUEyQjsyRkFBM0IsMkJBQTJCO2tCQUR2QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOYkNvbGxlY3Rpb25WaWV3ZXIgfSBmcm9tICcuLi8uLi9jZGsvY29sbGVjdGlvbnMvY29sbGVjdGlvbi12aWV3ZXInO1xuaW1wb3J0IHsgTmJEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vY2RrL3RhYmxlL2RhdGEtc291cmNlJztcbmltcG9ydCB7IE5iU29ydGFibGUsIE5iU29ydFJlcXVlc3QgfSBmcm9tICcuLi90cmVlLWdyaWQtc29ydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJUcmVlR3JpZERhdGFTZXJ2aWNlIH0gZnJvbSAnLi90cmVlLWdyaWQtZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IE5iVHJlZUdyaWRGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi90cmVlLWdyaWQtZmlsdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJUcmVlR3JpZFNvcnRTZXJ2aWNlIH0gZnJvbSAnLi90cmVlLWdyaWQtc29ydC5zZXJ2aWNlJztcbmltcG9ydCB7IE5iR2V0dGVycywgTkJfREVGQVVMVF9ST1dfTEVWRUwsIE5iVHJlZUdyaWRQcmVzZW50YXRpb25Ob2RlIH0gZnJvbSAnLi90cmVlLWdyaWQubW9kZWwnO1xuaW1wb3J0IHsgTmJUb2dnbGVPcHRpb25zLCBOYlRyZWVHcmlkU2VydmljZSB9IGZyb20gJy4vdHJlZS1ncmlkLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5iRmlsdGVyYWJsZSB7XG4gIGZpbHRlcihmaWx0ZXJSZXF1ZXN0OiBzdHJpbmcpO1xufVxuXG5leHBvcnQgY2xhc3MgTmJUcmVlR3JpZERhdGFTb3VyY2U8VD4gZXh0ZW5kcyBOYkRhdGFTb3VyY2U8TmJUcmVlR3JpZFByZXNlbnRhdGlvbk5vZGU8VD4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1wbGVtZW50cyBOYlNvcnRhYmxlLCBOYkZpbHRlcmFibGUge1xuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhIG5ldyBkYXRhIGFycmF5IGlzIHNldCBvbiB0aGUgZGF0YSBzb3VyY2UuICovXG4gIHByaXZhdGUgZGF0YTogQmVoYXZpb3JTdWJqZWN0PE5iVHJlZUdyaWRQcmVzZW50YXRpb25Ob2RlPFQ+W10+O1xuXG4gIC8qKiBTdHJlYW0gZW1pdHRpbmcgcmVuZGVyIGRhdGEgdG8gdGhlIHRhYmxlIChkZXBlbmRzIG9uIG9yZGVyZWQgZGF0YSBjaGFuZ2VzKS4gKi9cbiAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJEYXRhID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOYlRyZWVHcmlkUHJlc2VudGF0aW9uTm9kZTxUPltdPihbXSk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBmaWx0ZXJSZXF1ZXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IHNvcnRSZXF1ZXN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOYlNvcnRSZXF1ZXN0PihudWxsKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNvcnRTZXJ2aWNlOiBOYlRyZWVHcmlkU29ydFNlcnZpY2U8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgZmlsdGVyU2VydmljZTogTmJUcmVlR3JpZEZpbHRlclNlcnZpY2U8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgdHJlZUdyaWRTZXJ2aWNlOiBOYlRyZWVHcmlkU2VydmljZTxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0cmVlR3JpZERhdGFTZXJ2aWNlOiBOYlRyZWVHcmlkRGF0YVNlcnZpY2U8VD4pIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgc2V0RGF0YTxOPihkYXRhOiBOW10sIGN1c3RvbUdldHRlcnM/OiBOYkdldHRlcnM8TiwgVD4pIHtcbiAgICBsZXQgcHJlc2VudGF0aW9uRGF0YTogTmJUcmVlR3JpZFByZXNlbnRhdGlvbk5vZGU8VD5bXSA9IFtdO1xuICAgIGlmIChkYXRhKSB7XG4gICAgICBwcmVzZW50YXRpb25EYXRhID0gdGhpcy50cmVlR3JpZERhdGFTZXJ2aWNlLnRvUHJlc2VudGF0aW9uTm9kZXMoZGF0YSwgY3VzdG9tR2V0dGVycyk7XG4gICAgfVxuXG4gICAgdGhpcy5kYXRhID0gbmV3IEJlaGF2aW9yU3ViamVjdChwcmVzZW50YXRpb25EYXRhKTtcbiAgICB0aGlzLnVwZGF0ZUNoYW5nZVN1YnNjcmlwdGlvbigpO1xuICB9XG5cbiAgY29ubmVjdChcbiAgICBjb2xsZWN0aW9uVmlld2VyOiBOYkNvbGxlY3Rpb25WaWV3ZXIsXG4gICk6IE9ic2VydmFibGU8TmJUcmVlR3JpZFByZXNlbnRhdGlvbk5vZGU8VD5bXSB8IFJlYWRvbmx5QXJyYXk8TmJUcmVlR3JpZFByZXNlbnRhdGlvbk5vZGU8VD4+PiB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyRGF0YTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3QoY29sbGVjdGlvblZpZXdlcjogTmJDb2xsZWN0aW9uVmlld2VyKSB7XG4gIH1cblxuICBleHBhbmQocm93OiBUKSB7XG4gICAgdGhpcy50cmVlR3JpZFNlcnZpY2UuZXhwYW5kKHRoaXMuZGF0YS52YWx1ZSwgcm93KTtcbiAgICB0aGlzLmRhdGEubmV4dCh0aGlzLmRhdGEudmFsdWUpO1xuICB9XG5cbiAgY29sbGFwc2Uocm93OiBUKSB7XG4gICAgdGhpcy50cmVlR3JpZFNlcnZpY2UuY29sbGFwc2UodGhpcy5kYXRhLnZhbHVlLCByb3cpO1xuICAgIHRoaXMuZGF0YS5uZXh0KHRoaXMuZGF0YS52YWx1ZSk7XG4gIH1cblxuICB0b2dnbGUocm93OiBULCBvcHRpb25zPzogTmJUb2dnbGVPcHRpb25zKSB7XG4gICAgdGhpcy50cmVlR3JpZFNlcnZpY2UudG9nZ2xlKHRoaXMuZGF0YS52YWx1ZSwgcm93LCBvcHRpb25zKTtcbiAgICB0aGlzLmRhdGEubmV4dCh0aGlzLmRhdGEudmFsdWUpO1xuICB9XG5cbiAgdG9nZ2xlQnlJbmRleChkYXRhSW5kZXg6IG51bWJlciwgb3B0aW9ucz86IE5iVG9nZ2xlT3B0aW9ucykge1xuICAgIGNvbnN0IG5vZGU6IE5iVHJlZUdyaWRQcmVzZW50YXRpb25Ob2RlPFQ+ID0gdGhpcy5yZW5kZXJEYXRhLnZhbHVlICYmIHRoaXMucmVuZGVyRGF0YS52YWx1ZVtkYXRhSW5kZXhdO1xuICAgIGlmIChub2RlKSB7XG4gICAgICB0aGlzLnRvZ2dsZShub2RlLmRhdGEsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGdldExldmVsKHJvd0luZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHJvdyA9IHRoaXMucmVuZGVyRGF0YS52YWx1ZVtyb3dJbmRleF07XG4gICAgcmV0dXJuIHJvdyA/IHJvdy5sZXZlbCA6IE5CX0RFRkFVTFRfUk9XX0xFVkVMO1xuICB9XG5cbiAgc29ydChzb3J0UmVxdWVzdDogTmJTb3J0UmVxdWVzdCkge1xuICAgIHRoaXMuc29ydFJlcXVlc3QubmV4dChzb3J0UmVxdWVzdCk7XG4gIH1cblxuICBmaWx0ZXIoc2VhcmNoUXVlcnk6IHN0cmluZykge1xuICAgIHRoaXMuZmlsdGVyUmVxdWVzdC5uZXh0KHNlYXJjaFF1ZXJ5KTtcbiAgfVxuXG4gIHByb3RlY3RlZCB1cGRhdGVDaGFuZ2VTdWJzY3JpcHRpb24oKSB7XG4gICAgY29uc3QgZGF0YVN0cmVhbSA9IHRoaXMuZGF0YTtcblxuICAgIGNvbnN0IGZpbHRlcmVkRGF0YSA9IGNvbWJpbmVMYXRlc3QoW2RhdGFTdHJlYW0sIHRoaXMuZmlsdGVyUmVxdWVzdF0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChbZGF0YV0pID0+IHRoaXMudHJlZUdyaWREYXRhU2VydmljZS5jb3B5KGRhdGEpKSxcbiAgICAgICAgbWFwKGRhdGEgPT4gdGhpcy5maWx0ZXJEYXRhKGRhdGEpKSxcbiAgICAgICk7XG5cbiAgICBjb25zdCBzb3J0ZWREYXRhID0gY29tYmluZUxhdGVzdChbZmlsdGVyZWREYXRhLCB0aGlzLnNvcnRSZXF1ZXN0XSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKFtkYXRhXSkgPT4gdGhpcy5zb3J0RGF0YShkYXRhKSksXG4gICAgICApO1xuXG4gICAgc29ydGVkRGF0YVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoZGF0YTogTmJUcmVlR3JpZFByZXNlbnRhdGlvbk5vZGU8VD5bXSkgPT4gdGhpcy50cmVlR3JpZERhdGFTZXJ2aWNlLmZsYXR0ZW5FeHBhbmRlZChkYXRhKSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChkYXRhOiBOYlRyZWVHcmlkUHJlc2VudGF0aW9uTm9kZTxUPltdKSA9PiB0aGlzLnJlbmRlckRhdGEubmV4dChkYXRhKSk7XG4gIH1cblxuICBwcml2YXRlIGZpbHRlckRhdGEoZGF0YTogTmJUcmVlR3JpZFByZXNlbnRhdGlvbk5vZGU8VD5bXSk6IE5iVHJlZUdyaWRQcmVzZW50YXRpb25Ob2RlPFQ+W10ge1xuICAgIHJldHVybiB0aGlzLmZpbHRlclNlcnZpY2UuZmlsdGVyKHRoaXMuZmlsdGVyUmVxdWVzdC52YWx1ZSwgZGF0YSk7XG4gIH1cblxuICBwcml2YXRlIHNvcnREYXRhKGRhdGE6IE5iVHJlZUdyaWRQcmVzZW50YXRpb25Ob2RlPFQ+W10pOiBOYlRyZWVHcmlkUHJlc2VudGF0aW9uTm9kZTxUPltdIHtcbiAgICByZXR1cm4gdGhpcy5zb3J0U2VydmljZS5zb3J0KHRoaXMuc29ydFJlcXVlc3QudmFsdWUsIGRhdGEpO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYlRyZWVHcmlkRGF0YVNvdXJjZUJ1aWxkZXI8VD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZpbHRlclNlcnZpY2U6IE5iVHJlZUdyaWRGaWx0ZXJTZXJ2aWNlPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIHNvcnRTZXJ2aWNlOiBOYlRyZWVHcmlkU29ydFNlcnZpY2U8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgdHJlZUdyaWRTZXJ2aWNlOiBOYlRyZWVHcmlkU2VydmljZTxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0cmVlR3JpZERhdGFTZXJ2aWNlOiBOYlRyZWVHcmlkRGF0YVNlcnZpY2U8VD4pIHtcbiAgfVxuXG4gIGNyZWF0ZTxOPihkYXRhOiBOW10sIGN1c3RvbUdldHRlcnM/OiBOYkdldHRlcnM8TiwgVD4pOiBOYlRyZWVHcmlkRGF0YVNvdXJjZTxUPiB7XG4gICAgY29uc3QgZGF0YVNvdXJjZSA9IG5ldyBOYlRyZWVHcmlkRGF0YVNvdXJjZTxUPihcbiAgICAgIHRoaXMuc29ydFNlcnZpY2UsXG4gICAgICB0aGlzLmZpbHRlclNlcnZpY2UsXG4gICAgICB0aGlzLnRyZWVHcmlkU2VydmljZSxcbiAgICAgIHRoaXMudHJlZUdyaWREYXRhU2VydmljZSxcbiAgICApO1xuXG4gICAgZGF0YVNvdXJjZS5zZXREYXRhKGRhdGEsIGN1c3RvbUdldHRlcnMpO1xuICAgIHJldHVybiBkYXRhU291cmNlO1xuICB9XG59XG4iXX0=