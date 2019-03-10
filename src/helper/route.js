const fs = require("fs");
const path =require("path")
const promisify = require("util").promisify;
const stat = promisify(fs.stat);
const HandleBars = require("handlebars")
const config = require("../config/defaultConfig")
const mime = require("./mime")

const readdir = promisify(fs.readdir);
const tplPath = path.join(__dirname, "../template/dir.tpl");
const source = fs.readFileSync(tplPath, "utf8");  // 二进制，强制转换为字符串
const template = HandleBars.compile(source)

module.exports = async function(req, res, filePath) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
            const contentType = mime(filePath)
            res.statusCode = 200;
            res.setHeader("Content-Type", contentType + ";charset=utf-8")

            fs.createReadStream(filePath).pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html;charset=utf-8")
            const dir = path.relative(config.root, filePath)
            const data = {
              title: path.basename(filePath),
              dir: dir ? `/${dir}` : '',
              files
            }
            res.end(template(data));
        }
    } catch (err) {
        res.statusCode = 404
        res.setHeader("Content-Type", "text/plain");
        res.end(`${filePath} is not a directory or file`)
    }
}
