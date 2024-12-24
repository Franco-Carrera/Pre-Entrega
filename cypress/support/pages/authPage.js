export class AuthPage {
  //Métodos

  redirectLogin() {
    cy.get('[data-cy="registertoggle"]').dblclick();
  }

  CompleteLogin() {
    cy.get('[data-cy="user"]').type(Cypress.env().usuario);
    cy.get('[data-cy="pass"]').type(Cypress.env().contraseña);
    cy.get('[data-cy="submitForm"]').click();
  }
}
