import { useEffect, useState } from "react";
import { api } from "./api-client";

function App() {
  const [greeting, setGreeting] = useState("loading...");
  const [greeting2, setGreeting2] = useState("loading...");

  useEffect(() => {
    api.$get().then((res) => {
      setGreeting(res.hello);
    });
    api.hi.$get().then((res) => {
      setGreeting2(res.hello);
    });
  }, []);

  return (
    <div className="App">
      <p>{greeting}</p>
      <p>{greeting2}</p>
    </div>
  );
}

export default App;
