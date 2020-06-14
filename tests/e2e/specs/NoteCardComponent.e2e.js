import { expect } from "chai";

describe("Home Page", () => {
  const noteCardsSelector = ".note-card";
  const loadedNoteSelector = `${noteCardsSelector}.loaded-note`;
  const newNoteSelector = `${noteCardsSelector}.new-note`;

  beforeEach(() => {
    cy.visit("/");
    cy.wait(2000);
  });

  it("Has a header bar", () => {
    cy.contains("#header-bar .title", "Notes App");
  });

  it("Has note cards loaded", () => {
    cy.get(noteCardsSelector).then(noteCards => {
      const titleInput = noteCards.eq(0).find(".title-input");
      const bodyInput = noteCards.eq(0).find(".body-input");

      expect(titleInput.length).to.equal(1);
      expect(bodyInput.length).to.equal(1);
    });
  });

  it("First card is new note", () => {
    cy.get(noteCardsSelector)
      .eq(0)
      .then(firstNoteCard => {
        const buttons = firstNoteCard.find("button");
        const text = buttons.eq(0).text();
        expect(buttons).to.have.length(1);
        expect(text).to.include("Save");
      });

    cy.get(newNoteSelector)
      .eq(0)
      .then(newNotes => {
        expect(newNotes).to.have.length(1);
      });
  });

  it("should load second note with update, delete, and view full note buttons", () => {
    cy.get(noteCardsSelector)
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

  it("should navigate to full note page and back", () => {
    const linkSelector = `${loadedNoteSelector} .see-full-note-link p`;

    cy.get(linkSelector)
      .eq(0)
      .then(loadedNoteCardLink => {
        loadedNoteCardLink.click();
      });
    cy.wait(500);

    cy.location().should(loc => {
      const re = new RegExp(/\/note\/\d+/);
      expect(loc.pathname).to.match(re);
    });

    cy.wait(500);
    cy.get(linkSelector)
      .eq(0)
      .then(loadedNoteCardLink => {
        loadedNoteCardLink.click();
      });
    cy.wait(500);
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/");
    });
  });

  it("should add a new note on save", () => {
    let initialNoteCardCount;
    cy.get(loadedNoteSelector).then(loadedCards => {
      initialNoteCardCount = loadedCards.length;
    });
    cy.get(`${newNoteSelector} .title-input`).type(
      "Cypress Test: Inserting Test Title",
    );
    cy.get(`${newNoteSelector} .body-input`).type(
      "Cypress Test: Inserting Test Body",
    );
    cy.get(`${newNoteSelector} .save-btn`).click();
    cy.wait(500);
    cy.get(loadedNoteSelector).then(loadedCards => {
      expect(loadedCards.length).to.eq(initialNoteCardCount + 1);
    });
  });

  it("should remove note from list on delete", () => {
    let initialNoteCardCount;
    cy.get(loadedNoteSelector).then(loadedCards => {
      initialNoteCardCount = loadedCards.length;
      loadedCards
        .eq(0)
        .find(".delete-btn")
        .click();
    });

    cy.wait(500);

    cy.get(loadedNoteSelector).then(loadedCards => {
      expect(loadedCards.length).to.eq(initialNoteCardCount - 1);
    });
  });
});
