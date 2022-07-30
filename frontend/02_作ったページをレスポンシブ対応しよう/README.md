# 課題40: 作ったページをレスポンシブ対応しよう

## 課題１

前の課題で作ったページをレスポンシブに対応する

- PC/SP(iPhone X)の2パターン
- ヘッダー部分/サイドカラム/執筆者画像の有無に対応する
- 課題1で実装していた 
  - 例) Header
```js
import Navigator from "../molecules/nav"

export default function Header() {
  return (
    <nav className="px-6 py-4 bg-white shadow">
      <div className="container flex flex-col mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <div>
            <a href="#" className="text-xl font-bold text-gray-800 md:text-2xl">
              Brand
            </a>
          </div>
        </div>
      <Navigator />
      </div>
    </nav>
);
}
```


![サンプル](https://user-images.githubusercontent.com/32977282/136333208-fe6e60cc-9c6f-42cf-bf60-f193e5e0bd82.png)

### TailwindCSSでのレスポンスデザイン

[Responsive Design - Tailwind](https://tailwindcss.com/docs/responsive-design)

- `sm`, `md`, `lg`のBreakpoint prefixを使うことで、画面サイズによって当てるデザインを変更できる

	```js
	// 例) Navigatorはmd以下の画面サイズでは非表示にする
	export default function Navigator() {
	return (
		<div className="flex-col hidden md:flex md:flex-row md:-mx-4">

	...
	```


- mobile first
  - スマホでの表示をBreakpoint prefixなしで実装し、特定の画面サイズ以上の実装に`sm`, `md`, `lg`を付ける。


- breakpointの画面サイズはconfigで設定する
```tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  }
}
```

