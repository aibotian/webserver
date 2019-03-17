const fs = require("fs");
const path =require("path")
const promisify = require("util").promisify;
const stat = promisify(fs.stat);
const HandleBars = require("handlebars")
// const config = require("../config/defaultConfig")
const mime = require("./mime")
const compress = require("./compress")
const range = require("./range");
const isFresh = require("./cache")

const readdir = promisify(fs.readdir);
const tplPath = path.join(__dirname, "../template/dir.tpl");
const source = fs.readFileSync(tplPath, "utf8");  // 二进制，强制转换为字符串
const template = HandleBars.compile(source)

module.exports = async function(req, res, filePath,config) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) { // 文件直接读流响应到页面
            const contentType = mime(filePath)
            res.setHeader("Content-Type", contentType + ";charset=utf-8")
            // 浏览器缓存
            if(isFresh(stats, req, res)) {
              res.statusCode = 304;
              res.end();
              return;
            }

            let rs;
            const { code,start,end } = range(stats.size, req, res);
            if(code === 200) {
              res.statusCode = 200;
              rs = fs.createReadStream(filePath)
            } else {
              res.statusCode = 206;
              rs = fs.createReadStream(filePath, {start, end});
            }
            rs = fs.createReadStream(filePath).pipe(res);
            if(filePath.match(config.compress)) {
              rs = compress(rs, req, res)
            }
            rs.pipe(res)
        } else if (stats.isDirectory()) { // 文件夹，响应html页面，并展示下一级文件列表
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
