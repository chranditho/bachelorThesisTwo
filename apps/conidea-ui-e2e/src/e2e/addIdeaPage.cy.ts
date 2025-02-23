describe('Add Idea Page', () => {
  beforeEach(() => {
    cy.visit('/add');
  });

  it('should display the heading "What idea is on your mind?"', () => {
    cy.get('h1').should('contain', 'What idea is on your mind?');
  });

  it('should display back button', () => {
    cy.get('button').contains('Back').should('exist');
  });

  it('should navigate to idea feed page on button click', () => {
    cy.get('button').contains('Back').click();
    cy.url().should('include', '/');
  });

  it('should disable submit button on initial page load', () => {
    cy.get('#submit').should('be.disabled');
  });

  it('should enable submit button when description is added', () => {
    cy.get('#description').as('editor');
    cy.get('@editor').type('such an amazing description');
    cy.get('#submit').should('not.be.disabled');
  });

  it('should disable submit button when only title is added', () => {
    cy.get('input').type('what a beautiful title');
    cy.get('#submit').should('be.disabled');
  });

  it('should add new idea', () => {
    cy.get('input').type('what a beautiful title');

    cy.get('#description').as('editor');
    cy.get('@editor').type('such an amazing description');

    cy.get('#submit').click();
    cy.url().should('include', '/');
    cy.get('conidea-idea-feed conidea-idea-card #card-title').should(
      'contain',
      'what a beautiful title',
    );
    cy.get('conidea-idea-feed conidea-idea-card #card-description').should(
      'contain',
      'such an amazing description',
    );
  });
});
