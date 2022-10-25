# yarn-workspaces

## パッケージのコマンドの実行

ワークスペースの中から、インストールしたパッケージのコマンド（`./node_modules/.bin/tsc`など）を実行したかった。

yarn workspacesだと、ワークスペースの中からコマンドが実行できる。これは、ワークスペースの中に`node_modules/.bin/tsc`などがあって、これがワークスペースのルートにあるコマンドへのシンボリックリンクになっているため。

npm workspacesはシンボリックリンクを作成してくれないが、npmスクリプトやnpxでコマンドを実行することはできる。

```bash
# yarn workspaces
tsc -v # ./node_modules/.binにパスを通していれば、そのまま実行できる

# npm workspaces
npx tsc -v
npm run tsc-version # scripts: { "tsc-version": "tsc -v" }
```

## パッケージのインストール

yarn workspacesでは、どのディレクトリで`yarn install`や`yarn add`を実行しても大丈夫っぽい。npm workspacesは、内部パッケージで`npm install`すると意図しない挙動になる（`node_modules`や`package-lock.json`が新しく作られる）。

## まとめ

yarn workspacesは内部のディレクトリから操作をすることも考えられているが、npm workspacesはワークスペースのルートから操作する前提になっている。

自分はパッケージのディレクトリに移動したい派なので、npm workspacesよりyarn workspacesのほうが使いやすいと思った。
