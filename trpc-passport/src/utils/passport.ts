import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { findUser } from "./user";

const localStrategy = new LocalStrategy(
  { passwordField: "password", usernameField: "username" },
  function (username, password, done) {
    const user = findUser(username, password);

    if (user === undefined) {
      // 認証失敗
      return done(null, false, {
        message: "ユーザー名またはパスワードが間違っています",
      });
    }
    return done(null, user);
  }
);

passport.use(localStrategy);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    // @ts-ignore
    cb(null, user);
  });
});

export { passport };
