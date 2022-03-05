describe("searches for, adds, removes and resets universities", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.contains("Universities 0").click();
    cy.get("input").should("exist");
    cy.intercept("GET", "http://universities.hipolabs.com/*", {
      fixture: "universities.json",
    });
  });
  it("types in a query and displays universities", () => {
    cy.get("input").type("toronto"); // intercepted and output from json
    cy.contains("University of Toronto");
  });

  it("searches for universities, selects one and deselects it", () => {
    cy.get("input").type("toronto"); // intercepted and output from json
    cy.contains("University of Toronto").click();
    cy.get('li[aria-selected="true"]')
      .should("contain.text", "University of Toronto")
      .click()
      .should("have.attr", "aria-selected", "false");
  });

  it("searches for universities, selects couple, resets input and the selected should remain. After clicking they disappear", () => {
    cy.get("input").type("toronto"); // intercepted and output from json
    cy.contains("University of Toronto, Scarborough").click();
    cy.contains("University of Toronto, Mississauga").click();
    cy.get("input").clear();

    cy.get('li[aria-selected="true"]:first')
      .should("contain.text", "Scarborough")
      .click()
      .should("not.contain.text", "Scarborough");
  });

  it("searches for universities, selects couple, then after the reset button is pressed they are all deselected and input is reset", () => {
    cy.get("input").type("toronto"); // intercepted and output from json
    cy.get('li[aria-selected="true"]').should("not.exist");
    cy.get("li").click({ multiple: true });
    cy.get('li[aria-selected="true"]');
    cy.contains("Reset").click();
    cy.get('li[aria-selected="true"]').should("not.exist");
    cy.get("li").should("not.exist");
    cy.get("input").should("have.value", "");
  });
});
