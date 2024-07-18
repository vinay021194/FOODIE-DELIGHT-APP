module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Use babel-jest for transforming .js and .jsx files
  },
  transformIgnorePatterns: [
    "node_modules/(?!axios)", // Ignore node_modules except for axios
  ],
};
