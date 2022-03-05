describe("opens and closes multiselect in all 3 ways", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.contains("Universities 0").click();
    cy.get("input").should("exist");
  });

  afterEach(() => {
    cy.contains("input").should("not.exist");
  });

  it("closes on click outside of the multiselect", () => {
    cy.get("body").click(0, 0);
  });

  it("closes when clicked again on the universities button", () => {
    cy.contains("Universities").click();
  });

  it("closes when Esc key is pressed and when not focused on the form", () => {
    cy.get("body").type("{esc}");
  });

  it("closes when Esc key is pressed and user is focused in the input field", () => {
    cy.get("input").focus().type("gibberish").type("{esc}");
  });
});
