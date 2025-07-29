describe('CRUD SCENARIOS Tests', () => {
  let testData; // Declare outside to store fixture data

    before(() => {
        cy.fixture('inputData').then((data) => {
        testData = data;
        });
    });

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        // const username = testData.tasks.login[0];
        // const password = testData.tasks.login[1];
        cy.loginApp(testData.tasks.login[0], testData.tasks.login[1]);

    })

    it('should create multiple tasks', () => {
      // Use testData inside the Cypress command chain (after it's loaded)
        cy.then(() => {
            testData.tasks.task.forEach((taskName) => {
                cy.createItem(taskName);
            })
        });
    });

    it('should edit the task', () => {
        cy.then(() => {
            const taskName = testData.tasks.edit[0]
            const editToTask = testData.tasks.edit[1]
            cy.contains('li', taskName).contains('button', 'Edit').click();
            cy.get(`input[value=${taskName}]`).clear().type(editToTask)
            cy.contains('button','Save').click();
        })
    })

    it('should delete the rows', () => {
        cy.then(() => {
            testData.tasks.task.forEach((taskName) => {
                cy.contains('li', taskName).contains('button', 'Delete').click();
            })
        })
    })
});
