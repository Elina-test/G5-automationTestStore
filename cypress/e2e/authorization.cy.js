import user from '../fixtures/user.json'

beforeEach ( () => {
    cy.visit('/')
    cy.log('**Opening login form ...**')
    cy.get('#customer_menu_top').click();
})

describe('Authorization tests', () => {

  it('Authorization with correct credentials and Logout', () => {

    cy.get('#loginFrm_loginname').type(user.loginName);
    cy.get('#loginFrm_password').type(user.password);
    cy.get('#loginFrm button').click()

    cy.log('**Verifying my account page...**')
    cy.get('.heading1 .subtext').should('have.text', user.firstName)

    cy.log('**Log out ...**')
    cy.contains('a', 'Logoff').click({force: true})

    cy.log('**Verifying logout page...**')
    cy.get('.heading1 .maintext').should('have.text', ' Account Logout')

})

  it('Attempt to log in without password', () => {

    cy.get('#loginFrm_loginname').type(user.loginName);
    cy.get('#loginFrm button').click()

    cy.log('**Check error message...**')

    cy.get('.alert.alert-error.alert-danger').should('contain', 'Error: Incorrect login or password provided.')

})

  it('Authorization with incorrect login', () => {

    cy.get('#loginFrm_loginname').type(user.loginName + '1');
    cy.get('#loginFrm_password').type(user.password);
    cy.get('#loginFrm button').click()

    cy.log('**Check error message...**')

    cy.get('.alert.alert-error.alert-danger').should('contain', 'Error: Incorrect login or password provided.')

})

 it('Authorization with incorrect password', () => {

    cy.get('#loginFrm_loginname').type(user.loginName);
    cy.get('#loginFrm_password').type(user.password + '1');
    cy.get('#loginFrm button').click()

    cy.log('**Check error message...**')

    cy.get('.alert.alert-error.alert-danger').should('contain', 'Error: Incorrect login or password provided.')

})

 it('Authorization with space before login', () => {

    cy.get('#loginFrm_loginname').type(' ' + user.loginName);
    cy.get('#loginFrm_password').type(user.password);
    cy.get('#loginFrm button').click()

    cy.log('**Check error message...**')

    cy.get('.alert.alert-error.alert-danger').should('contain', 'Error: Incorrect login or password provided.')
})

  it('Authorization with space after login', () => {

    cy.get('#loginFrm_loginname').type(user.loginName + ' ');
    cy.get('#loginFrm_password').type(user.password);
    cy.get('#loginFrm button').click()

    cy.log('**Verifying my account page...**')

    cy.get('.heading1 .subtext').should('have.text', user.firstName)
})


  it('Reset password', () => {

    cy.log('**Open Forgot your password page...**')
    cy.contains('a', 'Forgot your password?').click()


    cy.log('**Verifying forgot password page...**')
    cy.get('.heading1 .maintext').should('have.text', ' Forgot Your Password?')

    cy.log('**Submit resetting a password...**')
    cy.get('#forgottenFrm_loginname').type(user.loginName)
    cy.get('#forgottenFrm_email').type(user.email)
    cy.get('.form-group [type="submit"]').click()

    cy.log('**Verifying reset link was sent...**')
    cy.get('.alert.alert-success').should('contain', 'Success: Password reset link has been sent to your e-mail address.')
})

  it('Attempt to Reset password with incorrect login name', () => {

    cy.log('**Open Forgot your password page...**')
    cy.contains('a', 'Forgot your password?').click()


    cy.log('**Verifying forgot password page...**')
    cy.get('.heading1 .maintext').should('have.text', ' Forgot Your Password?')

    cy.log('**Submit resetting a password...**')
    cy.get('#forgottenFrm_loginname').type(user.loginName + '1')
    cy.get('#forgottenFrm_email').type(user.email)
    cy.get('.form-group [type="submit"]').click()

    cy.log('**Check error message...**')
    cy.get('.alert.alert-error.alert-danger').should('contain', 'Error: No records found matching information your provided, please check your information and try again!')
})

  it('Login reminder', () => {

    cy.log('**Open Forgot your login page...**')
    cy.contains('a', 'Forgot your login?').click()


    cy.log('**Verifying forgot login page...**')
    cy.get('.heading1 .maintext').should('have.text', ' Forgot Your Login Name?')

    cy.log('**Submit remind a login...**')
    cy.get('#forgottenFrm_lastname').type(user.lastName)
    cy.get('#forgottenFrm_email').type(user.email)
    cy.get('.form-group [type="submit"]').click()

    cy.log('**Verifying login name reminder was sent...**')
    cy.get('.alert.alert-success').should('contain', 'Success: Your login name reminder has been sent to your e-mail address.')
})


  it('Login reminder with incorrect Last Name', () => {

    cy.log('**Open Forgot your login page...**')
    cy.contains('a', 'Forgot your login?').click()


    cy.log('**Verifying forgot login page...**')
    cy.get('.heading1 .maintext').should('have.text', ' Forgot Your Login Name?')

    cy.log('**Submit remind a login...**')
    cy.get('#forgottenFrm_lastname').type(user.lastName + '1')
    cy.get('#forgottenFrm_email').type(user.email)
    cy.get('.form-group [type="submit"]').click()

    cy.log('**Check error message...**')
    cy.get('.alert.alert-error.alert-danger').should('contain', 'Error: No records found matching information your provided, please check your information and try again!')
})
})