//
import { HomePage } from "../support/pages/homePage";
import { ProductsPage } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { CheckoutPage } from "../support/pages/checkoutPage";
import { ReciptPage } from "../support/pages/reciptPage";
const { user, contraseña } = Cypress.env("usuario").credenciales;

describe("Module Online Shop", () => {
  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const shoppingCartPage = new ShoppingCartPage();
  const checkoutPage = new CheckoutPage();
  const reciptPage = new ReciptPage();

  let data;
  let dataCheckout;

  before("Traigo Fixture", () => {
    cy.fixture("products").then((datos) => {
      data = datos;
    });
    cy.fixture("checkout").then((datos) => {
      dataCheckout = datos;
    });
  });

  beforeEach("Precondiciones", () => {
    cy.registerUser(user, contraseña);
    cy.logUser(user, contraseña);
    cy.visit("");
    homePage.goToOnlineShopModule();
  });

  it("Complete purchase", () => {
    const precioMaximoProductoUno =
      data.productos.producto1.precio * data.productos.producto1.cantidad;

    productsPage.addProductsToCart(data.productos.producto1.nombre);
    productsPage.addProductsToCart(data.productos.producto1.nombre);
    productsPage.addProductsToCart(data.productos.producto2.nombre);

    shoppingCartPage.goToShoppingCartModule();

    shoppingCartPage
      .encontrarNombreYPrecio(data.productos.producto1.nombre)
      .should("have.text", `$${data.productos.producto1.precio}`);

    shoppingCartPage
      .encontrarNombreYPrecio(data.productos.producto2.nombre)
      .should("have.text", `$${data.productos.producto2.precio}`);

    shoppingCartPage
      .encontrarNombreYPrecioMaximo(data.productos.producto1.nombre)
      .should("have.text", `$${precioMaximoProductoUno}`);

    shoppingCartPage.mostrarPrecioFinal();

    shoppingCartPage
      .encontrarPrecioFinal()
      .should(
        "have.text",
        `${precioMaximoProductoUno + data.productos.producto2.precio}`
      );

    shoppingCartPage.goToBillingPage();
    shoppingCartPage.goToCheckout();
    checkoutPage.completeForm(
      dataCheckout.formulario.nombre,
      dataCheckout.formulario.apellido,
      dataCheckout.formulario.tarjeta
    );

    checkoutPage.confirmOrder();

    reciptPage
      .encontrarNombreYApellido()
      .should(
        "include",
        `${dataCheckout.formulario.nombre} ${dataCheckout.formulario.apellido}`
      );

    reciptPage
      .encontrarProductoUno(data.productos.producto1.nombre)
      .should("have.text", `2 x ${data.productos.producto1.nombre}`);

    reciptPage
      .encontrarProductoDos()
      .should("have.text", `1 x ${data.productos.producto2.nombre}`);

    reciptPage
      .encontrarTarjetaUser()
      .should("have.text", dataCheckout.formulario.tarjeta);

    reciptPage
      .encontrarCostoTotal()
      .should(
        "contain.text",
        `${precioMaximoProductoUno + data.productos.producto2.precio}`
      );
  });

  after("Eliminar usuario del sistema", () => {
    cy.deleteUser(user);
  });
});
