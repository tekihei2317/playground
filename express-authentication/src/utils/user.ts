export type User = {
  userName: string;
  password: string;
};

export const users: User[] = [
  {
    userName: "root",
    password: "password",
  },
];

export function findByCredentials(credentials: User) {
  return users.find(
    (u) =>
      u.userName === credentials.userName && u.password === credentials.password
  );
}
