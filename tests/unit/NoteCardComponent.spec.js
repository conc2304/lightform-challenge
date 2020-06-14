// ==== Library Imports =======================================================
import Vue from "vue";
import chai, { expect } from "chai";
import sinon from "sinon";
import spies from "chai-spies";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";

// ==== App Imports =======================================================
import NoteCardComponent from "@/components/NoteCardComponent.vue";

describe.only("JS:NoteCardComponent.vue", () => {
  const router = new VueRouter();
  const localVue = createLocalVue();
  let wrapper;

  localVue.use(VueRouter);
  chai.use(spies);

  function mountComponentWithProperties(componentProps) {
    wrapper = shallowMount(NoteCardComponent, {
      propsData: componentProps,
      localVue,
      router,
    });
  }

  it("should create the component", async () => {
    // GIVEN
    const componentProps = {};
    mountComponentWithProperties(componentProps);

    // WHEN

    // THEN
    expect(wrapper).to.be.ok;
    expect(wrapper.attributes("class")).to.include("new-note");
    expect(wrapper.attributes("class")).to.include("full-page-note");
  });

  it("should created a preloaded note", async () => {
    const testNote = {
      title: "This is a title",
      body: "Here is the body",
      id: 300,
    };
    const componentProps = {
      note: testNote,
      inNotebook: true,
    };
    mountComponentWithProperties(componentProps);

    // WHEN

    // THEN
    expect(wrapper.attributes("class")).to.include("loaded-note");
    expect(wrapper.attributes("class")).to.include("tile");
    expect(wrapper.vm.isExistingNote).to.be.true;
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
    expect(wrapper.vm.noteIsSavable).to.be.false;
  });

  it("should initialize the a valid note as savable", async () => {
    // GIVEN
    const componentProps = {};
    mountComponentWithProperties(componentProps);

    // WHEN
    await Vue.nextTick();

    // THEN
    expect(wrapper.vm.noteIsSavable).to.be.true;
  });

  it("should set 'isExistingNote' to TRUE if note HAS note properties", async () => {
    // GIVEN
    const testNote = {
      title: "THIS IS A TITLE",
      body: "THIS IS MY BODY",
      id: 2010,
    };
    mountComponentWithProperties(testNote);
    wrapper.setProps({
      note: testNote,
    });

    // WHEN

    // THEN
    expect(wrapper.vm.isExistingNote).to.be.true;
  });

  it("should call 'handleSave' on save button click", async () => {
    // GIVEN
    const note = {
      title: "THIS IS A TITLE",
      body: "THIS IS MY BODY - isn't it rad",
      id: 2010,
    };

    mountComponentWithProperties(note);
    const spy = chai.spy(wrapper.vm.handleSave);
    const vm = wrapper.vm;
    sinon.spy(vm, "handleSave");

    // WHEN
    const saveButtonEl = wrapper.find(".save-btn");
    saveButtonEl.vm.$emit("click");
    await Vue.nextTick();

    // THEN
    expect(spy).to.have.been.called;
  });

  it("should call 'updateNote' on save button click", async () => {
    // GIVEN
    const note = {
      title: "THIS IS A TITLE",
      body: "THIS IS MY BODY - isn't it rad",
      id: 2010,
    };

    mountComponentWithProperties(note);
    const spy = chai.spy(wrapper.vm.updateNote);
    const vm = wrapper.vm;
    sinon.spy(vm, "updateNote");

    // WHEN
    const saveButtonEl = wrapper.find(".save-btn");
    saveButtonEl.vm.$emit("click");
    await Vue.nextTick();

    // THEN
    expect(spy).to.have.been.called;
  });

  it.only("should call 'saveNote' on save button click", async () => {
    // GIVEN
    const spy = sinon.spy();

    const note = {
      title: "THIS IS A TITLE",
      body: "THIS IS MY BODY - isn't it rad",
      id: -1,
    };

    const componentProps = {
      note: note,
      propsData: {
        saveNote: spy,
      },
    };

    mountComponentWithProperties(componentProps);
    const vm = wrapper.vm;

    // const spy = chai.spy(wrapper.vm.saveNote);

    // sinon.spy(vm, "saveNote");

    // WHEN
    const saveButtonEl = wrapper.find(".save-btn");
    saveButtonEl.vm.$emit("click");
    await Vue.nextTick();

    // THEN
    expect(spy).to.have.been.called;
  });

  it.only("should go to full page note", async () => {
    // expect(wrapper.vm.$refs.form.validate()).to.equal(false);
  });
});
