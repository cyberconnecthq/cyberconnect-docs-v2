const fs = require("fs");
const path = require("path");

const version = process.argv[2];
const dirName = `version-${version}`;

const dirPaths = ["/i18n/zh/docusaurus-plugin-content-docs", "/versioned_docs"];

const deleteDir = (dir) => {
  try {
    fs.rmSync(dir, { recursive: true });
    console.log("\x1b[33m%s\x1b[0m", `${dir} is deleted`);
  } catch (e) {
    console.error("\x1b[33m%s\x1b[0m", `Error while deleting ${dir}.`, e);
  }
};

const main = () => {
  dirPaths.forEach((dirPath) => {
    const dir = path.join(__dirname, dirPath, dirName);
    deleteDir(dir);
  });
};

main();
