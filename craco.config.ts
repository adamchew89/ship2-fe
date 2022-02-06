import path from "path";

module.exports = {
  webpack: {
    alias: {
      "z@Stores": path.resolve(__dirname, "src/stores/"),
      "z@Assets": path.resolve(__dirname, "src/assets/"),
      "z@Themes": path.resolve(__dirname, "src/themes/"),
      "z@Components": path.resolve(__dirname, "src/components/"),
      "z@Pages": path.resolve(__dirname, "src/pages/"),
      "z@Types": path.resolve(__dirname, "src/types/"),
      "z@Fixtures": path.resolve(__dirname, "src/fixtures/"),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^z@Stores/(.*)$": "<rootDir>/src/stores/$1",
        "^z@Assets/(.*)$": "<rootDir>/src/assets/$1",
        "^z@Themes/(.*)$": "<rootDir>/src/themes/$1",
        "^z@Components/(.*)$": "<rootDir>/src/components/$1",
        "^z@Pages/(.*)$": "<rootDir>/src/pages/$1",
        "^z@Types/(.*)$": "<rootDir>/src/types/$1",
        "^z@Fixtures/(.*)$": "<rootDir>/src/__fixtures__/$1",
      },
      coveragePathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/src/__fixtures__/",
        "<rootDir>/src/types/",
      ],
    },
  },
};
