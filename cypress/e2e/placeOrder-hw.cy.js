import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import {loginViaUI} from '../support/helper';
import {findProductByName} from '../support/helper';
import {checkTotalPrice} from '../support/helper';
import {checkTotalCartPrice} from '../support/helper';
import homePage from '../support/pages/HomePage';
import loginPage from '../support/pages/LoginPage';
import productPage from '../support/pages/ProductPage';
import productCartPage from '../support/pages/ProductCartPage';
import checkoutConfirmationPage from '../support/pages/CheckoutConfirmationPage';
import checkoutSuccessPage from '../support/pages/CheckoutSuccessPage';



it('Place order HW', () => {

  homePage.visit();
    cy.log('**Opening login form ...**')
    homePage.getLoginOrRegisterButton().click();
  
  loginPage.fillInLoginForm(user);
  
  cy.log('Add random product to cart from main page')
  homePage.visit();

  cy.log('**Find all elements with a letter...**')
  homePage.getSearchKeywordPlaceholder().type('i{enter}');

  cy.log('**Find special element be its name**')
  findProductByName('Body Cream by Bulgari'); 

  cy.log('**Check that the found element has correct name')
  productPage.getProductName().should('have.text', 'Body Cream by Bulgari')

  cy.log('**Check product total price when quantity changes...**')
  checkTotalPrice();

  cy.log('**Open the cart...**')
  productPage.getCartOpenButton().click();

  cy.log('**Check product cart total price including shipping price...**')
  checkTotalCartPrice();

 
  cy.log('**Open basket...**')
  productCartPage.getCartCheckoutButton().click();

  cy.log('**Verify checkout data...**')
  checkoutConfirmationPage.getShippingOptionsTable()
  .should('contain', user.firstName)
  .and('contain', user.lastName)
  .and('contain', user.phoneNumber);

  checkoutConfirmationPage.getPaymentOptionsTable()
  .should('contain', user.firstName)
  .and('contain', user.lastName)
  .and('contain', user.phoneNumber);

  cy.log('**Confirm order...**')
  checkoutConfirmationPage.getCheckoutButton().click();

  cy.log('**Thank you page displayed...**')
  checkoutSuccessPage.getSuccessCheckoutText().should('contain', 'Your Order Has Been Processed!');
})