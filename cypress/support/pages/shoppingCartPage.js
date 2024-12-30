export class ShoppingCartPage {
  constructor() {
    this.onlineShopLink = '[data-cy="goShoppingCart"]';
    this.precioProducto = "#unitPrice";
    this.quantity = "#productAmount";
    this.priceTotal = "#totalPrice";
    this.precioFinal = "#price > b";
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
}
