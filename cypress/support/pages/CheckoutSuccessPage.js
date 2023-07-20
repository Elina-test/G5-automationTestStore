import BasePage from "./BasePage";

class CheckoutSuccessPage extends BasePage {

    visit() {
        cy.visit('/index.php?rt=checkout/success')
    }

    getSuccessCheckoutText() {
        return cy.get('.maintext');
    }
    
}
export default new CheckoutSuccessPage();