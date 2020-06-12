// ==== Library Imports =======================================================
import Vue from "vue";
import { expect } from "chai";
import { shallowMount, Wrapper } from "@vue/test-utils";

// ==== App Imports =======================================================
import NoteCardComponent from "@/components/NoteCardComponent.vue";

describe("NoteCardComponent.vue", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(NoteCardComponent);
  });

  it("creates component", async () => {
    expect(wrapper).to.be.ok;
  });
});
