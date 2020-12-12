module.exports = {
  preset: "ts-jest",
  cacheDirectory: ".tmp",
  notify: true,
  verbose: true,
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(test).(ts|tsx)"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
