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

    loginPage.fillInLoginForm(user);

    userAccountPage.getUserFirstNameText(user);

    cy.log('**Log out ...**')
    userAccountPage.getLogOutButton().click({force: true})

    cy.log('**Verifying logout page...**')
    logoutPage.getLogoutMessageText().should('have.text', ' Account Logout')

})

  it('Attempt to log in without password', () => {
    let userWithoutPassword = JSON.parse(JSON.stringify(user));

    cy.log('**Update user data...**');
    userWithoutPassword.loginName = user.loginName;
    userWithoutPassword.password = "{leftArrow}";

    loginPage.fillInLoginForm(userWithoutPassword);

    loginPage.getErrorMessage();

})

  it('Authorization with incorrect login', () => {
    let userWithIncorrectLogName = JSON.parse(JSON.stringify(user));

    cy.log('**Update user data...**');
    userWithIncorrectLogName.loginName = user.loginName + '1';
    userWithIncorrectLogName.password = user.password;

    loginPage.fillInLoginForm(userWithIncorrectLogName);

    loginPage.getErrorMessage();

})

 it('Authorization with incorrect password', () => {
    let userWithIncorrectPass = JSON.parse(JSON.stringify(user));

    cy.log('**Update user data...**');
    userWithIncorrectPass.loginName = user.loginName;
    userWithIncorrectPass.password = user.password + '1';

    loginPage.fillInLoginForm(userWithIncorrectPass);

    loginPage.getErrorMessage();

})

 it('Authorization with space before login', () => {
    let userWithSpaceBeforeLogin = JSON.parse(JSON.stringify(user));

    cy.log('**Update user data...**');
    userWithSpaceBeforeLogin.loginName = ' ' + user.loginName;
    userWithSpaceBeforeLogin.password = user.password;

    loginPage.fillInLoginForm(userWithSpaceBeforeLogin);

    loginPage.getErrorMessage();
})

  it('Authorization with space after login', () => {
    let userWithSpaceAfterLogin = JSON.parse(JSON.stringify(user));

    cy.log('**Update user data...**');
    userWithSpaceAfterLogin.loginName = user.loginName + ' ';
    userWithSpaceAfterLogin.password = user.password;

    loginPage.fillInLoginForm(userWithSpaceAfterLogin);

    userAccountPage.getUserFirstNameText(user);
})


  it('Reset password', () => {

    cy.log('**Open Forgot your password page...**')
    loginPage.getResetPasswordButton().click()

    cy.log('**Verifying forgot password page...**')
    resetPasswordPage.getResetPasswordText().should('have.text', ' Forgot Your Password?')

    resetPasswordPage.fillInResetPasswordForm(user);

    loginPage.getSuccessResetPasswordMessage();
})

  it('Attempt to Reset password with incorrect login name', () => {
    let userWithIncorrectLogin = JSON.parse(JSON.stringify(user));

    cy.log('**Update user data...**');
    userWithIncorrectLogin.loginName = user.loginName + '1';
    userWithIncorrectLogin.email = user.email;

    cy.log('**Open Forgot your password page...**')
    loginPage.getResetPasswordButton().click()

    cy.log('**Verifying forgot password page...**')
    resetPasswordPage.getResetPasswordText().should('have.text', ' Forgot Your Password?')

    resetPasswordPage.fillInResetPasswordForm(userWithIncorrectLogin);

    loginPage.getErrorResetOrRemindMessage();
})

  it('Login reminder', () => {

    cy.log('**Open Forgot your login page...**')
    loginPage.getLoginReminderButton().click()

    cy.log('**Verifying forgot login page...**')
    remindLoginPage.getReminderLoginText().should('have.text', ' Forgot Your Login Name?')

    remindLoginPage.fillInRemindLoginForm(user);

    loginPage.getSuccessReminderLoginMessage();
})


  it('Login reminder with incorrect Last Name', () => {
    let userWithIncorrectLastName = JSON.parse(JSON.stringify(user));

    cy.log('**Update user data...**');
    userWithIncorrectLastName.lastName = user.lastName + '1';
    userWithIncorrectLastName.email = user.email;
    
    cy.log('**Open Forgot your login page...**')
    loginPage.getLoginReminderButton().click()


    cy.log('**Verifying forgot login page...**')
    remindLoginPage.getReminderLoginText().should('have.text', ' Forgot Your Login Name?')

    remindLoginPage.fillInRemindLoginForm(userWithIncorrectLastName);

    loginPage.getErrorResetOrRemindMessage();
  
})
})