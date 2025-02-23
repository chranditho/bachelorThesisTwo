describe('IdeaFeedPage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the heading "Idea Feed"', () => {
    cy.get('#ideaFeedHeading').should('contain', 'Idea Feed');
  });

  it('should display add idea button', () => {
    cy.get('#navigateToAddPage').should('contain', 'add');
  });

  it('should navigate to add idea page on button click', () => {
    cy.get('#navigateToAddPage').click();
    cy.url().should('include', '/add');
  });

  it('should display settings button', () => {
    cy.get('#navigateToSettingsPage').should('contain', 'settings');
  });

  it('should navigate to settings page on button click', () => {
    cy.get('#navigateToSettingsPage').click();
    cy.url().should('include', '/settings');
  });

  it('should load and display a list of ideas', () => {
    cy.get('conidea-idea-feed').should('not.exist');
    cy.get('conidea-idea-feed', { timeout: 10000 }).should('exist');
  });

  it('should display at least one idea in the idea feed', () => {
    cy.get('conidea-idea-feed conidea-idea-card').should('have.length.gt', 0);
  });
});
