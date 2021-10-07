# 課題40: 作ったページをレスポンシブ対応しよう

## 課題１

前の課題で作ったページをレスポンシブに対応する

- PC/SP(iPhone X)の2パターン
- ヘッダー部分/サイドカラム/執筆者画像の有無に対応する

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

![サンプル](https://user-images.githubusercontent.com/32977282/136333208-fe6e60cc-9c6f-42cf-bf60-f193e5e0bd82.png)
