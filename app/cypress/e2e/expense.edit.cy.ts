describe('expense edit', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });
  it('have 12 active', () => {
    cy.get('.pagination__button').last().click();
    cy.get('.expense-table--pointer').first().click();
    cy.get('textarea').type('nouveau');
    cy.get('button').click();
    cy.get('.pagination__active').contains(12);
  });
});
