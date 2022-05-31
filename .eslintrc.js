
module.exports = {
  env: {
    node: true,
    jest: true
  },
  extends: ["airbnb", "prettier"],
  plugins: ["prettier"],
  settings: {
    react: {
      version: "16.13.0"
    },
  },
  rules: {
    "no-console": 0,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": false, "peerDependencies": false}],
    "prettier/prettier": ["error"],
    "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsForRegex": ["^memo", "^keep", "^remember"] }]
  }
};
