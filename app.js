const http = require("http");
const path = require("path");
const chalk = require("chalk");
const route = require("./src/helper/route");
const openurl = require("./src/helper/openurl");
const conf = require("./src/config/defaultConfig")

class Server {
  constructor(config) {
    this.conf = Object.assign({}, conf, config);
  }

  start() {
    const server = http.createServer((req, res) => {
      const url = req.url;
      const filePath = path.join(conf.root, url);
      route(req, res, filePath,this.conf);
    })

    server.listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}`;
      console.log(`Server running at ${chalk.green(addr)}`);
      openurl(addr)
    })
  }
}

module.exports = Server;





