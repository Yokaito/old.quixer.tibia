module.exports = {
  extends: ["next", "turbo", "prettier", "next/core-web-vitals"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
