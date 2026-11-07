import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "portfolio-runtime-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const dir of ["scripts", "bin", "home"]) mkdirSync(join(root, dir));
  copyFileSync(new URL("./check-runtime.mjs", import.meta.url), join(root, "scripts/check-runtime.mjs"));
  copyFileSync(new URL("../Makefile", import.meta.url), join(root, "Makefile"));
  symlinkSync(process.execPath, join(root, "bin/node"));
  const manifest = {
    engines: { node: process.versions.node },
    devEngines: {
      runtime: { name: "node", version: process.versions.node, onFail: "error" },
      packageManager: { name: "npm", version: "1.2.3", onFail: "error" },
    },
  };
  const save = () => writeFileSync(join(root, "package.json"), JSON.stringify(manifest));
  save();
  writeFileSync(join(root, ".node-version"), `${process.versions.node}\n`);
  const npm = (body) => writeFileSync(join(root, "bin/npm"), `#!/usr/bin/env node\n${body}\n`, { mode: 0o755 });
  npm(`import { writeFileSync } from "node:fs";
if (JSON.stringify(process.argv.slice(2)) === '["--version"]') console.log("1.2.3");
else if (JSON.stringify(process.argv.slice(2)) === '["ci"]') writeFileSync("installed", "yes");
else process.exit(90);`);
  const run = (args = ["/usr/bin/make", "install"], cwd = root) => spawnSync(args[0], args.slice(1), {
    cwd, encoding: "utf8", timeout: 10000,
    env: { PATH: join(root, "bin"), HOME: join(root, "home"), TMPDIR: root },
  });
  const refused = (result, message) => {
    assert.equal(result.error, undefined);
    assert.notEqual(result.status, 0, result.stdout);
    assert.match(result.stderr, message);
    assert.equal(existsSync(join(root, "installed")), false);
  };
  return { root, manifest, save, npm, run, refused };
}

test("the install target accepts the exact pair; the guard resolves files from another directory", (t) => {
  const f = fixture(t);
  const result = f.run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(join(f.root, "installed"), "utf8"), "yes");
  const nested = f.run([process.execPath, join(f.root, "scripts/check-runtime.mjs")], join(f.root, "home"));
  assert.equal(nested.status, 0, nested.stderr);
});

test("mismatched versions refuse installation", async (t) => {
  await t.test("right Node, wrong npm", (t) => {
    const f = fixture(t);
    f.manifest.devEngines.packageManager.version = "1.2.4";
    f.save();
    f.refused(f.run(), /npm 1\.2\.4 is required/);
  });
  await t.test("wrong Node, right npm", (t) => {
    const f = fixture(t);
    const other = `${Number(process.versions.node.split(".")[0]) + 1}.0.0`;
    writeFileSync(join(f.root, ".node-version"), `${other}\n`);
    f.manifest.engines.node = other;
    f.manifest.devEngines.runtime.version = other;
    f.save();
    f.refused(f.run(), /Node .* is required/);
  });
});

test("invalid declarations and failed npm probes refuse installation", async (t) => {
  for (const [name, change, diagnostic] of [
    ["malformed manifest", (f) => writeFileSync(join(f.root, "package.json"), "{"), /could not read/],
    ["major-only pin", (f) => writeFileSync(join(f.root, ".node-version"), "24\n"), /exact stable versions/],
    ["root and manifest disagree", (f) => { f.manifest.engines.node = "0.0.0"; f.save(); }, /must match/],
    ["missing npm", (f) => rmSync(join(f.root, "bin/npm")), /could not read npm/],
    ["failed npm", (f) => f.npm('console.error("private diagnostic"); process.exit(7);'), /could not read npm/],
    ["hanging npm", (f) => f.npm("setInterval(() => {}, 1000);"), /could not read npm/],
  ]) {
    await t.test(name, (t) => {
      const f = fixture(t);
      change(f);
      const result = f.run();
      f.refused(result, diagnostic);
      assert.doesNotMatch(result.stderr, /private diagnostic/);
    });
  }
});
