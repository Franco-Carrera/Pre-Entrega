export class ReciptPage {
  constructor() {
    this.nameParagraph = "[data-cy='name']";
    this.productparagraph = ".css-1tcqc9o .chakra-text:nth-child(3)";
    this.creditCardSpan = "[data-cy='creditCard']";
    this.totalCostParagraph = "#totalPrice";
  }

  encontrarNombreYApellido() {
    return cy.get(this.nameParagraph).invoke("text");
  }

  encontrarProductoUno(producto) {
    return cy.contains(producto);
  }

  encontrarProductoDos() {
    return cy.get(this.productparagraph);
  }

  encontrarTarjetaUser() {
    return cy.get(this.creditCardSpan);
  }

  encontrarCostoTotal() {
    return cy.get(this.totalCostParagraph);
  }
}
