const path = require("path");
const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");
const fs = require("fs");

const dir = path.join(process.cwd(), "test-clone");
git
  .clone({ fs, http, dir, url: "https://github.com/tekihei2317/git-problems" })
  .then(console.log);
