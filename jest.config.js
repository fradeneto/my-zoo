module.exports ={
  rootDir: "./",
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  coverageDirectory: "./coverage",
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  testEnvironment: "jsdom",
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  }
}