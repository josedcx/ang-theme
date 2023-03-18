import { Schema } from "./schema";
/**
 * Setting up Ang for the specified project by registering required modules,
 * adding Ang themes and wrapping root component in the Ang Layout.
 * */
export default function (
  options: Schema
): import("@angular-devkit/schematics").Rule;
