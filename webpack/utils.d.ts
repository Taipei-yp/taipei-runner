declare const IS_DEV: boolean;
declare function rootDir(extraPath: string): string;
declare function srcDir(extraPath: string): string;
declare function distDir(extraPath: string): string;
declare function getBuildInfo(): unknown;

export { IS_DEV, rootDir, srcDir, distDir, getBuildInfo };
