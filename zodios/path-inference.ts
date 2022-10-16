import { Narrow } from "./utility-types";
type Endpoint = {
  path: string;
};
type ApiDefinitions = Endpoint[];
type Paths<T extends ApiDefinitions> = T[number] extends { path: infer U }
  ? U
  : never;

function makeApi<Api extends ApiDefinitions>(api: Narrow<Api>) {
  return api as Api; // asは必要？
}

const apiDefinition1 = [{ path: "/users" }, { path: "/users/:id" }];
const apiDefinition2 = [
  { path: "/users" as const },
  { path: "/users/:id" as const },
];

const api0 = makeApi([{ path: "/users" }, { path: "/users/:id" }]);
const api1 = makeApi(apiDefinition1);
const api2 = makeApi(apiDefinition2);
const Type0 = typeof api0; // ???(string | number | ...みたいな型になっている)
const Type1 = typeof api1;
const Type2 = typeof api2;

// ------------------

function makeApp<Api extends ApiDefinitions>(api: Narrow<Api>) {
  return {
    get(path: Paths<Api>) {
      return path;
    },
  };
}

const app0 = makeApp(api0);
console.log(app0);
console.log(app0.get("/users")); // getの引数は/usersまたは/users/:id

const app1 = makeApp(api1);
console.log(app1.get("hoge")); // getの引数はstring

const app2 = makeApp(api2);
console.log(app2.get("/users/:id")); // getの引数は/usersまたは/users/:id

// ------------------

type ExampleApiDefinitions = [{ path: "/users" }, { path: "/users/:id" }];
type ExamplePaths = Paths<ExampleApiDefinitions>;
type NarrowedExampleApiDefinitions = Narrow<ExampleApiDefinitions>;

function make<T extends string | number>(input: T | null) {
  if (input === null) return "default";
  return input;
}

const num = 3;
const result1 = make(num); // 3

const str = "hello" + "world";
const reuslt2 = make(str); // string

// ジェネリック型→指定できる、指定しなかったらある型
// extendsをつけたジェネリック型→指定できる、指定しなかったらextendsの右辺の型

const nullableNum = true ? null : 3;
const result3 = make(nullableNum);
