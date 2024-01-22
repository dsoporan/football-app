describe("Football App = HOME", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("checks home items", () => {
    cy.get('[data-testid="navbar-title"]')
      .should("exist")
      .should("contain", "Football APP");

    cy.get('[data-testid="select-country"]').should("exist");
    cy.get('[data-testid="select-team"]').should("exist");

    cy.get("#select-country-options").click();
    cy.get('[aria-labelledby="select-country"]')
      .should("exist")
      .within(() => {
        cy.get("li").first().click();
      });

    cy.get("#select-team-options").click();
    cy.get('[aria-labelledby="select-team"]')
      .should("exist")
      .within(() => {
        cy.get("li").first().click();
      });
    cy.get('[data-testid="team-details-container"]')
      .should("exist")
      .should("contain", "Elche")
      .should("contain", "1923")
      .should("contain", "Estadio Manuel Martínez Valero");

    cy.get('[data-testid="favourite-players-containers"]')
      .should("exist")
      .should("contain", "Favourite Players:");
  });
});
