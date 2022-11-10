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

const dataMap: Map<string, unknown> = new Map();

function useData<T>(cacheKey: string, fetch: () => Promise<T>): T {
  const cachedData = dataMap.get(cacheKey) as T | undefined;
  if (cachedData === undefined) {
    throw fetch().then((d) => dataMap.set(cacheKey, d));
  }

  return cachedData;
}

export const DataLoader1 = () => {
  const data = useData("DataLoader1", fetchData1);

  return <div>Data is {data}</div>;
};

export const DataLoader2 = () => {
  const data = useData("DataLoader2", fetchData1);

  return <div>Data is {data}</div>;
};

function App() {
  return (
    <div>
      <div>React App!</div>
      <Suspense fallback={<p>loading...</p>}>
        <DataLoader1 />
        <DataLoader2 />
      </Suspense>
    </div>
  );
}

export default App;
