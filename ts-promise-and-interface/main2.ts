interface IAnimal2<T = any> {}
class Dog2<T> implements IAnimal2<T> {}

function makeDog2<T = number>(): IAnimal2<T> {
  return new Dog2<number>();
}
