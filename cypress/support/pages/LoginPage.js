import BasePage from "./BasePage";

class LoginPage extends BasePage {
    visit() {
        cy.visit('/index.php?rt=account/login')
    }

    getUserNameField() {
        return cy.get('#loginFrm_loginname');
    }

    getUserPasswordField() {
        return cy.get('#loginFrm_password');
    }
    
    getLoginButton() {
        return cy.get('#loginFrm button');
    }
 
    fillInLoginForm(user) {
        cy.log('**Fill in Login form ...**');
        this.getUserNameField().type(user.loginName);
        this.getUserPasswordField().type(user.password);

        console.log('**Submit login...**');
        this.getLoginButton().click();
    
}
    getErrorMessage() {
        cy.log('**Check error message...**')
        cy.get('.alert.alert-error.alert-danger').should('contain', 'Error: Incorrect login or password provided.')
}
    getResetPasswordButton() {
        return cy.contains('a', 'Forgot your password?');
}
    getSuccessResetPasswordMessage() {
        cy.log('**Verifying reset link was sent...**')
        cy.get('.alert.alert-success').should('contain', 'Success: Password reset link has been sent to your e-mail address.')
    }
    getErrorResetOrRemindMessage() {
        cy.log('**Check error message...**')
        cy.get('.alert.alert-error.alert-danger').should('contain', 'Error: No records found matching information your provided, please check your information and try again!')
    }

    getLoginReminderButton() {
        return cy.contains('a', 'Forgot your login?');
    }
    getSuccessReminderLoginMessage() {
        cy.log('**Verifying login name reminder was sent...**')
        cy.get('.alert.alert-success').should('contain', 'Success: Your login name reminder has been sent to your e-mail address.')
    }


}

export default new LoginPage();