export class ShoppingCartPage {
  constructor() {
    this.precioProducto = "#unitPrice";
    this.quantity = "#productAmount";
    this.priceTotal = "#totalPrice";
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
}
