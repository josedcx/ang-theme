import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
export class NbActiveDescendantKeyManager extends ActiveDescendantKeyManager {
}
export class NbActiveDescendantKeyManagerFactoryService {
    create(items) {
        return new NbActiveDescendantKeyManager(items);
    }
}
export var NbKeyManagerActiveItemMode;
(function (NbKeyManagerActiveItemMode) {
    NbKeyManagerActiveItemMode[NbKeyManagerActiveItemMode["RESET_ACTIVE"] = -1] = "RESET_ACTIVE";
    NbKeyManagerActiveItemMode[NbKeyManagerActiveItemMode["FIRST_ACTIVE"] = 0] = "FIRST_ACTIVE";
})(NbKeyManagerActiveItemMode || (NbKeyManagerActiveItemMode = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY2VuZGFudC1rZXktbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9jZGsvYTExeS9kZXNjZW5kYW50LWtleS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSwwQkFBMEIsRUFBaUIsTUFBTSxtQkFBbUIsQ0FBQztBQUk5RSxNQUFNLE9BQU8sNEJBQWdDLFNBQVEsMEJBQTZCO0NBQUc7QUFFckYsTUFBTSxPQUFPLDBDQUEwQztJQUNyRCxNQUFNLENBQUMsS0FBeUI7UUFDOUIsT0FBTyxJQUFJLDRCQUE0QixDQUFJLEtBQUssQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBTixJQUFZLDBCQUdYO0FBSEQsV0FBWSwwQkFBMEI7SUFDcEMsNEZBQWlCLENBQUE7SUFDakIsMkZBQWdCLENBQUE7QUFDbEIsQ0FBQyxFQUhXLDBCQUEwQixLQUExQiwwQkFBMEIsUUFHckMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlciwgSGlnaGxpZ2h0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgdHlwZSBOYkhpZ2hsaWdodGFibGVPcHRpb24gPSBIaWdobGlnaHRhYmxlO1xuZXhwb3J0IGNsYXNzIE5iQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8VD4gZXh0ZW5kcyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxUPiB7fVxuXG5leHBvcnQgY2xhc3MgTmJBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlckZhY3RvcnlTZXJ2aWNlPFQgZXh0ZW5kcyBOYkhpZ2hsaWdodGFibGVPcHRpb24+IHtcbiAgY3JlYXRlKGl0ZW1zOiBRdWVyeUxpc3Q8VD4gfCBUW10pOiBOYkFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPFQ+IHtcbiAgICByZXR1cm4gbmV3IE5iQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8VD4oaXRlbXMpO1xuICB9XG59XG5cbmV4cG9ydCBlbnVtIE5iS2V5TWFuYWdlckFjdGl2ZUl0ZW1Nb2RlIHtcbiAgUkVTRVRfQUNUSVZFID0gLTEsXG4gIEZJUlNUX0FDVElWRSA9IDAsXG59XG4iXX0=