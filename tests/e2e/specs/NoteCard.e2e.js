import { expect } from "chai";

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Has a header bar", () => {
    cy.contains("#header-bar .title", "Notes App");
  });

  it("Has note cards loaded", () => {
    cy.get(".note-card").then(noteCards => {
      const cardCount = Cypress.$(noteCards).length;
      expect(noteCards).to.have.length(cardCount);

      const titleInput = noteCards.eq(0).find("#title-input");
      expect(titleInput.length).to.equal(1);

      const bodyInput = noteCards.eq(0).find("#body-input");
      expect(bodyInput.length).to.equal(1);
    });
  });

  it("First card is new note", () => {
    cy.get(".note-card")
      .eq(0)
      .then(firstNoteCard => {
        const buttons = firstNoteCard.find("button");
        const text = buttons.eq(0).text();
        expect(buttons).to.have.length(1);
        expect(text).to.include("Save");
        // expect(firstNoteCard).to.have.class("new-note");
      });

    cy.get(".new-note")
      .eq(0)
      .then(newNotes => {
        expect(newNotes).to.have.length(1);
      });
  });

  it("Second card is a loaded note and has update, delete, and view full note buttons", () => {
    cy.wait(2000);
    cy.get(".note-card")
      .eq(1)
      .then(secondNoteCard => {
        const buttons = secondNoteCard.find("button");
        expect(buttons).to.have.length(2);

        const saveButtonText = buttons.eq(0).text();
        const deleteButtonText = buttons.eq(1).text();
        expect(saveButtonText).to.include("Update");
        expect(deleteButtonText).to.include("Delete");

        const link = secondNoteCard.find(".see-full-note-link");
        expect(link.length).to.equal(1);
        expect(link.eq(0).text()).to.equal("view full note");
      });
  });
});
