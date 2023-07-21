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

    fillInResetPasswordForm(loginName, email) {
        cy.log('**Submit resetting a password...**');
        this.getResetLogNameField().type(loginName);
        this.getResetEmailField().type(email);

        cy.log('**Submit reset password...**');
        this.getSubmitResetButton().click();
    
}
}
export default new ResetPasswordPage();