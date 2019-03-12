const path = require("path")

// mime类型
// TODO 添加文件图标
const mimeTypes = {
  txt:"text/plain",
  doc:"application/msword",
  exe:"application/octet-stream",
  pdf:"application/pdf",
  ps:"application/postscript",
  xlm:"application/vnd.ms-excel",
  xls:"application/vnd.ms-excel",
  ppt:"application/vnd.ms-powerpoint",
  tgz:"application/x-compressed",
  gz:"application/x-gzip",
  mvb:"application/x-msmediaview",
  swf:"application/x-shockwave-flash",
  tar:"application/x-tar",
  zip:"application/zip",
  mp3:"audio/mpeg",
  wav:"audio/x-wav",
  bmp:"image/bmp",
  gif:"image/gif",
  jpe:"image/jpeg",
  jpeg:"image/jpeg",
  jpg:"image/jpeg",
  mp2:"video/mpeg",
  mpa:"video/mpeg",
  mpe:"video/mpeg",
  mpeg:"video/mpeg",
  mpg:"video/mpeg",
  mpv2:"video/mpeg",
  mov:"video/quicktime",
  qt:"video/quicktime",
  avi:"video/x-msvideo",
  ".png":"image/png",
  css: "text/css",
  html: "text/html",
  js: "application/x-javascript"
}

module.exports = (filePath) => {
  let ext = path.extname(filePath).split(".").pop().toLowerCase();

  if(!ext) {
    ext = filePath;
  }

  return mimeTypes[ext] || mimeTypes["txt"]
}
