import BasePage from "./BasePage";

class HomePage extends BasePage {
    visit() {
        cy.visit('/')
    }

    getSearchKeywordPlaceholder(){
        return cy.get('input#filter_keyword');
    }
}
export default new HomePage();