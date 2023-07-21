import user from '../fixtures/user.json';
import { loginViaUI } from '../support/helper';
import homePage from '../support/pages/HomePage';
import loginPage from '../support/pages/LoginPage';
import accountCreatePage from '../support/pages/AccountCreatePage';
import accountSuccessPage from '../support/pages/AccountSuccessPage';
import userAccountPage from '../support/pages/UserAccountPage';
import logoutPage from '../support/pages/LogoutPage';
import resetPasswordPage from '../support/pages/ResetPasswordPage';
import remindLoginPage from '../support/pages/RemindLoginPage';


beforeEach ( () => {
    homePage.visit();
    cy.log('**Opening login form ...**')
    homePage.getLoginOrRegisterButton().click();
})

describe('Authorization tests', () => {

  it('Authorization with correct credentials and Logout', () => {

    loginPage.fillInLoginForm(user.loginName, user.password);

    userAccountPage.getUserFirstNameText(user);

    cy.log('**Log out ...**')
    userAccountPage.getLogOutButton().click({force: true})

    cy.log('**Verifying logout page...**')
    logoutPage.getLogoutMessageText().should('have.text', ' Account Logout')

})

  it('Attempt to log in without password', () => {

    loginPage.fillInLoginForm(user.loginName, "{leftArrow}");

    loginPage.getErrorMessage();

})

  it('Authorization with incorrect login', () => {

    loginPage.fillInLoginForm(user.loginName + '1', user.password);

    loginPage.getErrorMessage();

})

 it('Authorization with incorrect password', () => {

    loginPage.fillInLoginForm(user.loginName, user.password + '1');

    loginPage.getErrorMessage();

})

 it('Authorization with space before login', () => {

    cy.log('**Update user data...**');

    loginPage.fillInLoginForm(' ' + user.loginName, user.password);

    loginPage.getErrorMessage();
})

  it('Authorization with space after login', () => {

    loginPage.fillInLoginForm(user.loginName + ' ', user.password);

    userAccountPage.getUserFirstNameText(user);
})


  it('Reset password', () => {

    cy.log('**Open Forgot your password page...**')
    loginPage.getResetPasswordButton().click()

    cy.log('**Verifying forgot password page...**')
    resetPasswordPage.getResetPasswordText().should('have.text', ' Forgot Your Password?')

    resetPasswordPage.fillInResetPasswordForm(user.loginName, user.email);

    loginPage.getSuccessResetPasswordMessage();
})

  it('Attempt to Reset password with incorrect login name', () => {

    cy.log('**Open Forgot your password page...**')
    loginPage.getResetPasswordButton().click()

    cy.log('**Verifying forgot password page...**')
    resetPasswordPage.getResetPasswordText().should('have.text', ' Forgot Your Password?')

    resetPasswordPage.fillInResetPasswordForm(user.loginName + '1', user.email);

    loginPage.getErrorResetOrRemindMessage();
})

  it('Login reminder', () => {

    cy.log('**Open Forgot your login page...**')
    loginPage.getLoginReminderButton().click()

    cy.log('**Verifying forgot login page...**')
    remindLoginPage.getReminderLoginText().should('have.text', ' Forgot Your Login Name?')

    remindLoginPage.fillInRemindLoginForm(user.lastName, user.email);

    loginPage.getSuccessReminderLoginMessage();
})


  it('Login reminder with incorrect Last Name', () => {
 
    cy.log('**Open Forgot your login page...**')
    loginPage.getLoginReminderButton().click()


    cy.log('**Verifying forgot login page...**')
    remindLoginPage.getReminderLoginText().should('have.text', ' Forgot Your Login Name?')

    remindLoginPage.fillInRemindLoginForm(user.lastName + '1', user.email);

    loginPage.getErrorResetOrRemindMessage();
  
})
})