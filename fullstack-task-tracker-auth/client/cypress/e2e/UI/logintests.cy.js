describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('Run multiple login scenarios', () => {
    cy.fixture('inputData').then((data) => {
      Object.entries(data.login).forEach(([scenario, [username, password]]) => {
        cy.log(`Running scenario: ${scenario}`);
        cy.loginApp(username, password)

        if (scenario === 'valid') {
          cy.contains('Task Tracker').should('exist');
        } else {
           cy.contains('p', 'Login failed').should('exist')
        }

        cy.reload(); // Reset for next loop
      });
    });
  });
});

