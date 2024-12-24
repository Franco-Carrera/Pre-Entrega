//
import { AuthPage } from "../support/pages/authPage";
import { HomePage } from "../support/pages/homePage";
import { ProductsPage } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";

describe("Module Online Shop", () => {
  const authPage = new AuthPage();
  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const shoppingCartPage = new ShoppingCartPage();

  let data;

  before("Traigo Fixture", () => {
    cy.fixture("products").then((datos) => {
      data = datos;
    });
  });

  beforeEach("Precondiciones", () => {
    cy.visit("");
    authPage.redirectLogin();
    authPage.CompleteLogin();
    homePage.goToOnlineShopModule();
  });

  it("Add Products To Cart", () => {
    const precioMaximoProductoUno =
      data.productos.producto1.precio * data.productos.producto1.cantidad;

    const precioMaximoProductoDos =
      data.productos.producto2.precio * data.productos.producto2.cantidad;

    //cy.log(data);
    productsPage.addProductsToCart(
      `[name='${data.productos.producto1.nombre}']`
    );
    productsPage.addProductsToCart(
      `[name='${data.productos.producto1.nombre}']`
    );
    productsPage.addProductsToCart(
      `[name='${data.productos.producto2.nombre}']`
    );
    cy.get('[data-cy="goShoppingCart"]').click();

    shoppingCartPage
      .encontrarNombreYPrecio(data.productos.producto1.nombre)
      .should("have.text", `$${data.productos.producto1.precio}`);

    shoppingCartPage
      .encontrarNombreYPrecio(data.productos.producto2.nombre)
      .should("have.text", `$${data.productos.producto2.precio}`);

    shoppingCartPage
      .encontrarNombreYCantidad(data.productos.producto1.nombre)
      .should("have.text", data.productos.producto1.cantidad);

    shoppingCartPage
      .encontrarNombreYCantidad(data.productos.producto2.nombre)
      .should("have.text", data.productos.producto2.cantidad);

    shoppingCartPage
      .encontrarNombreYPrecioMaximo(data.productos.producto1.nombre)
      .should("have.text", `$${precioMaximoProductoUno}`);

    shoppingCartPage
      .encontrarNombreYPrecioMaximo(data.productos.producto2.nombre)
      .should("have.text", `$${precioMaximoProductoDos}`);

    cy.contains("Show total price").click();

    cy.get("#price > b").should(
      "have.text",
      `${precioMaximoProductoUno + precioMaximoProductoDos}`
    );
  });
});
