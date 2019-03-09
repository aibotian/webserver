module.exports = {
  "extends": "eslint:recommended",
  "rules": {
    "no-console": ["error", {
      // "allow": ["warn", "error", "info"]
      "allow": ["log"]
    }]
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "script"
  },
  "globals": {
    // "window": true
    "global": true
  },
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "mocha": true
  }




};
