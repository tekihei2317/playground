# diff3-merge

## モチベーション

gitで使われているdiff3マージについて、実際にコードを動かして理解したい。

## 方法

gitのJavaScript実装である[isomorphic-git](https://github.com/isomorphic-git/isomorphic-git)のコードを参考にする。

isomorphic-gitでファイルのマージは[mergeFile.js](https://github.com/isomorphic-git/isomorphic-git/blob/main/src/utils/mergeFile.js)に書かれており、diff3というライブラリを使用している。このmergeFile.jsをコピーして動かしてみて、diff3マージについて理解を深める。

## 実行

`samples/`配下のそれぞれの例についてマージが行われ、結果が`_result.txt`に保存される。

```bash
node index.js
```
