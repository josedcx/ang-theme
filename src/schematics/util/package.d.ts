import { Tree } from "@angular-devkit/schematics";
export declare function getAngVersion(): string;
/**
 * Gets the version of the specified Ang peerDependency
 * */
export declare function getAngPeerDependencyVersionFromPackageJson(
  packageName: string
): string;
/**
 * Eva Icons version
 * */
export declare function getEvaIconsVersion(): string;
/**
 * Gets the version of the specified dependency by looking at the package.json in the specified tree
 * */
export declare function getDependencyVersionFromPackageJson(
  tree: Tree,
  packageName: string
): string;
export declare function addDependencyToPackageJson(
  tree: Tree,
  packageName: string,
  packageVersion: string,
  force?: boolean
): void;
/**
 * Gets the version of the specified dev dependency by looking at the package.json in the specified tree
 * */
export declare function getDevDependencyVersionFromPackageJson(
  tree: Tree,
  packageName: string
): string;
export declare function addDevDependencyToPackageJson(
  tree: Tree,
  packageName: string,
  packageVersion: string
): void;
