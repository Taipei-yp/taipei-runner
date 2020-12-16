import * as React from "react";
import * as ReactDOM from "react-dom";
import AppRoot from "./ui-root";

interface IBuildInfo {
  buildDate: number;
  version: string;
  branchName: string;
  commitId: string;
  test: string;
}

function printBuildInfo(buildInfoString: string): void {
  try {
    const buildInfo = JSON.parse(buildInfoString) as IBuildInfo;
    console.info(`version: ${buildInfo.version}`);
    console.info(`build date: ${new Date(buildInfo.buildDate).toISOString()}`);
    console.info(`branch: "${buildInfo.branchName}"`);
    console.info(`commit: "${buildInfo.commitId}"`);
  } catch {}
}

printBuildInfo((process.env.BUILD_INFO as unknown) as string);
ReactDOM.render(<AppRoot />, document.getElementById("app"));
