# 課題43: Effect hookを理解する

## 課題1

### なぜcleanup処理が必要なのか？

アンマウントされたDOMに対してステートを更新すると、メモリリークの警告が表示される。

これは非同期にデータを取得した場合に、アンマウント後にステート更新が行われるときなどに発生しうる。

これを避けるために、Componentのアンマウント時に実行するcleanup関数を用意する必要がある。

`useEffect`では`return`でcleanup関数を返すことができる。

### useEffectの第2引数の挙動

- 何も指定しなかった場合
  - 毎回レンダリング時に、第一引数の関数が実行される
- 空の配列（[]）を指定した場合
  - 初回のレンダリング時のみ、第一引数が実行される
- 配列に変数を指定した場合
  - 変数が変更されたら実行される


### 課題2

回答: [codesand box](https://codesandbox.io/s/x9ntj?file=/src/App.js)

#### ポイント
- `useRef`を使用して、値変更時のレンダリングを回避する
- `flag`が`true`の場合のみ`renderCount`をインクリメントする

```js
  const renderCount = useRef(0);

  useEffect(() => {
    flag && renderCount.current++;
  });

```



### 課題3

回答: [codesand box](https://codesandbox.io/s/x9ntj?file=/src/fetch-component.js)

#### ポイント
- `useEffect`の第二引数に`[]`を指定することで、初回のみ実行される

```js
import { useEffect, useState } from "react";

export const FetchComponent = () => {
  const [data, setData] = useState({
    subscribers: 0,
    stars: 0
  });

  useEffect(() => {
    const fetchGithubStars = async () => {
      console.log("fetch github star");
      const response = await fetch(
        "https://api.github.com/repos/facebook/react"
      );
      const resData = await response.json();
      const stars = resData.stargazers_count;

      setData({ ...data, stars: stars });
    };
    fetchGithubStars();
  }, []);

  return (
    <div>
      <p>ここにReactのGitHubレポジトリに付いたスターの数を表示してみよう</p>
      <p>{data.stars} stars</p>
    </div>
  );
};
```


### 課題4

useEffectに関するクイズを作成してください

1. 以下のように、`useEffect`の引数に非同期関数を指定するとエラーになります。どのようにすれば解決できますか？

```js
useEffect(async () => {
  const response = await fetch(`https://api.exsample/`);
  console.log(response);
}, []);
```

2. 無限ループが発生した際に、`useRef`を使うと回避されるのはなぜですか。

3. `useEffect`の処理とDOMの更新は非同期に行われるため、処理が完了する前のDOMが表示される可能性があります。これを回避するにはどうすればよいか。


<details>
  <summary>回答例</summary>

1. 内部で非同期関数を定義し、実行する。直接引数にすると、Promise型の戻り値がcleanup関数として解釈されるため。
```js
useEffect(() => {
  async function fetchApi() {
    const response = await fetch(
      `https://api.exsample/`
    );
    console.log(response);
  }
  fetchApi();
}, []);
```

2. [`useRef`](https://ja.reactjs.org/docs/hooks-reference.html#useref)は`useRef.current`の値が変化しても変更を通知せず、再レンダリングしないため。
3. [useLayoutEffect](https://ja.reactjs.org/docs/hooks-reference.html#uselayouteffect)を用いる
