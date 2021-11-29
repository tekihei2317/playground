// Readonly 2

function MyReadonly2() {
  type MyReadonly2<T, K extends keyof T> = {
    readonly [P in K]: T[P]
  } & T

  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type ReadonlyTodo = MyReadonly2<Todo, "title" | "description">

  const todo: ReadonlyTodo = { title: "aaa", description: "bbb", completed: false }
  // @ts-expect-error
  todo.title = "ccc"
}

function basicIntersection() {
  type type1 = {
    aaa: string
    bbb: string
  }

  type type2 = {
    bbb: string
    ccc: number
  }

  type type3 = type1 & type2
  // 両方の型の条件を満たす必要がある
  // @ts-expect-error
  const obj1: type3 = { aaa: "aaa" } // error
  // @ts-expect-error
  const obj2: type3 = { aaa: "aaa" } // error
  const obj3: type3 = { aaa: "aaa", bbb: "bbb", ccc: 100 }
}

/** 省略可能なプロパティの交差型 */
function optionIntersection() {
  // 片方が省略可能で、もう一方が省略可能でない場合
  type type1 = {
    aaa: string
    bbb: string
  }

  type type2 = {
    bbb?: string
    ccc: number
  }

  type type3 = type1 & type2
  type type4 = type2 & type1

  // どちらの順序でも省略するとエラーになる→厳しいほうの条件が適用される？
  // @ts-expect-error
  const obj4: type3 = { aaa: "aaa", ccc: 100 } // 省略するとエラーになる
  // @ts-expect-error
  const obj5: type4 = { aaa: "aaa", ccc: 100 } // 省略するとエラーになる

  const obj1: type3 = { aaa: "aaa", bbb: null, ccc: 100 } // nullを代入できる(これは省略可能だから?、それともstringにはnullを代入できる?)
  const obj2: type4 = { aaa: "aaa", bbb: null, ccc: 100 } // nullを代入できる
  const obj3: type3 = { aaa: "aaa", bbb: "bbb", ccc: 100 } // これはもちろんOK
}

/** readonlyの交差型 */
function readonlyIntersection() {
  // 片方がreadonlyで、もう一方がreadonlyでない場合
  type Type1 = { aaa: string } & { readonly aaa: string }
  type Type2 = { readonly aaa: string } & { aaa: string }

  const obj1: Type1 = { aaa: "aaa" }
  // @ts-expect-error
  obj1.aaa = "bbb" // error（読み取り専用プロパティであるため、'aaa' に代入することはできません。）

  const obj2: Type2 = { aaa: "aaa" }
  // @ts-expect-error
  obj2.aaa = "bbb" // error（読み取り専用プロパティであるため、'aaa' に代入することはできません。）
}
