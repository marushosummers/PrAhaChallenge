# 課題55: Gitの便利コマンドを覚える

## 課題１（質問）

### 特定のコミットとの差分を表示したい

- [git diff](https://git-scm.com/docs/git-diff)
```
git diff <コミット番号>
```

### 差分があるファイル名だけを一覧表示したい

- [git diff](https://git-scm.com/docs/git-diff)
```
git diff --name-only <コミット番号>
```

### ファイル全体の変更内容を追加するのではなく、部分的に選択しながらステージングしたい (patchモード)

- [git add](https://git-scm.com/docs/git-add)
```
git add -p <ファイルパス>
```

- 参考: [git add -p 使ってますか？](https://qiita.com/cotton_desu/items/bf08ac57d59b37dd5188)
### 一時的にここまで加えた変更内容を退避させたい

- [git stash](https://git-scm.com/docs/git-stash)
```
# 一時退避
git stash

# 退避した内容を反映
git stash apply

# 退避した内容を確認
git stash list
```

### 特定ファイルのコミット履歴を見たい

- [git log](https://git-scm.com/docs/git-log)
```
git log -p <ファイルパス>
```

### 作業中、自分のローカル環境で細かく作業をコミットしていたため、複数に分かれたコミットを1つのコミットにまとめてからプッシュしたい

- [git rebase -i](https://git-scm.com/docs/git-rebase)
```
git rebase -i <コミット番号>
```

- 参考: [git add -p 使ってますか？](https://qiita.com/takke/items/3400b55becfd72769214)

### 特定のブランチを元に新たなブランチを作成したい

- [git checkout -b](https://git-scm.com/docs/git-checkout)
```
git checkout -b <ブランチ名>
```

- [git switch -c](https://git-scm.com/docs/git-switch)
```
git switch -c <ブランチ名>
```

### リモートリポジトリをクローンする際に全てのコミット履歴が必要なく、最新コミットだけクローンしたい

- [shallow clone](https://git-scm.com/docs/git-clone)
```
git clone --depth 1 <url>
```
### 他ブランチからのマージ中にコンフリクトが発生したため、ひとまずマージを中断したい

- [git merge]](https://git-scm.com/docs/git-merge)
```
git merge --abort
```
