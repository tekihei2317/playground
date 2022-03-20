interface IAnimal {
  cry(): string;
}

class Dog implements IAnimal {
  cry() {
    return "ワン";
  }
}

class Cat {}

// 戻り値の型をインターフェイスで宣言すると、そのインターフェイスを継承したクラスを返せる
function makeDog(): IAnimal {
  // return new Cat(); // エラ−
  return new Dog();
}

// Promiseの場合も同様？（そもそもPromiseの型とは？）
function makeDogAsync(): Promise<IAnimal> {
  return new Promise<Dog>((resolve) => {
    setTimeout(() => resolve(new Dog()), 2000);
  });
}

const dog = makeDog();
console.log(dog);

makeDogAsync().then((dog) => console.log(dog));
