// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const baseAPIUrl = "https://pushing-it-3.onrender.com";

const numero = Math.floor(Math.random() * 1000);
const username = `Juan${numero}`;
const password = "michis123!";

Cypress.Commands.add("registerUser", () => {
  cy.request({
    method: "POST",
    url: `${baseAPIUrl}/api/register`,
    body: {
      username: username,
      password: password,
      gender: "Male",
      year: "1982",
      month: "12",
      day: "8",
    },
  });
});

Cypress.Commands.add("logUser", (token, user) => {
  cy.request({
    method: "POST",
    url: `${baseAPIUrl}/api/login`,
    body: {
      username: username,
      password: password,
    },
  }).then((response) => {
    cy.log(response.body.token);
    cy.log(response.body.user.username);
    window.localStorage.setItem("token", response.body.token);
    window.localStorage.setItem("user", response.body.user.username);
    window.localStorage.setItem("_id", response.body.user._id);
  });
});

Cypress.Commands.add("deleteUser", () => {
  cy.request({
    method: "DELETE",
    url: `${baseAPIUrl}/api/deleteuser/${username}`,
  });
});
