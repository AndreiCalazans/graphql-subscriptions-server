module.exports = {
  "extends": "airbnb-base",
  "parser": "babel-eslint",
  "plugins": [
    "flowtype",
    "import"
  ],
  "globals": {
    "require": true
  },
  "env": {
    "jest": true,
    "node": true,
    "es6": true,
    "browser": true,
  },
  "rules": {
    "import/prefer-default-export": 0
  }
};
