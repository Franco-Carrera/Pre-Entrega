export class HomePage {
  constructor() {
    this.onlineShopLink = "#onlineshoplink";
  }

  goToOnlineShopModule() {
    cy.get(this.onlineShopLink, { timeout: 7500 }).click();
  }
}
