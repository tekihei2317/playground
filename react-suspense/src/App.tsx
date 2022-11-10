import { Suspense, useState } from "react";

function sleep(ms: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      // console.log("Promise resolved");
      resolve("success");
    }, ms)
  );
}

// プロミスをスローすることが、描画を停止することを表す
// スローしたプロミスが解決したときに、コンポーネントは再描画される
export const SometimesSuspend = () => {
  if (Math.random() < 0.5) {
    throw sleep(1000);
  }
  return <p>Hello, world!</p>;
};

async function fetchData1(): Promise<string> {
  await sleep(1000);
  return `Hello, ${(Math.random() * 1000).toFixed(0)}`;
}

const DataLoader = () => {
  const [data, setData] = useState<string>();
  const [loading, setLoading] = useState(false);

  // 初回でサスペンドするとステートの記憶領域が確保されないため、初回はサスペンドしない
  if (loading && data === undefined) {
    throw fetchData1().then(setData);
  }

  return (
    <div>
      <div>Data is {data}</div>
      {/* クリックするとサスペンドする */}
      <button onClick={() => setLoading(true)}>load</button>
    </div>
  );
};

function App() {
  return (
    <div>
      <div>React App!</div>
      <Suspense fallback={<p>loading...</p>}>
        <DataLoader />
      </Suspense>
    </div>
  );
}

export default App;
