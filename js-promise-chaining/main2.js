// やりたいこと
// - axiosでpostする
// - 成功するとき、バリデーションエラーが起こるとき、それ以外のエラーの3パターンがある
// - 成功したときは、次の処理を実行する
// - バリデーションエラーのときは、次の処理を実行しない(バリデーションエラーの情報を設定する)
// - それ以外のエラーのときは、例外を投げてフレームワークに処理してもらう

const sendPostRequest = (status) => {
  return new Promise((resolve, reject) => {
    if (status === 200) resolve(status);
    reject(status);
  });
};

const main = async () => {
  const statuses = [200, 422, 500];
  for (const _status of statuses) {
    const result = await sendPostRequest(_status)
      .then(() => {
        return { isSuccess: true };
      })
      .catch((status) => {
        if (status === 422) return { isSuccess: false };

        // ここでrejectしてフレームワークに処理してもらう
        // Promise.reject(status);
      });

    console.log(result);
  }
};

main();
