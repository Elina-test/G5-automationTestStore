import BasePage from "./BasePage";

class AccountLoginPage extends BasePage {
    visit() {
        cy.visit('/index.php?rt=account/login')
    }

    getRegisterButton() {
        return cy.get('#accountFrm button');
    }
}
export default new AccountLoginPage();