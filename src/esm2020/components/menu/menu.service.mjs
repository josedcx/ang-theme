/**
 * @license
 * 
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { isFragmentContain, isFragmentEqual, isUrlPathContain, isUrlPathEqual } from './url-matching-helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const itemClick$ = new Subject();
const addItems$ = new ReplaySubject(1);
const navigateHome$ = new ReplaySubject(1);
const getSelectedItem$ = new ReplaySubject(1);
const itemSelect$ = new ReplaySubject(1);
const itemHover$ = new ReplaySubject(1);
const submenuToggle$ = new ReplaySubject(1);
const collapseAll$ = new ReplaySubject(1);
// TODO: check if we need both URL and LINK
/**
 *
 *
 * Menu Item options example
 * @stacked-example(Menu Link Parameters, menu/menu-link-params.component)
 *
 *
 */
export class NbMenuItem {
    constructor() {
        /**
         * Item is selected when partly or fully equal to the current url
         * @type {string}
         */
        this.pathMatch = 'full';
    }
    /**
     * @returns item parents in top-down order
     */
    static getParents(item) {
        const parents = [];
        let parent = item.parent;
        while (parent) {
            parents.unshift(parent);
            parent = parent.parent;
        }
        return parents;
    }
    static isParent(item, possibleChild) {
        return possibleChild.parent ? possibleChild.parent === item || this.isParent(item, possibleChild.parent) : false;
    }
}
// TODO: map select events to router change events
// TODO: review the interface
/**
 *
 *
 * Menu Service. Allows you to listen to menu events, or to interact with a menu.
 * @stacked-example(Menu Service, menu/menu-service.component)
 *
 *
 */
export class NbMenuService {
    /**
     * Add items to the end of the menu items list
     * @param {List<NbMenuItem>} items
     * @param {string} tag
     */
    addItems(items, tag) {
        addItems$.next({ tag, items });
    }
    /**
     * Collapses all menu items
     * @param {string} tag
     */
    collapseAll(tag) {
        collapseAll$.next({ tag });
    }
    /**
     * Navigate to the home menu item
     * @param {string} tag
     */
    navigateHome(tag) {
        navigateHome$.next({ tag });
    }
    /**
     * Returns currently selected item. Won't subscribe to the future events.
     * @param {string} tag
     * @returns {Observable<{tag: string; item: NbMenuItem}>}
     */
    getSelectedItem(tag) {
        const listener = new BehaviorSubject(null);
        getSelectedItem$.next({ tag, listener });
        return listener.asObservable();
    }
    onItemClick() {
        return itemClick$.pipe(share());
    }
    onItemSelect() {
        return itemSelect$.pipe(share());
    }
    onItemHover() {
        return itemHover$.pipe(share());
    }
    onSubmenuToggle() {
        return submenuToggle$.pipe(share());
    }
}
NbMenuService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbMenuService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NbMenuService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbMenuService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbMenuService, decorators: [{
            type: Injectable
        }] });
