type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function getStatusCode(method: HttpMethod): number {
  const statusCodeMap: { [method in HttpMethod]: number } = {
    GET: 200,
    POST: 201,
    PUT: 204,
    DELETE: 204,
  };

  return statusCodeMap[method];
}

getStatusCode("GET");
// let method = "GET";
// getStatusCode(method); error: string型に拡大(Widening)されるため

const method2 = "GET";
getStatusCode(method2);

// 結果は同じ
const num1 = 1; // (global type, narrowed type) = (number, 1)
type Type1 = typeof num1; // 1
const num2 = 1 as const; // (global type, narrowed type) = (1, 1)
type Type2 = typeof num2; // 1

// 結果が違う(下位のスコープだと、型推論にglobal typeが使われるため)
const get1 = () => num1; // () => number
const get2 = () => num2; // () => 1
