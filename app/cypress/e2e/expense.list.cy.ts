describe('expense list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  it('have a pagination and page 1', () => {
    cy.get('.pagination').contains(1);
  });

  it('have a link Ajouter une dépense', () => {
    cy.contains('Ajouter une dépense');
  });

  it('have a table with some data', () => {
    cy.contains('trip');
  });

  it('have page 12 ative', () => {
    cy.get('.pagination__button').last().click();
    cy.get('.pagination__active').contains(12);
  });

  it('have go to page add expense', () => {
    cy.get('a').first().click();
    cy.contains('Ajouter une dépense');
  });

  it('have go to edit expense page', () => {
    cy.get('.expense-table--pointer').first().click();
    cy.contains('Modifier une dépense');
  });
});
