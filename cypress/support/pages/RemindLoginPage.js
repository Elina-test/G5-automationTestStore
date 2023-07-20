import BasePage from "./BasePage";

class RemindLoginPage extends BasePage {
    visit() {
        cy.visit('/index.php?rt=account/forgotten/loginname')
    }

    getReminderLoginText() {
        return cy.get('.heading1 .maintext');
    }

    getReminderLastNameField() {
        return cy.get('#forgottenFrm_lastname');
    }

    getReminderEmailField() {
        return cy.get('#forgottenFrm_email');
    }
    getSubmitReminderButton() {
        return cy.get('.form-group [type="submit"]');
    }

    fillInRemindLoginForm(user) {
        cy.log('**Submit remind a login...**');
        this.getReminderLastNameField().type(user.lastName);
        this.getReminderEmailField().type(user.email);

        cy.log('**Submit remind login...**');
        this.getSubmitReminderButton().click();
    
}
}
export default new RemindLoginPage();