// [徹底解説！　return promiseとreturn await promiseの違い](https://zenn.dev/uhyo/articles/return-await-promise)
// [PromiseによるJavaScript非同期処理レシピ集](https://sbfl.net/blog/2019/11/04/promise-cookbook/)
async function testFunction1(arr) {
  return arr.map((num) => num * 2);
}

async function testFunction2(arr) {
  return arr.map(async (num) => num * 2);
}

async function testFunction3(arr) {
  return Promise.all(arr.map(async (num) => num * 2));
}

async function testFunction4(arr) {
  return await Promise.all(arr.map(async (num) => num * 2));
}

async function testFunction5(arr) {
  return arr.map(async (num) => {
    num * 2;
  });
}

const arr = [3, 1, 4, 1, 5];
// testFunction1(arr).then((result) => console.log(1, result));
// testFunction2(arr).then((result) => console.log(2, result));
// testFunction3(arr).then((result) => console.log(3, result));
// testFunction4(arr).then((result) => console.log(4, result));
// testFunction5(arr).then((result) => console.log(5, result));

testFunction1(arr)
  .then((result) => {
    console.log(1, result);
    return testFunction2(arr);
  })
  .then((result) => {
    console.log(2, result);
    return testFunction3(arr);
  });
