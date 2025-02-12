const { defineConfig } = require("cypress");

const numero = Math.floor(Math.random() * 1000);
const username = `Juan${numero}`;
const password = "michis124!";

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
      usuario: {
        credenciales: {
          user: `${username}`,
          contraseña: `${password}`,
        },
      },
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
