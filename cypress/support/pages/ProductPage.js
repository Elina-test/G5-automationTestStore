import BasePage from "./BasePage";

class ProductPage extends BasePage {

    getProductName() {
        return cy.get('.productname span');
    }
    
    getFinalPrice() {
        return cy.get('.productfilneprice');
    }
    getProductQuantity() {
        return cy.get('#product_quantity');
    }
    getTotalPrice() {
        return cy.get('.total-price');
    }
    getCartOpenButton() {
        return cy.get('.productpagecart a');
    }
}
export default new ProductPage();