// ==== Library Imports =======================================================
import Vue from "vue";
import { expect } from "chai";
import { shallowMount, Wrapper } from "@vue/test-utils";

// ==== App Imports =======================================================
import NoteCardComponent from "@/components/NoteCardComponent.vue";

describe("Test.vue", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(NoteCardComponent);
  });

  it("creates component", async () => {
    expect(wrapper).to.be.ok;
  });

  // it("increments count when button is clicked", async () => {
  //   wrapper.find("button").trigger("click");
  //   await Vue.nextTick();
  //   const count = wrapper.find("#count").text();
  //   expect(count).to.equal("1");
  // });
});
