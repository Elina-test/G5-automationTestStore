import BasePage from "./BasePage";

class ProductCartPage extends BasePage {

    visit() {
        cy.visit('/index.php?rt=checkout/cart')
    }

    getSubtotalPrice() {
        return cy.contains('#totals_table td', 'Sub-Total:');
    }
    
    getShippingPrice() {
        return cy.contains('#totals_table td', 'Flat Shipping Rate:');
    }
    getCartTotalPrice() {
        return cy.get('#totals_table td span.bold.totalamout');
    }

    getCartCheckoutButton() {
        return cy.get('#cart_checkout1');
    }
}
export default new ProductCartPage();