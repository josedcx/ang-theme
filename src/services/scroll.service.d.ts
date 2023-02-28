import { Observable, Subject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Scroll position type
 */
export interface NbScrollPosition {
    /**
     * x - left
     * @type {number}
     */
    x: number;
    /**
     * y - top
     * @type {number}
     */
    y: number;
}

export declare class NbLayoutScrollService {
    private scrollPositionReq$;
    private manualScroll$;
    private scroll$;
    private scrollable$;
    /**
     * Returns scroll position
     *
     * @returns {Observable<NbScrollPosition>}
     */
    getPosition(): Observable<NbScrollPosition>;
    /**
     * Sets scroll position
     *
     * @param {number} x
     * @param {number} y
     */
    scrollTo(x?: number, y?: number): void;
    /**
     * Returns a stream of scroll events
     *
     * @returns {Observable<any>}
     */
    onScroll(): Observable<any>;
    /**
     * @private
     * @returns Observable<NbScrollPosition>.
     */
    onManualScroll(): Observable<NbScrollPosition>;
    /**
     * @private
     * @returns {Subject<any>}
     */
    onGetPosition(): Subject<any>;
    onScrollableChange(): Observable<boolean>;
    /**
     * @private
     * @param {any} event
     */
    fireScrollChange(event: any): void;
    scrollable(scrollable: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbLayoutScrollService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NbLayoutScrollService>;
}
