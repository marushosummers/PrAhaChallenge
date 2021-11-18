# 課題60: 外部APIを活用してみよう

## 課題１（実装）

### TwitterのAPIを利用して以下の機能を満たすスクリプト

- TypeScriptで開発
- 特定の言葉をツイートしたユーザーを100名抽出する（言葉をスクリプトの引数として指定できるようにしておく）
  - スクリプト
  - `yarn users --word <QueryWord>`

- 特定のユーザーをフォローしているユーザーを100名抽出する（ユーザーidをスクリプトの引数として指定できるようにしておく）
  - スクリプト
  - `yarn followers --id <TwitterUserId>`

### 参考

- Twitter API トークンは`.env`ファイルに設定する
  - `APP_USER_TOKEN=XXXXXXXXX`

- 使用ライブラリ
  - `commander`: コマンドライン引数の受け取り
  - `dotenv`: 環境変数の設定
  - `ts-node`: TypeScriptのコンパイルと実行
  - `twitter-api-v2`: Twitter API のWrapper
### （任意課題）

[Glitch](https://glitch.com/)にデプロイする
