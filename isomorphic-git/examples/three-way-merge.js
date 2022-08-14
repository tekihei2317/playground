/**
 * やりたいこと
 *
 * - 3Wayマージの実装を見たいので、その前にisomorphic-gitで3Wayマージを実際にやってみる
 * - 手順
 *  - git init
 *  - git checkout practice
 *  - echo "Hello" >> test.txt
 *  - git commit -m 'commit1'
 *  - git checkout main
 *  - git merge --no-ff practice
 */

const fs = require("fs");
const path = require("path");
const git = require("isomorphic-git");

const dir = "tutorial";
const author = { name: "tekihei2317", email: "tekihei2317@gmail.com" };

async function initRepository() {
  await fs.promises.rm(path.join(dir, ".git"), {
    recursive: true,
    force: true,
  });
  await git.init({ fs, dir, defaultBranch: "main" });
  console.log("Initialized git repository.");
}

async function commit1() {
  await fs.promises.writeFile(path.join(dir, "README.md"), "# three-way-merge\n");
  await git.add({ fs, dir, filepath: "README.md" });
  // await git.commit({ fs, dir, message: "added README.md", author });
  // console.log("Created first commit.");
}

async function commit2() {
  // practiceブランチでコミットする
  await git.branch({ fs, dir, ref: "practice" });
  await git.checkout({ fs, dir, ref: "practice" });

  await fs.promises.writeFile(path.join(dir, "README.md"), "# three-way-merge\n\nマージのアルゴリズムが知りたい\n");
  await git.add({ fs, dir, filepath: "." });
  await git.commit({ fs, dir, message: "modify README.md", author });
  console.log("Created commit on practice.");
}

async function mergePracticeIntoMain() {
  // FIXME: マージがバグっている気がする(インデックスがコミットに反映されていない)
  await git.checkout({ fs, dir, ref: "main" });
  const mergeResult = await git.merge({ fs, dir, theirs: "practice", author, fastForward: true });
  console.log("Merge practice branch into main.");
  console.log(mergeResult);
}

async function main() {
  // リポジトリを初期化する
  await initRepository();
  await commit1();
  // await commit2();
  // await mergePracticeIntoMain();
}

main();
