# typescript-enum

enumを足し算しているコードが分からなかったので、試してみます。

コード: https://github.com/ecyrbe/sokoban/blob/master/src/hooks/sokoban.ts#L92

TypeScriptのenumのメンバーは、単なる数値へのエイリアスのようです。Enumの先頭のメンバーには0が割り当てられ、以降のメンバーは1ずつ足されます。

```ts
export enum Block {
  empty, // 0
  objective, // 1
  box, // 2
}
```

数値と直接比較してもエラーになりません。

```ts
console.log(Block.empty === 0); // true

const num1: number = 0;
const num2: number = 1;
console.log(Block.empty === num1); // true
console.log(Block.empty === num2); // false
```
