const path = require("path");
const childProcess = require("child_process");

function rootDir(extraPath = "") {
  return path.resolve(__dirname, "../", extraPath);
}

function srcDir(extraPath = "") {
  return rootDir(`./client${extraPath}`);
}

function distDir(extraPath = "") {
  return rootDir(`./dist${extraPath}`);
}

function getBuildInfo() {
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

function getAppVersion() {
  // eslint-disable-next-line global-require
  const pkg = require("../package.json");
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

module.exports = {
  rootDir,
  srcDir,
  distDir,
  getBuildInfo,
};
