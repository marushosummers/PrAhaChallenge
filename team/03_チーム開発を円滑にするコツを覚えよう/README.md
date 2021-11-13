# 課題52: チーム開発を円滑にするコツを覚えよう

## 課題1（質問）

### PRは小さく提出することが良い理由

#### レビュアーのメリット
- レビューコストが下がる
- PRでの変更の意図が明確になる
- PR上での議論対象が明確になる

#### レビュイーのメリット
- 「PRを小さくする」ことを意識すると、作業が細分化される
- 作業が細分化されることで、実装方法が明確になり、共有コストも下がる


### コードコメント

#### 書くべき内容

- そのコードが存在する理由・背景(why)を説明しているコメント

#### 書くべきで無い内容

- 何をしているのか (what) を説明するようなコメント


- 説明が必要なコードの場合、もっとシンプルなコードにすることが望ましい
- 例外として、正規表現やアルゴリズムが複雑な処理の場合は何をしているかのコメントが理解の手助けになることがある

参考: [Google's Engineering Practices Documentation Japanese Translation](https://shuuji3.xyz/eng-practices/review/)

>私たちがコードレビュー中に期待する基準として、次のルールを定めます。
>一般に、ある CL が作業対象のシステムのコード全体の健全性を具体的に向上させる状態に一度でも達したならば、たとえその CL が完璧なものでなくても、レビュアは承認を賛成しなければならない。
>これは、すべてのコードレビューガイドラインの中で最も重要な原則です。

### コミットコメント

#### 書くべき内容

- 「そのコミットによって具体的に何がなされたのか」についての短い要約
- 要約(コミットタイトル)では、変更の[種類(type)](https://gist.github.com/stephenparish/9941e89d80e2bc58a153#allowed-type)と[範囲(scope)](https://gist.github.com/stephenparish/9941e89d80e2bc58a153#allowed-scope)を含める
- 解決した問題の簡単な説明
- なぜそれが最適なアプローチであるかの説明
- そのアプローチに欠点への言及
- バグ番号やベンチマークの結果、設計ドキュメントへのリンクなどのバックグラウンドの情報

#### 書くべきで無い内容

- どこを変更したかが不明瞭なコメント
- なぜ変更を行ったか不明瞭なコメント

参考: [AngularJS Commit Message Conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)


### 課題2（実装）

- GitHubのPRやIssueにテンプレートを作成する
  - [PullRequest](https://github.com/marushosummers/PrAhaChallenge/blob/techniques-of-team-development/.github/PULL_REQUEST_TEMPLATE.md)
  - [Issue](https://github.com/marushosummers/PrAhaChallenge/blob/techniques-of-team-development/.github/ISSUE_TEMPLATE/bug_report.md)

### 課題3

#### チーム開発を円滑に行うコツ

- 定期的なペアプロ/モブプロを行い、知識の共有をする
- 朝会や短期間での定例で、方向性の同期を行う
- closeしたissueをカウントして、完了したタスクの可視化する
- Winning Sessionなど、成果を見せる場所を用意する
