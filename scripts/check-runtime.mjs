import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

function fail(message) {
  console.error(`runtime: ${message}`);
  process.exit(1);
}

let nodeVersion;
let manifest;
try {
  nodeVersion = readFileSync(new URL("../.node-version", import.meta.url), "utf8").trim();
  manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
} catch {
  fail("could not read .node-version and package.json");
}

const runtime = manifest?.devEngines?.runtime;
const manager = manifest?.devEngines?.packageManager;
const exactVersion = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
if (!exactVersion.test(nodeVersion) || !exactVersion.test(manager?.version ?? "")) {
  fail("Node and npm pins must be exact stable versions");
}
if (runtime?.name !== "node" || runtime.version !== nodeVersion || runtime.onFail !== "error"
    || manifest?.engines?.node !== nodeVersion || manager?.name !== "npm" || manager.onFail !== "error") {
  fail(".node-version and the engine declarations must match and reject mismatches");
}
if (process.versions.node !== nodeVersion) {
  fail(`Node ${nodeVersion} is required (running ${process.versions.node}); select .node-version first`);
}

// Older npm releases ignore devEngines. Check the active executable before
// allowing make to install dependencies or run the project checks.
const probe = spawnSync("npm", ["--version"], {
  cwd: fileURLToPath(new URL("../", import.meta.url)),
  encoding: "utf8", timeout: 3000, killSignal: "SIGKILL", maxBuffer: 4096,
});
if (probe.error || probe.status !== 0 || !exactVersion.test(probe.stdout.trim())) {
  fail("could not read npm --version within three seconds; installation was not started");
}
if (probe.stdout.trim() !== manager.version) {
  fail(`npm ${manager.version} is required (running ${probe.stdout.trim()}); use the project's accepted npm version`);
}
