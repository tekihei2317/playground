type NextFunction = () => void;
type Middleware = (next: NextFunction) => void;

interface AppInterface {
  use: (middleware: Middleware) => void;
  handle: () => void;
}

class App implements AppInterface {
  private stack: Middleware[] = [];

  use(middleware: Middleware) {
    this.stack.push(middleware);
  }

  handle() {
    let index = 0;

    const next = () => {
      const middleware = this.stack[index++];
      if (middleware === undefined) {
        return;
      }
      middleware(next);
    };

    next();
  }
}

const app = new App();
app.use((next) => {
  console.log("1");
  next();
  console.log("2");
});

app.use((next) => {
  console.log("3");
  next();
  console.log("4");
});

app.handle();
