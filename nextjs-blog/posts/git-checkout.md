---
title: gitのcheckoutコマンドの3つの使い方
date: '2022-01-02'
---
# gitのcheckoutコマンドの3つの使い方

- `HEAD`を移動する
	- `git checkout <branch>`→`HEAD`を指定したブランチに移動する
		- `git checkout -b <branch>`も同様
	- `git checkout <commit>`→`HEAD`を指定したコミットに移動する
		- `detached HEAD`状態になる
- ステージしていないワーキングツリーの内容を削除する
	- `git checkout [--] <pathspec>`
	- コミットを省略した場合、インデックスの内容でワーキングツリーが上書きされます。つまり、addしていないワーキングツリーの内容が削除されます。
- 過去のファイルの状態を取り出す
	- `git checkout <tree-ish> [--] <pathspec>`
	- 指定したコミットの指定したファイルの状態で、インデックスとワーキングツリーの状態が上書きされます
	- これが、本来のチェックアウトの意味に最も近いような気がします。
