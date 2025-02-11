export class CheckoutPage {
  constructor() {
    this.nameField = "[name='firstName']";
    this.lastNameField = "[name='lastName']";
    this.cardNumber = "[data-cy='cardNumber']";
    this.purchaseButton = "[data-cy='purchase']";
  }

  completeForm(username, lastname, cardNumber) {
    cy.get(this.nameField).type(username);
    cy.get(this.lastNameField).type(lastname);
    cy.get(this.cardNumber).type(cardNumber);
  }

  confirmOrder() {
    cy.get(this.purchaseButton).click();
  }
}
