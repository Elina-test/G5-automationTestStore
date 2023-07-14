import {faker} from '@faker-js/faker';
import user from '../fixtures/user.json'
import { loginViaUI } from '../support/helper';

describe('Registration', () => {
  it('Registration', () => {
    cy.visit('/')
    
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.phoneNumber = faker.phone.number('+380## ### ## ##');
    user.fax = faker.phone.number();
    user.company = faker.company.name();
    user.address = faker.location.streetAddress();
    user.zipCode = faker.location.zipCode();
    user.city = faker.location.city();
    user.loginName = faker.internet.userName();
    user.password = faker.internet.password({length: 10});


  
    cy.log('Opening registration form ...')
    cy.get('#customer_menu_top').click();
    cy.get('#accountFrm button').click();

    cy.log('Fill in registration form ...')
    cy.get('#AccountFrm_firstname').type(user.firstName)
    cy.get('#AccountFrm_lastname').type(user.lastName)
    cy.get('#AccountFrm_email').type(user.email)
    cy.get('#AccountFrm_telephone').type(user.phoneNumber)
    cy.get('#AccountFrm_fax').type(user.fax)
    cy.get('#AccountFrm_company').type(user.company)
    cy.get('#AccountFrm_address_1').type(user.address)
    cy.get('#AccountFrm_city').type(user.city)
    cy.get('#AccountFrm_zone_id').select(user.region)
    cy.get('#AccountFrm_postcode').type(user.zipCode)
    cy.get('#AccountFrm_country_id').select(user.country)
    cy.get('#AccountFrm_loginname').type(user.loginName)
    cy.get('#AccountFrm_password').type(user.password)
    cy.get('#AccountFrm_confirm').type(user.password)

    cy.get('#AccountFrm_newsletter0').check();
    cy.get('#AccountFrm_agree').check()

    cy.get('.form-group [type="submit"]').click()

    cy.get('.maintext').should('be.visible').and('contain', 'Your Account Has Been Created')
  })

  it('Authorization', () => {
    loginViaUI(user);

})
})