const { setTimeout } = require("node:timers/promises");

const defaultEquals = (a, b) => a === b;

class Stack extends Array {
  top() {
    return this.at(-1);
  }
}

// 実行中のeffect?を持つ配列
const contexts = new Stack();

function createSignal(value, equals = defaultEquals) {
  const observable = {
    value,
    subscribers: [],
  };

  const getter = () => {
    const context = contexts.top();
    if (context) {
      // signalを変更したときに自動で実行するように、サブスクライバに追加する
      observable.subscribers.push(context);
    }

    return observable.value;
  };

  const setter = (newValue) => {
    if (equals(observable.value, newValue)) {
      return;
    }

    observable.value = newValue;
    for (const subscriber of observable.subscribers) {
      subscriber();
    }
  };

  const subscribe = (subscriber) => observable.subscribers.push(subscriber);

  return [getter, setter, subscribe];
}

function createEffect(subscriber) {
  contexts.push(subscriber);
  subscriber();
  contexts.pop();
}

function createMemo(f, equals = defaultEquals) {
  // メモもシグナル
  const signal = {
    value: undefined,
    subscribers: [],
  };

  const getter = () => {
    const context = contexts.top();
    if (context) {
      signal.subscribers.push(context);
    }
    return signal.value;
  };

  const setter = (newValue) => {
    if (equals(signal.value, newValue)) {
      return;
    }

    signal.value = newValue;
    for (const subscriber of signal.subscribers) {
      subscriber();
    }
  };

  // memoが依存しているsigalが変更されたときに、実行する処理
  // →memoに新しい値を設定し、memoのsubscriberを実行する
  const context = () => {
    setter(f());
  };

  // 初期化処理
  contexts.push(context);
  setter(f());
  contexts.pop(context);

  return getter;
}

async function main() {
  const [count, setCount] = createSignal(0);
  const [message, setMessage] = createSignal("Hello");
  createEffect(() => console.log(`count = ${count()}`));
  createEffect(() => console.log(`message = ${message()}`));

  const count2 = createMemo(() => count() * 2);
  createEffect(() => console.log(`count2 = ${count2()}`));

  console.log("----------");

  for (let i = 0; i < 3; i++) {
    await setTimeout(1000).then(() => setCount(count() + 1));
  }
  setMessage("Hello, world!");
}

main();
