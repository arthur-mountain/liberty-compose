module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-css-modules"],
  plugins: ["stylelint-prettier"],
  rules: {
    "no-empty-source": null,
    "alpha-value-notation": null,
    "color-function-notation": null,
    "no-descending-specificity": null,
  },
};
