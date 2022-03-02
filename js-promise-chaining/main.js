const createPromise = () => {
  const promise = new Promise((resolve, reject) => {
    resolve("success");
  });

  return promise;
};

const createFailedPromise = () => {
  const promise = new Promise((resolve, reject) => {
    reject("fail");
  });

  return promise;
};

// createPromise()
//   .then((result) => console.log(result))
//   .then((result) => console.log(result));

// 前のthenまたはcatchで返した値が、次のthenで受け取れる
// thenはいくつでもチェーンできる(前のthenで値を返さなかった場合は、undefinedが受け取れる)
// catchで受け取るためには、前のthen/catchで失敗したプロミスを返す必要がある

createFailedPromise()
  .then((result) => {
    console.log("ここは通らない");
    console.log(1, result);
  })
  .catch((result) => {
    console.log(2, result); // 2 fail
  })
  .then((result) => {
    console.log(3, result); // 3 undefined
  })
  .then((result) => {
    console.log(4, result); // 4 undefined
    return Promise.reject("fail 2");
  })
  .catch((result) => {
    console.log(5, result); // 5 fail 2
  });
