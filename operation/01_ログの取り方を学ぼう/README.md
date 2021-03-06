# 課題56: ログの取り方を学ぼう

## 課題１（質問）

### ログレベルとは？

ログの緊急度や用途によりログを分類したもの。

レベル分けをすることで、検索性を上げたり通知をしやすくできる。

プロジェクトやプロダクトごとにポリシー化することが望ましい。

レベルの分類方法は、標準化されたものは無いが一般的に以下のように分ける。

以下のログレベルはJavaのライブラリLog4jを踏襲している。

| レベル    | 概要   | 説明  | 出力先  | 運用時の対応例 |
|-----------|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|----------------------|------------------------|
| **FATAL** | 致命的なエラー | プログラムの異常終了を伴うようなもの。コンソール等に即時出力することを想定                                                                 | コンソール, ファイル | 即時対応が必要         |
| **ERROR** | エラー         | 予期しないその他の実行時エラー。コンソール等に即時出力することを想定                                                                       | コンソール, ファイル | 営業時間内のみ対応     |
| **WARN**  | 警告           | 廃要素となったAPIの使用、APIの不適切な使用、エラーに近い事象など。実行時に生じた異常とは言い切れないが正常とも異なる何らかの予期しない問題 | コンソール, ファイル | 次回リリースまでに対応 |
| **INFO**  | 情報           | 実行時の何らかの注目すべき事象（開始や終了など）。メッセージ内容は簡潔に止めるべき                                                         | コンソール, ファイル | 対応不要                |
| **DEBUG** | デバッグ情報   | システムの動作状況に関する詳細な情報                                                                                                       | ファイル             | 出力しない             |
| **TRACE** | トレース情報   | デバッグ情報よりも、更に詳細な情報                                                                                                         | ファイル             | 出力しない             |

#### 参考
- [ログ設計指針](https://qiita.com/nanasess/items/350e59b29cceb2f122b3)
- [Log4jログレベル](https://ja.wikipedia.org/wiki/Log4j#.E3.83.AD.E3.82.B0.E3.83.AC.E3.83.99.E3.83.AB)

---

### アプリケーションログ

#### 含めるべき情報

- 時間: 処理日時
- ユーザ情報: ユーザーIDなどのアクセス元情報
- イベントID: 一連のイベントを関連づけるために必要
- リクエスト情報: URL、Webページ名やスクリプトIDなどのアクセス対象
- 処理内容: 閲覧、変更や削除等のユーザーの操作内容
- 処理対象: リソースIDやカテゴリーID等の捜査対象
- 処理結果: 処理した結果どうなったか(成功または失敗、処理件数など)
- エラー情報: アプリケーションのクラッシュの情報
- メッセージ: Stacktraceなど


#### 含めないべき情報

- 個人情報: 氏名・住所・電話番号・メールアドレス・SNSのアカウント情報など
- パスワード
- OAuthなどの認証情報

必要であれば個人を特定できないようにマスキング処理を行ってから出力する

---
### ログ出力のタイミング

- 処理開始時: [INFO] 処理概要、実行クラス名、メソッド名
- 処理経過中: [INFO] 実行条件、処理対象オブジェクトのキーとなる値など
- 処理終了時: [INFO] 実行結果(OK/NG 等)、リダイレクト先
- イベント発生時: [WARN] 画面に表示したエラーメッセージ等
- 例外発生時:[ERROR] 例外クラス、例外メッセージ
- その他: [INFO] 必要に応じて

参考: [ログ出力の設計指針。書き方、フォーマットの例](https://applis.io/posts/how-to-design-log-output)

---
### パースしやすいログにするには

- ログレベル・発生日時などの重要な情報はパイプなどの明確な区切り文字を使って出力する
- フォーマット(出力項目の順番)は統一する
- ログメッセージはスペースで区切って出力する

```
2017-10-12 08:54:44 UTC | INFO | dd.collector | checks.collector(collector.py:530) | Finished run #1780. Collection time: 4.06s. Emit time: 0.01s
```

参考: [ログのパース - ベストプラクティス](https://docs.datadoghq.com/ja/logs/guide/log-parsing-best-practice/)

---
### ログの種類

- アクセスログ
  - クライアントからのリクエストログ
  - ロードバランサやnginxなどのWebサーバから出力される
- アプリケーションログ
  - サービスアプリケーションの処理ログ
  - どの機能がいつ使われているか、どのような処理が行われたか、どのような結果が返されたか、どのようなエラーが発生したかなどを記録する
  - アプリケーションサーバから出力される
- エラーログ
  - 発生したエラーを出力するログ
  - 障害発生時に利用される
- （フロントエンド）ユーザーログ
  - ユーザの操作・行動ログ
  - 特定のユーザIDに関連した一連のログを記録する
  - サービスの品質向上や問い合わせ対応のためなど、分析目的で利用される
  - フロントエンドで出力されるため、収集サーバに送信する必要がある
- データベースのクエリログ
  - データベースに対して実行したSQLクエリログ
  - データベースの負荷分析・不正アクセス検知などに利用される
  - データベースの設定で出力することができる

---

### ログローテーションとは

一定の容量や期間で過去のログを削除・圧縮・移動すること

- 目的: ログの肥大化防止・保存リソースの節約
- ログの種類、容量、解析するタイミングを考慮し、ローテーション間隔を決める
- 削除だけでなく、圧縮や低コストのストレージへの移動も考慮する

参考: [アプリケーションログの設計・管理について](https://webukatu.com/wordpress/blog/27645/)
