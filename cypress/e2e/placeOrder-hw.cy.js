import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import {loginViaUI} from '../support/helper';
import {findProductByName} from '../support/helper';
import {checkTotalPrice} from '../support/helper';
import {checkTotalCartPrice} from '../support/helper';


it('Place order HW', () => {

  loginViaUI(user);
  
  cy.log('Add random product to cart from main page')
  cy.visit('/');

  cy.log('**Find all elements with a letter...**')
  cy.get('input#filter_keyword').type('i{enter}');

  cy.log('**Find special element be its name**')
  findProductByName('Body Cream by Bulgari');

  cy.log('**Check that the found element has correct name')
  cy.get('.productname span').should('have.text', 'Body Cream by Bulgari')

  checkTotalPrice();

  cy.get('.productpagecart a').click();

  checkTotalCartPrice();

 
  cy.log('Open basket')
  cy.get('#cart_checkout1').click();

  cy.log('Verify checkout data')
  cy.get('.table.confirm_shippment_options')
  .should('contain', user.firstName)
  .and('contain', user.lastName)
  .and('contain', user.phoneNumber);

  cy.get('.table.confirm_payment_options')
  .should('contain', user.firstName)
  .and('contain', user.lastName)
  .and('contain', user.phoneNumber);

  cy.log('Confirm order')
  cy.get('#checkout_btn').click();

  cy.log('Thank you page displayed')
  cy.get('.maintext').should('contain', 'Your Order Has Been Processed!');
})