// jest.spyOnを使ったテスト
// https://jestjs.io/docs/jest-object#jestspyonobject-methodname

const video = {
  play() {
    return true;
  },
};

afterEach(() => {
  // spyOnを使うとメソッドがモックに置き換わるので、元に戻す
  jest.restoreAllMocks();
});

test("plays video", () => {
  const spy = jest.spyOn(video, "play");
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);
});

test("plays video(override original method)", () => {
  const spy = jest.spyOn(video, "play").mockImplementation(() => false);
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(false);
});

test("メソッドが元の実装に戻っていること", () => {
  const isPlaying = video.play();

  expect(isPlaying).toBe(true);
});

test("プロパティはモック関数に置き換えられるが、元の処理は実行されること", () => {
  const spy = jest.spyOn(video, "play");
  const isPlaying = video.play();

  expect(video.play).toBe(spy);
  expect(isPlaying).toBe(true);
});

test("spyOnの戻り値（スパイインスタンス）と、置き換えられたプロパティが同一のオブジェクトであること", () => {
  const spy = jest.spyOn(video, "play");

  expect(spy).toBe(video.play);
});

function logHello() {
  console.log("Hello, world!");
}

// console.logをモックすること
test("console.logが実行されること", () => {
  // mockImplementationでモックの振る舞いを定義しなければ、元の関数が実行される
  // const spy = jest.spyOn(console, "log"); // → console.logが実行される
  const spy = jest.spyOn(console, "log").mockImplementation(); // console.logが実行されないようにする

  logHello();

  expect(spy).toHaveBeenCalledWith("Hello, world!");
  expect(console.log).toHaveBeenCalledWith("Hello, world!");

  expect(spy).toBe(console.log);
});
