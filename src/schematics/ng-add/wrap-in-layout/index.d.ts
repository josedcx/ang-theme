import { Rule } from "@angular-devkit/schematics";
import { Schema } from "../schema";
/**
 * Wraps `AppComponent` in `NbLayoutComponent`. It's required for correct
 * work of Ang components.
 * */
export declare function wrapRootComponentInLayout(options: Schema): Rule;
