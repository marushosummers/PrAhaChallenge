# 課題50: lintを使おう

## 課題1（質問）
### チーム開発でlintを使うべき理由

- 初歩的なミスや使用していないコードに気がつける
- formatterと併用すると書き方が揃うため、コード可読性が上がる
- コードレビューの時間を短縮できる
- 綺麗で良いコードの書き方を学ぶことができる
- 結果的に良いコードで構成されたプロダクトになる

参考: [独学エンジニアほどlintを使うべきだ！ESLintとJavaScriptで解説するlintの必要性 - Qiita](https://qiita.com/dowanna6/items/98d4016e51b04617b26d)
### ESLintが定義するルール

### AirbnbのJavaScript Style
- [airbnb/javascript: JavaScript Style Guide](https://github.com/airbnb/javascript)
#### インストール参考

- [Setting up Eslint(airbnb configuration), Prettier and Husky pre-commit hooks in CRA - DEV Community](https://dev.to/ankitt8/setting-up-eslint-airbnb-configuration-prettier-and-husky-pre-commit-hooks-in-cra-5dbo)
- [愚直にESLintを導入した話 | メルカリエンジニアリング](https://engineering.mercari.com/blog/entry/2017-07-31-170125/)

### lintをした例
- [run eslint --fix · marushosummers/PrAhaChallenge@43b3e8f](https://github.com/marushosummers/PrAhaChallenge/commit/43b3e8f7202c5ac1b723673b41e7c6477f690d4c)

## 課題2（実装）

### lintエラーがある場合はcommitを禁止するようなpre-commit hook

### pre-commit hookの問題点
