module.exports = {
  preset: "ts-jest",
  cacheDirectory: ".tmp",
  notify: true,
  verbose: true,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/jest.fileMock.config.js",
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
  modulePaths:["<rootDir>/"],
  snapshotResolver: "<rootDir>/jest.snapshotResolver.config.js"
};