export class NbMenuInternalService {
    constructor(location) {
        this.location = location;
    }
    prepareItems(items) {
        const defaultItem = new NbMenuItem();
        items.forEach((i) => {
            this.applyDefaults(i, defaultItem);
            this.setParent(i);
        });
    }
    selectFromUrl(items, tag, collapseOther = false) {
        const selectedItem = this.findItemByUrl(items);
        if (selectedItem) {
            this.selectItem(selectedItem, items, collapseOther, tag);
        }
    }
    selectItem(item, items, collapseOther = false, tag) {
        const unselectedItems = this.resetSelection(items);
        const collapsedItems = collapseOther ? this.collapseItems(items) : [];
        for (const parent of NbMenuItem.getParents(item)) {
            parent.selected = true;
            // emit event only for items that weren't selected before ('unselectedItems' contains items that were selected)
            if (!unselectedItems.includes(parent)) {
                this.itemSelect(parent, tag);
            }
            const wasNotExpanded = !parent.expanded;
            parent.expanded = true;
            const i = collapsedItems.indexOf(parent);
            // emit event only for items that weren't expanded before.
            // 'collapsedItems' contains items that were expanded, so no need to emit event.
            // in case 'collapseOther' is false, 'collapsedItems' will be empty,
            // so also check if item isn't expanded already ('wasNotExpanded').
            if (i === -1 && wasNotExpanded) {
                this.submenuToggle(parent, tag);
            }
            else {
                collapsedItems.splice(i, 1);
            }
        }
        item.selected = true;
        // emit event only for items that weren't selected before ('unselectedItems' contains items that were selected)
        if (!unselectedItems.includes(item)) {
            this.itemSelect(item, tag);
        }
        // remaining items which wasn't expanded back after expanding all currently selected items
        for (const collapsedItem of collapsedItems) {
            this.submenuToggle(collapsedItem, tag);
        }
    }
    collapseAll(items, tag, except) {
        const collapsedItems = this.collapseItems(items, except);
        for (const item of collapsedItems) {
            this.submenuToggle(item, tag);
        }
    }
    onAddItem() {
        return addItems$.pipe(share());
    }
    onNavigateHome() {
        return navigateHome$.pipe(share());
    }
    onCollapseAll() {
        return collapseAll$.pipe(share());
    }
    onGetSelectedItem() {
        return getSelectedItem$.pipe(share());
    }
    itemHover(item, tag) {
        itemHover$.next({ tag, item });
    }
    submenuToggle(item, tag) {
        submenuToggle$.next({ tag, item });
    }
    itemSelect(item, tag) {
        itemSelect$.next({ tag, item });
    }
    itemClick(item, tag) {
        itemClick$.next({ tag, item });
    }
    /**
     * Unselect all given items deeply.
     * @param items array of items to unselect.
     * @returns items which selected value was changed.
     */
    resetSelection(items) {
        const unselectedItems = [];
        for (const item of items) {
            if (item.selected) {
                unselectedItems.push(item);
            }
            item.selected = false;
            if (item.children) {
                unselectedItems.push(...this.resetSelection(item.children));
            }
        }
        return unselectedItems;
    }
    /**
     * Collapse all given items deeply.
     * @param items array of items to collapse.
     * @param except menu item which shouldn't be collapsed, also disables collapsing for parents of this item.
     * @returns items which expanded value was changed.
     */
    collapseItems(items, except) {
        const collapsedItems = [];
        for (const item of items) {
            if (except && (item === except || NbMenuItem.isParent(item, except))) {
                continue;
            }
            if (item.expanded) {
                collapsedItems.push(item);
            }
            item.expanded = false;
            if (item.children) {
                collapsedItems.push(...this.collapseItems(item.children));
            }
        }
        return collapsedItems;
    }
    applyDefaults(item, defaultItem) {
        const menuItem = { ...item };
        Object.assign(item, defaultItem, menuItem);
        item.children &&
            item.children.forEach((child) => {
                this.applyDefaults(child, defaultItem);
            });
    }
    setParent(item) {
        item.children &&
            item.children.forEach((child) => {
                child.parent = item;
                this.setParent(child);
            });
    }
    /**
     * Find deepest item which link matches current URL path.
     * @param items array of items to search in.
     * @returns found item of undefined.
     */
    findItemByUrl(items) {
        let selectedItem;
        items.some((item) => {
            if (item.children) {
                selectedItem = this.findItemByUrl(item.children);
            }
            if (!selectedItem && this.isSelectedInUrl(item)) {
                selectedItem = item;
            }
            return selectedItem;
        });
        return selectedItem;
    }
    isSelectedInUrl(item) {
        const exact = item.pathMatch === 'full';
        const link = item.link;
        const isSelectedInPath = exact
            ? isUrlPathEqual(this.location.path(), link)
            : isUrlPathContain(this.location.path(), link);
        if (isSelectedInPath && item.fragment != null) {
            return exact
                ? isFragmentEqual(this.location.path(true), item.fragment)
                : isFragmentContain(this.location.path(true), item.fragment);
        }
        return isSelectedInPath;
    }
}
NbMenuInternalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbMenuInternalService, deps: [{ token: i1.Location }], target: i0.ɵɵFactoryTarget.Injectable });
NbMenuInternalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbMenuInternalService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbMenuInternalService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Location }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL21lbnUvbWVudS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBYyxlQUFlLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7O0FBUzlHLE1BQU0sVUFBVSxHQUFHLElBQUksT0FBTyxFQUFhLENBQUM7QUFDNUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxhQUFhLENBQXVDLENBQUMsQ0FBQyxDQUFDO0FBQzdFLE1BQU0sYUFBYSxHQUFHLElBQUksYUFBYSxDQUFrQixDQUFDLENBQUMsQ0FBQztBQUM1RCxNQUFNLGdCQUFnQixHQUFHLElBQUksYUFBYSxDQUF3RCxDQUFDLENBQUMsQ0FBQztBQUNyRyxNQUFNLFdBQVcsR0FBRyxJQUFJLGFBQWEsQ0FBWSxDQUFDLENBQUMsQ0FBQztBQUNwRCxNQUFNLFVBQVUsR0FBRyxJQUFJLGFBQWEsQ0FBWSxDQUFDLENBQUMsQ0FBQztBQUNuRCxNQUFNLGNBQWMsR0FBRyxJQUFJLGFBQWEsQ0FBWSxDQUFDLENBQUMsQ0FBQztBQUN2RCxNQUFNLFlBQVksR0FBRyxJQUFJLGFBQWEsQ0FBa0IsQ0FBQyxDQUFDLENBQUM7QUFJM0QsMkNBQTJDO0FBQzNDOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLE9BQU8sVUFBVTtJQUF2QjtRQThDRTs7O1dBR0c7UUFDSCxjQUFTLEdBQXVCLE1BQU0sQ0FBQztJQWdEekMsQ0FBQztJQWxCQzs7T0FFRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBZ0I7UUFDaEMsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRW5CLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDekIsT0FBTyxNQUFNLEVBQUU7WUFDYixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBZ0IsRUFBRSxhQUF5QjtRQUN6RCxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ25ILENBQUM7Q0FDRjtBQUVELGtEQUFrRDtBQUNsRCw2QkFBNkI7QUFDN0I7Ozs7Ozs7R0FPRztBQUVILE1BQU0sT0FBTyxhQUFhO0lBQ3hCOzs7O09BSUc7SUFDSCxRQUFRLENBQUMsS0FBbUIsRUFBRSxHQUFZO1FBQ3hDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVyxDQUFDLEdBQVk7UUFDdEIsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILFlBQVksQ0FBQyxHQUFZO1FBQ3ZCLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsZUFBZSxDQUFDLEdBQVk7UUFDMUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxlQUFlLENBQVksSUFBSSxDQUFDLENBQUM7UUFFdEQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFFekMsT0FBTyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxXQUFXO1FBQ1QsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELGVBQWU7UUFDYixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDOzswR0FyRFUsYUFBYTs4R0FBYixhQUFhOzJGQUFiLGFBQWE7a0JBRHpCLFVBQVU7O0FBMERYLE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFHLENBQUM7SUFFMUMsWUFBWSxDQUFDLEtBQW1CO1FBQzlCLE1BQU0sV0FBVyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDckMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQW1CLEVBQUUsR0FBVyxFQUFFLGdCQUF5QixLQUFLO1FBQzVFLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MsSUFBSSxZQUFZLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMxRDtJQUNILENBQUM7SUFFRCxVQUFVLENBQUMsSUFBZ0IsRUFBRSxLQUFtQixFQUFFLGdCQUF5QixLQUFLLEVBQUUsR0FBVztRQUMzRixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELE1BQU0sY0FBYyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRXRFLEtBQUssTUFBTSxNQUFNLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoRCxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN2QiwrR0FBK0c7WUFDL0csSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQzlCO1lBRUQsTUFBTSxjQUFjLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekMsMERBQTBEO1lBQzFELGdGQUFnRjtZQUNoRixvRUFBb0U7WUFDcEUsbUVBQW1FO1lBQ25FLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLGNBQWMsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDakM7aUJBQU07Z0JBQ0wsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDN0I7U0FDRjtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLCtHQUErRztRQUMvRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztTQUM1QjtRQUVELDBGQUEwRjtRQUMxRixLQUFLLE1BQU0sYUFBYSxJQUFJLGNBQWMsRUFBRTtZQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN4QztJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsS0FBbUIsRUFBRSxHQUFXLEVBQUUsTUFBbUI7UUFDL0QsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFekQsS0FBSyxNQUFNLElBQUksSUFBSSxjQUFjLEVBQUU7WUFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELGFBQWE7UUFDWCxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsU0FBUyxDQUFDLElBQWdCLEVBQUUsR0FBWTtRQUN0QyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELGFBQWEsQ0FBQyxJQUFnQixFQUFFLEdBQVk7UUFDMUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBZ0IsRUFBRSxHQUFZO1FBQ3ZDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsU0FBUyxDQUFDLElBQWdCLEVBQUUsR0FBWTtRQUN0QyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxjQUFjLENBQUMsS0FBbUI7UUFDeEMsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBRTNCLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM1QjtZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBRXRCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDN0Q7U0FDRjtRQUVELE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLGFBQWEsQ0FBQyxLQUFtQixFQUFFLE1BQW1CO1FBQzVELE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUUxQixLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtZQUN4QixJQUFJLE1BQU0sSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRTtnQkFDcEUsU0FBUzthQUNWO1lBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFFdEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUMzRDtTQUNGO1FBRUQsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUVPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsV0FBVztRQUNyQyxNQUFNLFFBQVEsR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRO1lBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sU0FBUyxDQUFDLElBQWdCO1FBQ2hDLElBQUksQ0FBQyxRQUFRO1lBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDOUIsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGFBQWEsQ0FBQyxLQUFtQjtRQUN2QyxJQUFJLFlBQVksQ0FBQztRQUVqQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEQ7WUFDRCxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQy9DLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDckI7WUFFRCxPQUFPLFlBQVksQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxlQUFlLENBQUMsSUFBZ0I7UUFDdEMsTUFBTSxLQUFLLEdBQVksSUFBSSxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUM7UUFDakQsTUFBTSxJQUFJLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUUvQixNQUFNLGdCQUFnQixHQUFHLEtBQUs7WUFDNUIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQztZQUM1QyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVqRCxJQUFJLGdCQUFnQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQzdDLE9BQU8sS0FBSztnQkFDVixDQUFDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQzFELENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEU7UUFFRCxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7O2tIQXRNVSxxQkFBcUI7c0hBQXJCLHFCQUFxQjsyRkFBckIscUJBQXFCO2tCQURqQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQYXJhbXMsIFF1ZXJ5UGFyYW1zSGFuZGxpbmcgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBSZXBsYXlTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzaGFyZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGlzRnJhZ21lbnRDb250YWluLCBpc0ZyYWdtZW50RXF1YWwsIGlzVXJsUGF0aENvbnRhaW4sIGlzVXJsUGF0aEVxdWFsIH0gZnJvbSAnLi91cmwtbWF0Y2hpbmctaGVscGVycyc7XG5pbXBvcnQgeyBOYkljb25Db25maWcgfSBmcm9tICcuLi9pY29uL2ljb24uY29tcG9uZW50JztcbmltcG9ydCB7IE5iQmFkZ2UgfSBmcm9tICcuLi9iYWRnZS9iYWRnZS5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5iTWVudUJhZyB7XG4gIHRhZzogc3RyaW5nO1xuICBpdGVtOiBOYk1lbnVJdGVtO1xufVxuXG5jb25zdCBpdGVtQ2xpY2skID0gbmV3IFN1YmplY3Q8TmJNZW51QmFnPigpO1xuY29uc3QgYWRkSXRlbXMkID0gbmV3IFJlcGxheVN1YmplY3Q8eyB0YWc6IHN0cmluZzsgaXRlbXM6IE5iTWVudUl0ZW1bXSB9PigxKTtcbmNvbnN0IG5hdmlnYXRlSG9tZSQgPSBuZXcgUmVwbGF5U3ViamVjdDx7IHRhZzogc3RyaW5nIH0+KDEpO1xuY29uc3QgZ2V0U2VsZWN0ZWRJdGVtJCA9IG5ldyBSZXBsYXlTdWJqZWN0PHsgdGFnOiBzdHJpbmc7IGxpc3RlbmVyOiBCZWhhdmlvclN1YmplY3Q8TmJNZW51QmFnPiB9PigxKTtcbmNvbnN0IGl0ZW1TZWxlY3QkID0gbmV3IFJlcGxheVN1YmplY3Q8TmJNZW51QmFnPigxKTtcbmNvbnN0IGl0ZW1Ib3ZlciQgPSBuZXcgUmVwbGF5U3ViamVjdDxOYk1lbnVCYWc+KDEpO1xuY29uc3Qgc3VibWVudVRvZ2dsZSQgPSBuZXcgUmVwbGF5U3ViamVjdDxOYk1lbnVCYWc+KDEpO1xuY29uc3QgY29sbGFwc2VBbGwkID0gbmV3IFJlcGxheVN1YmplY3Q8eyB0YWc6IHN0cmluZyB9PigxKTtcblxuZXhwb3J0IHR5cGUgTmJNZW51QmFkZ2VDb25maWcgPSBPbWl0PE5iQmFkZ2UsICdwb3NpdGlvbic+O1xuXG4vLyBUT0RPOiBjaGVjayBpZiB3ZSBuZWVkIGJvdGggVVJMIGFuZCBMSU5LXG4vKipcbiAqXG4gKlxuICogTWVudSBJdGVtIG9wdGlvbnMgZXhhbXBsZVxuICogQHN0YWNrZWQtZXhhbXBsZShNZW51IExpbmsgUGFyYW1ldGVycywgbWVudS9tZW51LWxpbmstcGFyYW1zLmNvbXBvbmVudClcbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgTmJNZW51SXRlbSB7XG4gIC8qKlxuICAgKiBJdGVtIFRpdGxlXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICB0aXRsZTogc3RyaW5nO1xuICAvKipcbiAgICogSXRlbSByZWxhdGl2ZSBsaW5rIChmb3Igcm91dGVyTGluaylcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIGxpbms/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBJdGVtIFVSTCAoYWJzb2x1dGUpXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICB1cmw/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBJY29uIGNsYXNzIG5hbWUgb3IgaWNvbiBjb25maWcgb2JqZWN0XG4gICAqIEB0eXBlIHtzdHJpbmcgfCBOYkljb25Db25maWd9XG4gICAqL1xuICBpY29uPzogc3RyaW5nIHwgTmJJY29uQ29uZmlnO1xuICAvKipcbiAgICogRXhwYW5kZWQgYnkgZGVmYXVsdFxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIGV4cGFuZGVkPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEJhZGdlIGNvbXBvbmVudFxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIGJhZGdlPzogTmJNZW51QmFkZ2VDb25maWc7XG4gIC8qKlxuICAgKiBDaGlsZHJlbiBpdGVtc1xuICAgKiBAdHlwZSB7TGlzdDxOYk1lbnVJdGVtPn1cbiAgICovXG4gIGNoaWxkcmVuPzogTmJNZW51SXRlbVtdO1xuICAvKipcbiAgICogSFRNTCBMaW5rIHRhcmdldFxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGFyZ2V0Pzogc3RyaW5nO1xuICAvKipcbiAgICogSGlkZGVuIEl0ZW1cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBoaWRkZW4/OiBib29sZWFuO1xuICAvKipcbiAgICogSXRlbSBpcyBzZWxlY3RlZCB3aGVuIHBhcnRseSBvciBmdWxseSBlcXVhbCB0byB0aGUgY3VycmVudCB1cmxcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHBhdGhNYXRjaD86ICdmdWxsJyB8ICdwcmVmaXgnID0gJ2Z1bGwnO1xuICAvKipcbiAgICogV2hlcmUgdGhpcyBpcyBhIGhvbWUgaXRlbVxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIGhvbWU/OiBib29sZWFuO1xuICAvKipcbiAgICogV2hldGhlciB0aGUgaXRlbSBpcyBqdXN0IGEgZ3JvdXAgKG5vbi1jbGlja2FibGUpXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgZ3JvdXA/OiBib29sZWFuO1xuICAvKiogV2hldGhlciB0aGUgaXRlbSBza2lwTG9jYXRpb25DaGFuZ2UgaXMgdHJ1ZSBvciBmYWxzZVxuICAgKkB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgc2tpcExvY2F0aW9uQ2hhbmdlPzogYm9vbGVhbjtcbiAgLyoqIE1hcCBvZiBxdWVyeSBwYXJhbWV0ZXJzXG4gICAqQHR5cGUge1BhcmFtc31cbiAgICovXG4gIHF1ZXJ5UGFyYW1zPzogUGFyYW1zO1xuICBxdWVyeVBhcmFtc0hhbmRsaW5nPzogUXVlcnlQYXJhbXNIYW5kbGluZztcbiAgcGFyZW50PzogTmJNZW51SXRlbTtcbiAgc2VsZWN0ZWQ/OiBib29sZWFuO1xuICBkYXRhPzogYW55O1xuICBmcmFnbWVudD86IHN0cmluZztcbiAgcHJlc2VydmVGcmFnbWVudD86IGJvb2xlYW47XG4gIC8qKiBUaGUgbmFtZSBvZiBhIHJvbGUgaW4gdGhlIEFSSUEgc3BlY2lmaWNhdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgYXJpYVJvbGU/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIGl0ZW0gcGFyZW50cyBpbiB0b3AtZG93biBvcmRlclxuICAgKi9cbiAgc3RhdGljIGdldFBhcmVudHMoaXRlbTogTmJNZW51SXRlbSk6IE5iTWVudUl0ZW1bXSB7XG4gICAgY29uc3QgcGFyZW50cyA9IFtdO1xuXG4gICAgbGV0IHBhcmVudCA9IGl0ZW0ucGFyZW50O1xuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudHMudW5zaGlmdChwYXJlbnQpO1xuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50cztcbiAgfVxuXG4gIHN0YXRpYyBpc1BhcmVudChpdGVtOiBOYk1lbnVJdGVtLCBwb3NzaWJsZUNoaWxkOiBOYk1lbnVJdGVtKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHBvc3NpYmxlQ2hpbGQucGFyZW50ID8gcG9zc2libGVDaGlsZC5wYXJlbnQgPT09IGl0ZW0gfHwgdGhpcy5pc1BhcmVudChpdGVtLCBwb3NzaWJsZUNoaWxkLnBhcmVudCkgOiBmYWxzZTtcbiAgfVxufVxuXG4vLyBUT0RPOiBtYXAgc2VsZWN0IGV2ZW50cyB0byByb3V0ZXIgY2hhbmdlIGV2ZW50c1xuLy8gVE9ETzogcmV2aWV3IHRoZSBpbnRlcmZhY2Vcbi8qKlxuICpcbiAqXG4gKiBNZW51IFNlcnZpY2UuIEFsbG93cyB5b3UgdG8gbGlzdGVuIHRvIG1lbnUgZXZlbnRzLCBvciB0byBpbnRlcmFjdCB3aXRoIGEgbWVudS5cbiAqIEBzdGFja2VkLWV4YW1wbGUoTWVudSBTZXJ2aWNlLCBtZW51L21lbnUtc2VydmljZS5jb21wb25lbnQpXG4gKlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5iTWVudVNlcnZpY2Uge1xuICAvKipcbiAgICogQWRkIGl0ZW1zIHRvIHRoZSBlbmQgb2YgdGhlIG1lbnUgaXRlbXMgbGlzdFxuICAgKiBAcGFyYW0ge0xpc3Q8TmJNZW51SXRlbT59IGl0ZW1zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0YWdcbiAgICovXG4gIGFkZEl0ZW1zKGl0ZW1zOiBOYk1lbnVJdGVtW10sIHRhZz86IHN0cmluZykge1xuICAgIGFkZEl0ZW1zJC5uZXh0KHsgdGFnLCBpdGVtcyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsYXBzZXMgYWxsIG1lbnUgaXRlbXNcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRhZ1xuICAgKi9cbiAgY29sbGFwc2VBbGwodGFnPzogc3RyaW5nKSB7XG4gICAgY29sbGFwc2VBbGwkLm5leHQoeyB0YWcgfSk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGUgdG8gdGhlIGhvbWUgbWVudSBpdGVtXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0YWdcbiAgICovXG4gIG5hdmlnYXRlSG9tZSh0YWc/OiBzdHJpbmcpIHtcbiAgICBuYXZpZ2F0ZUhvbWUkLm5leHQoeyB0YWcgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbS4gV29uJ3Qgc3Vic2NyaWJlIHRvIHRoZSBmdXR1cmUgZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGFnXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPHt0YWc6IHN0cmluZzsgaXRlbTogTmJNZW51SXRlbX0+fVxuICAgKi9cbiAgZ2V0U2VsZWN0ZWRJdGVtKHRhZz86IHN0cmluZyk6IE9ic2VydmFibGU8TmJNZW51QmFnPiB7XG4gICAgY29uc3QgbGlzdGVuZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE5iTWVudUJhZz4obnVsbCk7XG5cbiAgICBnZXRTZWxlY3RlZEl0ZW0kLm5leHQoeyB0YWcsIGxpc3RlbmVyIH0pO1xuXG4gICAgcmV0dXJuIGxpc3RlbmVyLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgb25JdGVtQ2xpY2soKTogT2JzZXJ2YWJsZTxOYk1lbnVCYWc+IHtcbiAgICByZXR1cm4gaXRlbUNsaWNrJC5waXBlKHNoYXJlKCkpO1xuICB9XG5cbiAgb25JdGVtU2VsZWN0KCk6IE9ic2VydmFibGU8TmJNZW51QmFnPiB7XG4gICAgcmV0dXJuIGl0ZW1TZWxlY3QkLnBpcGUoc2hhcmUoKSk7XG4gIH1cblxuICBvbkl0ZW1Ib3ZlcigpOiBPYnNlcnZhYmxlPE5iTWVudUJhZz4ge1xuICAgIHJldHVybiBpdGVtSG92ZXIkLnBpcGUoc2hhcmUoKSk7XG4gIH1cblxuICBvblN1Ym1lbnVUb2dnbGUoKTogT2JzZXJ2YWJsZTxOYk1lbnVCYWc+IHtcbiAgICByZXR1cm4gc3VibWVudVRvZ2dsZSQucGlwZShzaGFyZSgpKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmJNZW51SW50ZXJuYWxTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24pIHt9XG5cbiAgcHJlcGFyZUl0ZW1zKGl0ZW1zOiBOYk1lbnVJdGVtW10pIHtcbiAgICBjb25zdCBkZWZhdWx0SXRlbSA9IG5ldyBOYk1lbnVJdGVtKCk7XG4gICAgaXRlbXMuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgdGhpcy5hcHBseURlZmF1bHRzKGksIGRlZmF1bHRJdGVtKTtcbiAgICAgIHRoaXMuc2V0UGFyZW50KGkpO1xuICAgIH0pO1xuICB9XG5cbiAgc2VsZWN0RnJvbVVybChpdGVtczogTmJNZW51SXRlbVtdLCB0YWc6IHN0cmluZywgY29sbGFwc2VPdGhlcjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0gdGhpcy5maW5kSXRlbUJ5VXJsKGl0ZW1zKTtcbiAgICBpZiAoc2VsZWN0ZWRJdGVtKSB7XG4gICAgICB0aGlzLnNlbGVjdEl0ZW0oc2VsZWN0ZWRJdGVtLCBpdGVtcywgY29sbGFwc2VPdGhlciwgdGFnKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RJdGVtKGl0ZW06IE5iTWVudUl0ZW0sIGl0ZW1zOiBOYk1lbnVJdGVtW10sIGNvbGxhcHNlT3RoZXI6IGJvb2xlYW4gPSBmYWxzZSwgdGFnOiBzdHJpbmcpIHtcbiAgICBjb25zdCB1bnNlbGVjdGVkSXRlbXMgPSB0aGlzLnJlc2V0U2VsZWN0aW9uKGl0ZW1zKTtcbiAgICBjb25zdCBjb2xsYXBzZWRJdGVtcyA9IGNvbGxhcHNlT3RoZXIgPyB0aGlzLmNvbGxhcHNlSXRlbXMoaXRlbXMpIDogW107XG5cbiAgICBmb3IgKGNvbnN0IHBhcmVudCBvZiBOYk1lbnVJdGVtLmdldFBhcmVudHMoaXRlbSkpIHtcbiAgICAgIHBhcmVudC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAvLyBlbWl0IGV2ZW50IG9ubHkgZm9yIGl0ZW1zIHRoYXQgd2VyZW4ndCBzZWxlY3RlZCBiZWZvcmUgKCd1bnNlbGVjdGVkSXRlbXMnIGNvbnRhaW5zIGl0ZW1zIHRoYXQgd2VyZSBzZWxlY3RlZClcbiAgICAgIGlmICghdW5zZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKHBhcmVudCkpIHtcbiAgICAgICAgdGhpcy5pdGVtU2VsZWN0KHBhcmVudCwgdGFnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgd2FzTm90RXhwYW5kZWQgPSAhcGFyZW50LmV4cGFuZGVkO1xuICAgICAgcGFyZW50LmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgIGNvbnN0IGkgPSBjb2xsYXBzZWRJdGVtcy5pbmRleE9mKHBhcmVudCk7XG4gICAgICAvLyBlbWl0IGV2ZW50IG9ubHkgZm9yIGl0ZW1zIHRoYXQgd2VyZW4ndCBleHBhbmRlZCBiZWZvcmUuXG4gICAgICAvLyAnY29sbGFwc2VkSXRlbXMnIGNvbnRhaW5zIGl0ZW1zIHRoYXQgd2VyZSBleHBhbmRlZCwgc28gbm8gbmVlZCB0byBlbWl0IGV2ZW50LlxuICAgICAgLy8gaW4gY2FzZSAnY29sbGFwc2VPdGhlcicgaXMgZmFsc2UsICdjb2xsYXBzZWRJdGVtcycgd2lsbCBiZSBlbXB0eSxcbiAgICAgIC8vIHNvIGFsc28gY2hlY2sgaWYgaXRlbSBpc24ndCBleHBhbmRlZCBhbHJlYWR5ICgnd2FzTm90RXhwYW5kZWQnKS5cbiAgICAgIGlmIChpID09PSAtMSAmJiB3YXNOb3RFeHBhbmRlZCkge1xuICAgICAgICB0aGlzLnN1Ym1lbnVUb2dnbGUocGFyZW50LCB0YWcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sbGFwc2VkSXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgIC8vIGVtaXQgZXZlbnQgb25seSBmb3IgaXRlbXMgdGhhdCB3ZXJlbid0IHNlbGVjdGVkIGJlZm9yZSAoJ3Vuc2VsZWN0ZWRJdGVtcycgY29udGFpbnMgaXRlbXMgdGhhdCB3ZXJlIHNlbGVjdGVkKVxuICAgIGlmICghdW5zZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICB0aGlzLml0ZW1TZWxlY3QoaXRlbSwgdGFnKTtcbiAgICB9XG5cbiAgICAvLyByZW1haW5pbmcgaXRlbXMgd2hpY2ggd2Fzbid0IGV4cGFuZGVkIGJhY2sgYWZ0ZXIgZXhwYW5kaW5nIGFsbCBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbXNcbiAgICBmb3IgKGNvbnN0IGNvbGxhcHNlZEl0ZW0gb2YgY29sbGFwc2VkSXRlbXMpIHtcbiAgICAgIHRoaXMuc3VibWVudVRvZ2dsZShjb2xsYXBzZWRJdGVtLCB0YWcpO1xuICAgIH1cbiAgfVxuXG4gIGNvbGxhcHNlQWxsKGl0ZW1zOiBOYk1lbnVJdGVtW10sIHRhZzogc3RyaW5nLCBleGNlcHQ/OiBOYk1lbnVJdGVtKSB7XG4gICAgY29uc3QgY29sbGFwc2VkSXRlbXMgPSB0aGlzLmNvbGxhcHNlSXRlbXMoaXRlbXMsIGV4Y2VwdCk7XG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY29sbGFwc2VkSXRlbXMpIHtcbiAgICAgIHRoaXMuc3VibWVudVRvZ2dsZShpdGVtLCB0YWcpO1xuICAgIH1cbiAgfVxuXG4gIG9uQWRkSXRlbSgpOiBPYnNlcnZhYmxlPHsgdGFnOiBzdHJpbmc7IGl0ZW1zOiBOYk1lbnVJdGVtW10gfT4ge1xuICAgIHJldHVybiBhZGRJdGVtcyQucGlwZShzaGFyZSgpKTtcbiAgfVxuXG4gIG9uTmF2aWdhdGVIb21lKCk6IE9ic2VydmFibGU8eyB0YWc6IHN0cmluZyB9PiB7XG4gICAgcmV0dXJuIG5hdmlnYXRlSG9tZSQucGlwZShzaGFyZSgpKTtcbiAgfVxuXG4gIG9uQ29sbGFwc2VBbGwoKTogT2JzZXJ2YWJsZTx7IHRhZzogc3RyaW5nIH0+IHtcbiAgICByZXR1cm4gY29sbGFwc2VBbGwkLnBpcGUoc2hhcmUoKSk7XG4gIH1cblxuICBvbkdldFNlbGVjdGVkSXRlbSgpOiBPYnNlcnZhYmxlPHsgdGFnOiBzdHJpbmc7IGxpc3RlbmVyOiBCZWhhdmlvclN1YmplY3Q8TmJNZW51QmFnPiB9PiB7XG4gICAgcmV0dXJuIGdldFNlbGVjdGVkSXRlbSQucGlwZShzaGFyZSgpKTtcbiAgfVxuXG4gIGl0ZW1Ib3ZlcihpdGVtOiBOYk1lbnVJdGVtLCB0YWc/OiBzdHJpbmcpIHtcbiAgICBpdGVtSG92ZXIkLm5leHQoeyB0YWcsIGl0ZW0gfSk7XG4gIH1cblxuICBzdWJtZW51VG9nZ2xlKGl0ZW06IE5iTWVudUl0ZW0sIHRhZz86IHN0cmluZykge1xuICAgIHN1Ym1lbnVUb2dnbGUkLm5leHQoeyB0YWcsIGl0ZW0gfSk7XG4gIH1cblxuICBpdGVtU2VsZWN0KGl0ZW06IE5iTWVudUl0ZW0sIHRhZz86IHN0cmluZykge1xuICAgIGl0ZW1TZWxlY3QkLm5leHQoeyB0YWcsIGl0ZW0gfSk7XG4gIH1cblxuICBpdGVtQ2xpY2soaXRlbTogTmJNZW51SXRlbSwgdGFnPzogc3RyaW5nKSB7XG4gICAgaXRlbUNsaWNrJC5uZXh0KHsgdGFnLCBpdGVtIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuc2VsZWN0IGFsbCBnaXZlbiBpdGVtcyBkZWVwbHkuXG4gICAqIEBwYXJhbSBpdGVtcyBhcnJheSBvZiBpdGVtcyB0byB1bnNlbGVjdC5cbiAgICogQHJldHVybnMgaXRlbXMgd2hpY2ggc2VsZWN0ZWQgdmFsdWUgd2FzIGNoYW5nZWQuXG4gICAqL1xuICBwcml2YXRlIHJlc2V0U2VsZWN0aW9uKGl0ZW1zOiBOYk1lbnVJdGVtW10pOiBOYk1lbnVJdGVtW10ge1xuICAgIGNvbnN0IHVuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICBpZiAoaXRlbS5zZWxlY3RlZCkge1xuICAgICAgICB1bnNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgdW5zZWxlY3RlZEl0ZW1zLnB1c2goLi4udGhpcy5yZXNldFNlbGVjdGlvbihpdGVtLmNoaWxkcmVuKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuc2VsZWN0ZWRJdGVtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsYXBzZSBhbGwgZ2l2ZW4gaXRlbXMgZGVlcGx5LlxuICAgKiBAcGFyYW0gaXRlbXMgYXJyYXkgb2YgaXRlbXMgdG8gY29sbGFwc2UuXG4gICAqIEBwYXJhbSBleGNlcHQgbWVudSBpdGVtIHdoaWNoIHNob3VsZG4ndCBiZSBjb2xsYXBzZWQsIGFsc28gZGlzYWJsZXMgY29sbGFwc2luZyBmb3IgcGFyZW50cyBvZiB0aGlzIGl0ZW0uXG4gICAqIEByZXR1cm5zIGl0ZW1zIHdoaWNoIGV4cGFuZGVkIHZhbHVlIHdhcyBjaGFuZ2VkLlxuICAgKi9cbiAgcHJpdmF0ZSBjb2xsYXBzZUl0ZW1zKGl0ZW1zOiBOYk1lbnVJdGVtW10sIGV4Y2VwdD86IE5iTWVudUl0ZW0pOiBOYk1lbnVJdGVtW10ge1xuICAgIGNvbnN0IGNvbGxhcHNlZEl0ZW1zID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGlmIChleGNlcHQgJiYgKGl0ZW0gPT09IGV4Y2VwdCB8fCBOYk1lbnVJdGVtLmlzUGFyZW50KGl0ZW0sIGV4Y2VwdCkpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbS5leHBhbmRlZCkge1xuICAgICAgICBjb2xsYXBzZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgICAgaXRlbS5leHBhbmRlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICBjb2xsYXBzZWRJdGVtcy5wdXNoKC4uLnRoaXMuY29sbGFwc2VJdGVtcyhpdGVtLmNoaWxkcmVuKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEl0ZW1zO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseURlZmF1bHRzKGl0ZW0sIGRlZmF1bHRJdGVtKSB7XG4gICAgY29uc3QgbWVudUl0ZW0gPSB7IC4uLml0ZW0gfTtcbiAgICBPYmplY3QuYXNzaWduKGl0ZW0sIGRlZmF1bHRJdGVtLCBtZW51SXRlbSk7XG4gICAgaXRlbS5jaGlsZHJlbiAmJlxuICAgICAgaXRlbS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGx5RGVmYXVsdHMoY2hpbGQsIGRlZmF1bHRJdGVtKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRQYXJlbnQoaXRlbTogTmJNZW51SXRlbSkge1xuICAgIGl0ZW0uY2hpbGRyZW4gJiZcbiAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgY2hpbGQucGFyZW50ID0gaXRlbTtcbiAgICAgICAgdGhpcy5zZXRQYXJlbnQoY2hpbGQpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBkZWVwZXN0IGl0ZW0gd2hpY2ggbGluayBtYXRjaGVzIGN1cnJlbnQgVVJMIHBhdGguXG4gICAqIEBwYXJhbSBpdGVtcyBhcnJheSBvZiBpdGVtcyB0byBzZWFyY2ggaW4uXG4gICAqIEByZXR1cm5zIGZvdW5kIGl0ZW0gb2YgdW5kZWZpbmVkLlxuICAgKi9cbiAgcHJpdmF0ZSBmaW5kSXRlbUJ5VXJsKGl0ZW1zOiBOYk1lbnVJdGVtW10pOiBOYk1lbnVJdGVtIHwgdW5kZWZpbmVkIHtcbiAgICBsZXQgc2VsZWN0ZWRJdGVtO1xuXG4gICAgaXRlbXMuc29tZSgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgc2VsZWN0ZWRJdGVtID0gdGhpcy5maW5kSXRlbUJ5VXJsKGl0ZW0uY2hpbGRyZW4pO1xuICAgICAgfVxuICAgICAgaWYgKCFzZWxlY3RlZEl0ZW0gJiYgdGhpcy5pc1NlbGVjdGVkSW5VcmwoaXRlbSkpIHtcbiAgICAgICAgc2VsZWN0ZWRJdGVtID0gaXRlbTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGVjdGVkSXRlbTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzZWxlY3RlZEl0ZW07XG4gIH1cblxuICBwcml2YXRlIGlzU2VsZWN0ZWRJblVybChpdGVtOiBOYk1lbnVJdGVtKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZXhhY3Q6IGJvb2xlYW4gPSBpdGVtLnBhdGhNYXRjaCA9PT0gJ2Z1bGwnO1xuICAgIGNvbnN0IGxpbms6IHN0cmluZyA9IGl0ZW0ubGluaztcblxuICAgIGNvbnN0IGlzU2VsZWN0ZWRJblBhdGggPSBleGFjdFxuICAgICAgPyBpc1VybFBhdGhFcXVhbCh0aGlzLmxvY2F0aW9uLnBhdGgoKSwgbGluaylcbiAgICAgIDogaXNVcmxQYXRoQ29udGFpbih0aGlzLmxvY2F0aW9uLnBhdGgoKSwgbGluayk7XG5cbiAgICBpZiAoaXNTZWxlY3RlZEluUGF0aCAmJiBpdGVtLmZyYWdtZW50ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBleGFjdFxuICAgICAgICA/IGlzRnJhZ21lbnRFcXVhbCh0aGlzLmxvY2F0aW9uLnBhdGgodHJ1ZSksIGl0ZW0uZnJhZ21lbnQpXG4gICAgICAgIDogaXNGcmFnbWVudENvbnRhaW4odGhpcy5sb2NhdGlvbi5wYXRoKHRydWUpLCBpdGVtLmZyYWdtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNTZWxlY3RlZEluUGF0aDtcbiAgfVxufVxuIl19