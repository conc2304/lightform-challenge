// ==== Library Imports =======================================================
import Vue from "vue";
import chai, { expect } from "chai";
import sinon from "sinon";
import spies from "chai-spies";
chai.use(spies);
// import sinonChai from "sinon-chai";
import { shallowMount, Wrapper } from "@vue/test-utils";

// ==== App Imports =======================================================
import NoteCardComponent from "@/components/NoteCardComponent.vue";
// import { NoteObject } from "@/types";

describe("NoteCardComponent.vue", () => {
  let wrapper: Wrapper<Vue>;

  function mountComponentWithProperties(componentProps: Record<string, any>): void {
    wrapper = shallowMount(NoteCardComponent, {
      propsData: componentProps,
    });
  }

  it("should create the component", async () => {
    const componentProps = {};
    mountComponentWithProperties(componentProps);
    expect(wrapper).to.be.ok;
  });

  it("should initialize the note with no properties as not savable", async () => {
    // GIVEN
    const componentProps = {};
    mountComponentWithProperties(componentProps);
    wrapper.setData({
      valid: false,
    });

    // WHEN
    await Vue.nextTick();

    // THEN
    expect((wrapper.vm as any).noteIsSavable).to.be.false;
  });

  it("should initialize the a valid note as savable", async () => {
    // GIVEN
    const componentProps = {};
    mountComponentWithProperties(componentProps);

    // WHEN
    await Vue.nextTick();

    // THEN
    expect((wrapper.vm as any).noteIsSavable).to.be.true;
  });

  it("should set 'isExistingNote' to FALSE if note is new", async () => {
    // GIVEN
    const componentProps = {};
    mountComponentWithProperties(componentProps);

    // WHEN

    // THEN
    expect((wrapper.vm as any).isExistingNote).to.be.false;
  });

  it("should set 'isExistingNote' to FALSE if note HAS NO note properties", async () => {
    // GIVEN
    const componentProps = {};
    mountComponentWithProperties(componentProps);

    // WHEN
    // THEN
    expect((wrapper.vm as any).isExistingNote).to.be.false;
  });

  it("should set 'isExistingNote' to TRUE if note HAS note properties", async () => {
    // GIVEN
    const componentProps = {
      title: "THIS IS A TITLE",
      body: "THIS IS MY BODY",
      id: 2010,
    };
    mountComponentWithProperties(componentProps);
    wrapper.setData({
      note: componentProps,
    });

    // WHEN

    // THEN
    expect((wrapper.vm as any).isExistingNote).to.be.true;
  });

  it.only("should call 'handleSave' on save button click", async () => {
    // GIVEN
    const note = {
      title: "THIS IS A TITLE",
      body: "THIS IS MY BODY - isn't it rad",
      id: 2010,
    }

    mountComponentWithProperties(note);
    const spy = chai.spy((wrapper.vm as any).handleSave)
    const vm = wrapper.vm as any
    sinon.spy(vm, "handleSave")
    wrapper.setData({
      note: note,
      valid: true,
      saving: false,
    });


    // WHEN 
    const saveButtonEl = wrapper.find("#save-btn");
    saveButtonEl.vm.$emit("click");
    await Vue.nextTick();

    // THEN
    expect(spy).to.have.been.called;
  });
});
