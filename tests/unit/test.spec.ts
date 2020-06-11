// ==== Library Imports =======================================================
import Vue from "vue";
import { expect } from "chai";
import { shallowMount, Wrapper } from "@vue/test-utils";

// ==== App Imports =======================================================
import Test from "@/components/Test.vue";

describe("Test.vue", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(Test);
  });

  it("creates component", async () => {
    console.log(process.env.NODE_ENV === "test");

    expect(wrapper).to.be.ok;
  });

  it("increments count when button is clicked", async () => {
    wrapper.find("button").trigger("click");
    await Vue.nextTick();
    const count = wrapper.find("#count").text();
    expect(count).to.equal("1");
  });
});
