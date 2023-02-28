import { ElementRef, OnChanges, OnInit, Renderer2 } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NbStatusService } from "../../services/status.service";
import { NbComponentOrCustomStatus } from "../component-status";
import { NbIconLibraries } from "./icon-libraries";
import * as i0 from "@angular/core";
export interface NbIconConfig {
  icon: string;
  pack?: string;
  status?: NbComponentOrCustomStatus;
  options?: {
    [name: string]: any;
  };
}

export declare class NbIconComponent
  implements NbIconConfig, OnChanges, OnInit
{
  protected sanitizer: DomSanitizer;
  protected iconLibrary: NbIconLibraries;
  protected el: ElementRef;
  protected renderer: Renderer2;
  protected statusService: NbStatusService;
  protected iconDef: any;
  protected prevClasses: any[];
  html: SafeHtml;
  get primary(): boolean;
  get info(): boolean;
  get success(): boolean;
  get warning(): boolean;
  get danger(): boolean;
  get basic(): boolean;
  get control(): boolean;
  get additionalClasses(): string[];
  /**
   * Icon name
   * @param {string} status
   */
  icon: string;
  /**
   * Icon pack name
   * @param {string} status
   */
  pack: string;
  /**
   * Additional icon settings
   * @param {[name: string]: any}
   */
  options: {
    [name: string]: any;
  };
  /**
   * Icon status (adds specific styles):
   * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`
   */
  status?: NbComponentOrCustomStatus;
  /**
   * Sets all icon configurable properties via config object.
   * If passed value is a string set icon name.
   * @docs-private
   */
  get config(): string | NbIconConfig;
  set config(value: string | NbIconConfig);
  protected _config: string | NbIconConfig;
  constructor(
    sanitizer: DomSanitizer,
    iconLibrary: NbIconLibraries,
    el: ElementRef,
    renderer: Renderer2,
    statusService: NbStatusService
  );
  ngOnInit(): void;
  ngOnChanges(): void;
  renderIcon(
    name: string,
    pack?: string,
    options?: {
      [name: string]: any;
    }
  ): import("./icon-libraries").NbIconDefinition;
  protected clearIcon(): void;
  protected assignClasses(classes: string[]): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<NbIconComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    NbIconComponent,
    "nb-icon",
    never,
    {
      icon: "icon";
      pack: "pack";
      options: "options";
      status: "status";
      config: "config";
    },
    {},
    never,
    never
  >;
}
