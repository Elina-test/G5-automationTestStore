import { title } from "process";
import productPage from '../support/pages/ProductPage';
import productCartPage from '../support/pages/ProductCartPage';

export function loginViaUI(user) {
    cy.visit('/index.php?rt=account/login');

    cy.log('**Submit login form ...**');
    cy.get('#loginFrm_loginname').type(user.loginName);
    cy.get('#loginFrm_password').type(user.password);
    cy.get('#loginFrm button').click();
}


export function findProductByName(productName) {
  cy.get('body').then(body => {
      if (body.find(`.prdocutname[title="${productName}"]`).length > 0) {
          cy.get(`.prdocutname[title="${productName}"]`).click();
      } else {
          cy.contains('.pagination a', '>').click();
          findProductByName(productName);
      }
})

}
  
export function checkTotalPrice(){
      productPage.getFinalPrice().invoke('text').then(price => {
          const originalValue = parseFloat(price.replace(/[$, ]/g, ""));
          productPage.getProductQuantity().clear().type('2');
          productPage.getTotalPrice().invoke('click');
          productPage.getTotalPrice().invoke('text').should((price2) => {
            const newValue = parseFloat(price2.replace(/[$,]/g, ""));
            expect(newValue).to.eq(originalValue * '2');
          });
        });}


export function checkTotalCartPrice(){
  productCartPage.getSubtotalPrice().siblings().invoke('text').then(value => {
        const subTotalValue = parseFloat(value.replace(/[$, ]/g, ""));
        productCartPage.getShippingPrice().siblings().invoke('text').then(value2 => {
            const shippingValue = parseFloat(value2.replace(/[$, ]/g, ""));
            productCartPage.getCartTotalPrice().eq(1).invoke('text').should(value3 => {
                const totalValue = parseFloat(value3.replace(/[$, ]/g, ""));
                expect(totalValue).to.equal(subTotalValue + shippingValue);
              });
        })
        
      });
    }