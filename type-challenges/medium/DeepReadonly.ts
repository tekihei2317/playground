// オブジェクトかどうかの判定 => Record<string, unkown>を使えばよいらしい
function isObject() {
  type IsObject<T> = T extends Record<string, unknown> ? true : false

  type Result1 = IsObject<{}> // true
  type Result2 = IsObject<{ a: string; b: number }> // true
  type Result3 = IsObject<() => 100> // false
  type Result4 = IsObject<string> //false
}

function deepReadonly() {
  type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends Record<string, unknown> ? DeepReadonly<T[K]> : T[K]
  }

  type X = {
    x: {
      a: 1
      b: "hi"
    }
    y: "hey"
  }

  type Y = {
    x: () => 100
    y: "hey"
  }

  type Result = DeepReadonly<X>
  type Result2 = DeepReadonly<Y>
}
