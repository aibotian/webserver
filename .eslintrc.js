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
  },
  "env": {
    "browser": false,
    "es6": true,
    "node": true,
    "mocha": true
  }




};
