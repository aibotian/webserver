const http = require("http");
const path = require("path");
const chalk = require("chalk");
const route = require("./src/helper/route");
const conf = require("./src/config/defaultConfig")

const server = http.createServer((req, res) => {
  const url = req.url;
  const filePath = path.join(conf.root, url);
  route(req, res, filePath)
})

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.log(`Server running at ${chalk.green(addr)}`)
})



