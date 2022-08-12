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
const fsPromise = require("fs").promises;
const path = require("path");
const git = require("isomorphic-git");

const dir = "tutorial";
const author = { name: "tekihei2317", email: "tekihei2317@gmail.com" };

async function main() {
  // リポジトリを初期化する
  await fsPromise.rm(path.join(dir, ".git"), { recursive: true, force: true });
  await git.init({ fs, dir, defaultBranch: "main" });
  console.log("Initialized git repository.");

  // first commitを作成する
  await fsPromise.writeFile(path.join(dir, "README.md"), "# three-way-merge\n");
  await git.commit({ fs, dir, message: "added README.md", author });
  console.log("Created first commit.");

  // practiceブランチでコミットする
  await git.branch({ fs, dir, ref: "practice" });
  await git.checkout({ fs, dir, ref: "practice" });
  await fsPromise.writeFile(path.join(dir, "test.txt"), "Hello");
  await git.commit({ fs, dir, message: "added test.txt", author });
  console.log("Created commit on practice.");

  // mainブランチにpracticeブランチをマージする
  await git.checkout({ fs, dir, ref: "main" });
  // FIXME: fastForward: falseにするとエラーが発生した
  // await git.merge({ fs, dir, theirs: "practice", author, fastForward: false });
  await git.merge({ fs, dir, theirs: "practice", author, fastForward: true });
}

main();
