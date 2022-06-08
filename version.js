// Command: yarn update-version x.x.x

const fs = require("fs");
const path = require("path");
const os = require("os");
const child_process = require("child_process");

const version = process.argv[2];

const dirPaths = [
  `/i18n/zh/docusaurus-plugin-content-docs/version-${version}`,
  `/versioned_docs/version-${version}`,
  `/versioned_sidebars/version-${version}-sidebars.json`,
];

const getPreVersionNum = () => {
  try {
    const jsonString = fs.readFileSync("./package.json");
    const json = JSON.parse(jsonString);
    return json.version;
  } catch (e) {
    console.error(
      "\x1b[33m%s\x1b[0m",
      `Error while getting previous version.\n`,
      e
    );
  }
};

const deleteDir = (dir) => {
  try {
    fs.rmSync(dir, { recursive: true });
    console.log("\x1b[33m%s\x1b[0m", `${dir} is deleted\n`);
  } catch (e) {
    console.error("\x1b[33m%s\x1b[0m", `Error while deleting ${dir}.\n`, e);
  }
};

const updateVersion = () => {
  try {
    // Revert version in version.json first
    const preVersion = getPreVersionNum();
    const jsonString = JSON.stringify([preVersion]);
    fs.writeFileSync("./versions.json", jsonString);
    console.log("\x1b[33m%s\x1b[0m", `version is reverted to ${preVersion}\n`);

    // Update version using docusaurus
    const result = child_process
      .execFileSync(`${os.platform() === "win32" ? "yarn.cmd" : "yarn"}`, ["run", "docusaurus", "docs:version", version])
      .toString()
      .trim();
    console.log(result);
  } catch (e) {
    console.error("\x1b[33m%s\x1b[0m", `Error while update version.\n`, e);
  }
};

const main = () => {
  console.log("\x1b[33m%s\x1b[0m", `Start to delete files\n`);
  dirPaths.forEach((dirPath) => {
    const dir = path.join(__dirname, dirPath);
    deleteDir(dir);
  });

  console.log("\x1b[33m%s\x1b[0m", `Start to update version\n`);
  updateVersion();
};

main();
