describe('expense edit', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });
  it('have page 1 active ', () => {
    cy.get('.pagination__button').last().click();
    cy.get('a').click();
    cy.get('#amount-input').invoke('val', '20');
    cy.get('#comment-textarea').type('nouveau');
    cy.get('#distance-input').invoke('val', '20');
    cy.wait(1000);
    cy.get('button').click();
    cy.get('.pagination__active').contains(1);
  });
});
