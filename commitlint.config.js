const Configuration = {
  extends: [`@commitlint/config-conventional`],
  ignores: [(message) => message.includes(`Release`)],
  rules: {
    'type-enum': [
      2,
      `always`,
      [
        `feat`,
        `fix`,
        `docs`,
        `style`,
        `refactor`,
        `perf`,
        `tests`,
        `chore`,
        `revert`,
      ],
    ],
  },
}

module.exports = Configuration
