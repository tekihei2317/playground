import { createSignal, onCleanup, createEffect, createMemo } from "solid-js";

const BasicComponent = (props) => {
  const value = () => {
    console.log("value called");
    return props.value || "default";
  };
  const value2 = createMemo(() => {
    console.log("value2 called");
    return props.value2 || "default2";
  });

  return (
    <div>
      <div>{value()}</div>
      <div>{value2()}</div>
    </div>
  );
};

function App() {
  const [value, setValue] = createSignal("");
  const [value2, setValue2] = createSignal("");

  return (
    <div>
      <BasicComponent value={value()} value2={value2()} />
      <input type="text" onInput={(e) => setValue(e.currentTarget.value)} />
      <input type="text" onInput={(e) => setValue2(e.currentTarget.value)} />
    </div>
  );
}

export default App;
