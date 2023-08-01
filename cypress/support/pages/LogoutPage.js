import BasePage from "./BasePage";

class LogoutPage extends BasePage {
    visit() {
        cy.visit('/index.php?rt=account/logout')
    }

    getLogoutMessageText() {
        return cy.get('.heading1 .maintext');
    }

}
export default new LogoutPage();