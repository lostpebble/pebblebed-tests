module.exports = {
  presets: [
    ["@babel/preset-env"],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-nullish-coalescing-operator"
  ]
};
