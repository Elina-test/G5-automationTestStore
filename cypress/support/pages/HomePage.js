import BasePage from "./BasePage";

class HomePage extends BasePage {
    visit() {
        cy.visit('/')
    }
}
export default new HomePage();