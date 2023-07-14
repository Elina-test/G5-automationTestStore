import { title } from "process";

export function loginViaUI(user) {
    cy.visit('/index.php?rt=account/login');

    cy.log('**Submit login form ...**');
    cy.get('#loginFrm_loginname').type(user.loginName);
    cy.get('#loginFrm_password').type(user.password);
    cy.get('#loginFrm button').click();
}


export function findProductByName(productName) {
    cy.get('.prdocutname').then(($elements) => {
      const element = $elements.toArray().find(($element) => {
        const attrValue = $element.getAttribute('title');
        return attrValue === productName;
      });
  
      if (element) {
        cy.wrap(element).click();
      } else {
        cy.contains('a', '>').click();
        findProductByName(productName);
      }
    });
  }
  

  
export function checkTotalPrice(){
    cy.get('.productfilneprice').invoke('text').then(price => {
        const originalValue = parseFloat(price.replace(/[$, ]/g, ""));
        cy.get('#product_quantity').clear().type('2');
        cy.get('.total-price').invoke('click');
        cy.get('.total-price').invoke('text').should((price2) => {
          const newValue = parseFloat(price2.replace(/[$,]/g, ""));
          expect(newValue).to.eq(originalValue * '2');
        });
      });}

export function checkTotalCartPrice(){
    cy.contains('#totals_table td', 'Sub-Total:').siblings().invoke('text').then(value => {
        const subTotalValue = parseFloat(value.replace(/[$, ]/g, ""));
        cy.contains('#totals_table td', 'Flat Shipping Rate:').siblings().invoke('text').then(value2 => {
            const shippingValue = parseFloat(value2.replace(/[$, ]/g, ""));
            cy.get('#totals_table td span.bold.totalamout').eq(1).invoke('text').should(value3 => {
                const totalValue = parseFloat(value3.replace(/[$, ]/g, ""));
                expect(totalValue).to.equal(subTotalValue + shippingValue);
              });
        })
        
      });
    }