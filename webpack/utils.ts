import childProcess from "child_process";
import path from "path";
import pkg from "../package.json";

export const IS_DEV = process.env.NODE_ENV !== "production";

export function rootDir(extraPath = "") {
  return path.resolve(__dirname, "../", extraPath);
}

export function srcDir(extraPath = "") {
  return rootDir(`./client${extraPath}`);
}

export function distDir(extraPath = "") {
  return rootDir(`./dist${extraPath}`);
}

function getAppVersion() {
  return pkg.version;
}

function getBranchName() {
  return childProcess
    .execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .trim();
}

function getCommitId() {
  return childProcess.execSync("git rev-parse HEAD").toString().trim();
}

function getBuildDate() {
  return Date.now();
}

export function getBuildInfo() {
  const appVersion = getAppVersion();
  const branchName = getBranchName();
  const commitId = getCommitId();
  const buildDate = getBuildDate();
  return {
    buildDate,
    version: appVersion,
    branchName,
    commitId,
  };
}

export function clientJsFileName(isDev: boolean, pathDataChunkName?: string) {
  let name = "[name].js";
  if (!isDev && pathDataChunkName !== undefined) {
    if (pathDataChunkName === "sw") {
      name =
        pathDataChunkName === "sw" ? "sw.js" : "js/[name].[contenthash].js";
    }
  }
  return name;
}
