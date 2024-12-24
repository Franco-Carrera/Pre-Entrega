const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://pushing-it.vercel.app/",
    defaultCommandTimeout: 3000,
    watchForFileChanges: false,
    video: false,
    env: {
      usuario: "pushingit",
      contraseña: "123456!",
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: false,
      html: true,
      json: true,
    },
  },
});
