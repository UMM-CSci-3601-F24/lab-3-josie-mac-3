import { Todo } from 'src/app/todos/todo';

export class TodoListPage {
    navigateTo() {
        return cy.visit('/todos');
    }

    getUrl() {
        return cy.url();
    }

    getPageTitle() {
        return cy.title();
    }

    getTodoTitle() {
        return cy.get('.todo-list-title');
    }


    getTodoCards() {
        return cy.get('.todo-cards-container app-todo-card');
    }


    getTodoListItems() {
        return cy.get('.todo-nav-list .todo-list-item');
    }


    clickViewProfile(card: Cypress.Chainable<JQuery<HTMLElement>>) {
        return card.find<HTMLButtonElement>('[data-test=viewTodoButton]').click();
    }


    changeView(viewType: 'card' | 'list') {
        return cy.get(`[data-test=viewTypeRadio] mat-radio-button[value="${viewType}"]`).click();
    }
}
