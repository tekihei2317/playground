import { useEffect, useState } from "react";
import { apiClient } from "./utils/zodios";

// TODO: APIの定義からインポートする
type User = {
  id: number;
  name: string;
  email: string;
};

function App() {
  const [users, setUsers] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      const users = await apiClient.get("/users");
      // console.log(users);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>ユーザー一覧</div>
    </div>
  );
}

export default App;
