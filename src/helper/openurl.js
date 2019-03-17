const { exec } = require("child_process");

module.exports = function(url) {
  switch(process.platform){
    case "darwin":
      exec(`open ${url}`);
      return;
    case "win32":
      exec(`start ${url}`);
      return;
  }
}
