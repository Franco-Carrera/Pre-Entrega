export class ProductsPage {
  constructor() {
    this.closeModal = "#closeModal";
  }

  addProductsToCart(producto) {
    cy.get(producto, { timeout: 7500 }).click();
    cy.get(this.closeModal).click();
  }
}

//dinámico = como nombre de los productos que van cambiando
//estático = no cambia como id
