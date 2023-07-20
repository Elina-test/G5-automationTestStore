import BasePage from "./BasePage";

class CheckoutConfirmationPage extends BasePage {

    visit() {
        cy.visit('/index.php?rt=checkout/confirm')
    }

    getShippingOptionsTable() {
        return cy.get('.table.confirm_shippment_options');
    }
    
    getPaymentOptionsTable() {
        return cy.get('.table.confirm_payment_options');
    }
    getCheckoutButton() {
        return cy.get('#checkout_btn');
    }

    getCartCheckoutButton() {
        return y.get('#cart_checkout1');
    }
}
export default new CheckoutConfirmationPage();