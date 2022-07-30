# 課題44: フロントエンドのレンダリングパターンを学ぶ

## 課題１

### CSR（クライアントサイドレンダリング）

- CSRは、ユーザがアクセスした後に非同期にデータを取得し、ページをレンダリングする。

- そのため、データ取得、ルーティングなどのロジックはクライアント上で動作するので、処理はクライアントのスペックに依存する。

- ページの内容は動的に変化するため、検索エンジンのクローラに取得されにくくSEOに弱い。

### SSR（サーバーサイドレンダリング）

- SSRは、ユーザがアクセスしたときにサーバー側でHTMLを構築し、ページをレンダリングする。

- そのため、処理はサーバ側に依存するためCSRのデメリットを解決できるが、その反面レスポンス速度が遅くなる。

- ページ内容は検索エンジンに取得されるためSEO対策は可能だが、レスポンス速度が遅いという点ではSEOの評価が下がる。

### SSG（静的サイトジェネレーション）
- SSGは、ビルド時にデータの取得も行い、HTMLを構築する。ユーザがアクセスしたときに、HTMLを返却しレンダリングする。

- また、CDNにキャッシュしておくことにより高速にページを表示することができる。

- SSRに比べ高速にレスポンスを返すことができるため、SEOに強い。

- 一方で、大規模なデータを有するページなどのビルドに時間がかかるものや高頻度で更新されるページには向かない。

### ISR（インタラクティブサーバーレンダリング）
- ISRは、最初にユーザがアクセスした際にはSSGで構築したHTMLを返却し、一定時間後にアクセスがあった際にはデータ取得を行ってレンダリングする。

- 一定期間ごとにデータ更新が行われるため、一括ビルドのコストが無くなる。

- 一方で、古い情報が表示される可能性があるため、最新の情報のみを表示するページには採用できない。

## 課題2

### SSR
```js
export default function SSR(props) {
  const stars = props.stars;

  return (
    <div>
      <p>SSR: {stars} stars</p>
    </div>
  );
	};

export async function getServerSideProps(context) {
      const response = await fetch(
      	"https://api.github.com/repos/facebook/react"
      );
      const resData = await response.json();
      const stars = resData.stargazers_count;
	return {
		props: { stars }
	}
}

```

### SSG
```js
export default function SSG(props) {
  const stars = props.stars;

  return (
    <div>
      <p>SSG: {stars} stars</p>
    </div>
  );
	};

export async function getStaticProps(context) {
      const response = await fetch(
      	"https://api.github.com/repos/facebook/react"
      );
      const resData = await response.json();
      const stars = resData.stargazers_count;
	return {
		props: { stars }
	}
}
```

### build時の違い

```
Page                              Size     First Load JS
┌ ○ /                             2.93 kB        68.6 kB
├   /_app                         0 B            65.7 kB
├ ○ /404                          1.36 kB        67.1 kB
├ ● /ssg                          308 B            66 kB
├ λ /ssr                          307 B            66 kB
└ ○ /todo                         1.64 kB        67.3 kB
+ First Load JS shared by all     65.7 kB
  ├ chunks/framework.923004.js    42 kB
  ├ chunks/main.c03421.js         20.2 kB
  ├ chunks/pages/_app.3a6f43.js   2.7 kB
  ├ chunks/webpack.672781.js      766 B
  └ css/7541d46b34e65c6581ad.css  308 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)
```

SSGは`.next/server/pages/ssg.html`が生成され、データも埋め込まれたHTMLとなる。

SSRはHTMLが生成されず、`λ /ssr`とあるようにアクセス時に生成されるAPIサーバとして構築される。


## 課題3

- SSR => 更新頻度が高く(日に1回以上)、コンテンツが多く、SEOを気にするページ向け
  - ユーザーのコメントが随時追加されるクックパッドのようなサービス

- SSG => 更新頻度は低く、コンテンツが大量ではなく、SEOを気にするページ向け
  - 週1回更新されるブログ

- CSR => 更新頻度が高く、SEOを気にしないページ向け
  - freeeのような会計サービス
  - 経営指標（OKRやKPIなど）を管理する社内サービス
  - 社内SNS
