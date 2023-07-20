import BasePage from "./BasePage";

class ResetPasswordPage extends BasePage {
    visit() {
        cy.visit('/index.php?rt=account/forgotten/password')
    }

    getResetPasswordText() {
        return cy.get('.heading1 .maintext');
    }

    getResetLogNameField() {
        return cy.get('#forgottenFrm_loginname');
    }

    getResetEmailField() {
        return cy.get('#forgottenFrm_email');
    }
    getSubmitResetButton() {
        return cy.get('.form-group [type="submit"]');
    }

    fillInResetPasswordForm(user) {
        cy.log('**Submit resetting a password...**');
        this.getResetLogNameField().type(user.loginName);
        this.getResetEmailField().type(user.email);

        cy.log('**Submit reset password...**');
        this.getSubmitResetButton().click();
    
}
}
export default new ResetPasswordPage();