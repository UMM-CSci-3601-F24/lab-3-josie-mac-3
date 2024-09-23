import { TodoListPage } from '../support/todo-list.po'


const page = new TodoListPage();

describe('Todo list', () => {
    beforeEach(() => {
        page.navigateTo();
    });

    it('Should have the correct page title', () => {
        page.getPageTitle().should('eq', 'Todos');
    });

    it('Should have the correct title', () => {
        page.getTodoTitle().should('have.text', 'Todos');
    });

    it('Should type something in the owner filter and check that it returned correct elements', () => {
        // Filter for user 'Lynn Ferguson'
        cy.get('[data-test=todoOwnerInput]').type('Fry');

        // All of the user cards should have the name we are filtering by
        page.getTodoCards().each($card => {
            cy.wrap($card).find('.todo-card-owner').should('have.text', 'Fry');
        });

        // (We check this two ways to show multiple ways to check this)
        page
            .getTodoCards()
            .find('.todo-card-owner')
            .each($name => expect($name.text()).to.equal('Fry'));
    });

    it('Should type something in the category filter and check that it returned correct elements', () => {
        // Filter for user 'Lynn Ferguson'
        cy.get('[data-test=todoCategoryInput]').type('video games');

        // All of the user cards should have the name we are filtering by
        page.getTodoCards().each($card => {
            cy.wrap($card).find('.todo-card-category').should('have.text', 'video games');
        });

        // (We check this two ways to show multiple ways to check this)
        page
            .getTodoCards()
            .find('.todo-card-category')
            .each($name => expect($name.text()).to.equal('video games'));
    });


    it('Should click view profile on a todo and go to the right URL', () => {

        cy.get('[data-test=todoBodyInput]').type('Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.');

        page
            .getTodoCards()
            .first()
            .then(card => {
                const firstTodoOwner = card.find('.tod-card-body').text();

                // When the view profile button on the first user card is clicked, the URL should have a valid mongo ID
                page.clickViewProfile(page.getTodoCards().first());

                // The URL should contain '/users/' (note the ending slash) and '/users/' should be followed by a mongo ID
                cy.url()
                    .should('contain', '/todos/')
                    .should('match', /.*\/todos\/[0-9a-fA-F]{24}$/);

                // On this profile page we were sent to, the name and company should be correct
                cy.get('.todo-card-body').first().should('have.text', "Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.");
            });
    });

    it('Should type something into the body filter and then click view profile on a todo and go to the right URL', () => {
        page
            .getTodoCards()
            .first()
            .then(card => {
                const firstTodoOwner = card.find('.tod-card-owner').text();
                const firstTodoCategory = card.find('.tod-card-category').text();

                // When the view profile button on the first user card is clicked, the URL should have a valid mongo ID
                page.clickViewProfile(page.getTodoCards().first());

                // The URL should contain '/users/' (note the ending slash) and '/users/' should be followed by a mongo ID
                cy.url()
                    .should('contain', '/todos/')
                    .should('match', /.*\/todos\/[0-9a-fA-F]{24}$/);

                // On this profile page we were sent to, the name and company should be correct
                cy.get('.todo-card-owner').first().should('have.text', "Blanche");
                cy.get('.todo-card-category').first().should('have.text', "software design");
            });
    });
})
