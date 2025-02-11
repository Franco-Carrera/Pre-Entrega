export class ShoppingCartPage {
  constructor() {
    this.onlineShopLink = '[data-cy="goShoppingCart"]';
    this.precioProducto = "#unitPrice";
    this.quantity = "#productAmount";
    this.priceTotal = "#totalPrice";
    this.precioFinal = "#price > b";
    this.goToBillingButton = "#goBillingSummary";
    this.goToCheckoutButton = "[id='goCheckout']";
  }

  goToShoppingCartModule() {
    cy.get(this.onlineShopLink).click();
  }

  encontrarNombreYPrecio(productName) {
    return cy.contains(productName).siblings(this.precioProducto);
  }

  encontrarNombreYCantidad(productName) {
    return cy.contains(productName).siblings(this.quantity);
  }

  encontrarNombreYPrecioMaximo(productName) {
    return cy.contains(productName).siblings(this.priceTotal);
  }

  mostrarPrecioFinal() {
    cy.contains("Show total price").click();
  }

  encontrarPrecioFinal() {
    return cy.get(this.precioFinal);
  }

  goToBillingPage() {
    cy.get(this.goToBillingButton).click();
  }

  goToCheckout() {
    cy.get(this.goToCheckoutButton).click();
  }
}
