import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { findByCredentials } from "./user";

const localStrategy = new LocalStrategy(
  { usernameField: "user_name", passwordField: "password" },
  (username, password, cb) => {
    const user = findByCredentials({ userName: username, password });

    if (user === null) {
      return cb(null, null, {
        message: "ユーザー名またはパスワードが間違っています",
      });
    }

    return cb(null, user);
  }
);

passport.use(localStrategy);

// 状態を変更しているのがちょっと気になる...
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});

// ナニコレ...？
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    // TODO:
    // @ts-ignore
    cb(null, user);
  });
});

export { passport };
