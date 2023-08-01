import BasePage from "./BasePage";

class UserAccountPage extends BasePage {
    visit() {
        cy.visit('/index.php?rt=account/account')
    }

    getUserFirstNameText(user) {
        cy.log('**Verifying my account page...**')
        cy.get('.heading1 .subtext').should('have.text', user.firstName);;
    }

    getLogOutButton() {
        return cy.contains('a', 'Logoff');
    }
}
export default new UserAccountPage();