type User = {
  username: string;
  password: string;
};

export const users: User[] = [
  {
    username: "root",
    password: "password",
  },
];

export function findUser(username: string, password: string) {
  return users.find((u) => u.username === username && u.password === password);
}
