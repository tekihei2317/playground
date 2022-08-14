import { mergeFile } from "./utils/merge-file.js";
import { fileURLToPath } from "url";
import * as _fs from "fs";
import path from "path";

const fs = _fs.promises;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const branches = ["base", "main", "feature"];
  const samplesDir = path.join(__dirname, "samples");
  const sampleNames = await fs.readdir(path.join(__dirname, "samples"));

  for (const sampleName of sampleNames) {
    const sampleDir = path.join(samplesDir, sampleName);
    const contents = await Promise.all([
      fs.readFile(path.join(sampleDir, "base.txt"), "utf-8"),
      fs.readFile(path.join(sampleDir, "feature.txt"), "utf-8"),
      fs.readFile(path.join(sampleDir, "main.txt"), "utf-8"),
    ]);

    const mergeResult = mergeFile({ branches, contents });
    await fs.writeFile(
      path.join(sampleDir, "_result.txt"),
      mergeResult.mergedText
    );
  }
}

main();
