<template lang="pug">
  v-card.note-card( 
    v-if="note"
    class="ma-3 pa-6"
    outlined
  )
    v-form( 
      ref="form"
      v-model="valid"
    )
      v-container
        v-text-field(
          v-model="note.title"
          :rules="titleRules"
          label="Title"
          required
          dark
        )
        v-textarea(
          v-model="note.body"
          :rules="bodyRules"
          label="Make a note ..."
          solo
          dark
          required
        )
        v-card-actions.note-actions
          v-btn#save-btn(
            @click="handleSave()"
            :disabled="!noteIsSavable"
            :class="isExistingNote ? 'update' : 'save'"
          ) {{ isExistingNote ? "Update" : "Save"}}
          v-btn#delete-btn(
            v-if="isExistingNote"
            color="colorBrandRedBase"
            @click="deleteNote(note.id)"
            :disabled="deleting"
          ) Delete
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { NoteObject } from "@/types";
import NoteFetcher from "@/services/NoteFetcher.service";

@Component({
  components: {},
})
export default class NoteCardComponent extends Vue {
  /** PROPERTIES ------------------------- */
  @Prop({
    type: Object,
    default: () => ({ title: "", body: "", id: -1 }),
  })
  note!: NoteObject;

  /** PUBLIC PROPERTIES------------------- */
  public valid = true;
  public saving = false;
  public deleting = false;
  public errorMsgs: Array<string> = [];
  public error = false;

  public titleRules = [
    (v: string) => !!v || "Title is required",
    (v: string) =>
      (v && v.length >= 5) || "Title must be more than 4 characters",
  ];

  public bodyRules = [
    (v: string) => !!v || "Note body is required",
    (v: string) =>
      (v && v.length >= 10) || "Note body must be more than 10 characters",
  ];

  /** PUBLIC METHODS --------------------- */
  public get isExistingNote(): boolean {
    return this.note.id > 0;
  }

  public get noteIsSavable(): boolean {
    return this.valid && !this.saving;
  }

  public handleSave(): void {
    const test = true;
    if (this.note.id == -1) {
      this.saveNote(this.note);
    } else {
      this.updateNote(this.note);
    }
  }

  // public saveNote(): void {}

  /** LIFECYCLE HOOKS  ------------------- */
  // beforeCreate(): void {}
  // created(): void {}
  // beforeMount(): void {}
  mounted(): void {
    // console.log(process.env.NODE_ENV);
  }
  // beforeDestroy(): void {}
  // destroyed(): void {}
  // beforeUpdate(): void {}
  // updated(): void {}

  /** PRIVATE PROPERTIES ----------------- */

  /** PRIVATE METHODS -------------------- */
  private saveNote(note: NoteObject): void {
    this.saving = true;
    NoteFetcher.saveNote(note)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        this.errorMsgs.push("Unable to retrieve your notes.");
        this.error = true;
        throw error;
      })
      .finally(() => {
        this.saving = false;
        this.$emit("note_saved", note);
      });
  }

  private updateNote(note: NoteObject): void {
    this.saving = true;
    NoteFetcher.updateNote(note)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        this.errorMsgs.push("Unable to retrieve your notes.");
        this.error = true;
        throw error;
      })
      .finally(() => {
        this.saving = false;
        this.$emit("note_updated", note.id);
      });
  }

  private deleteNote(noteId: number): void {
    this.deleting = true;
    const noteIdString = noteId.toString();
    NoteFetcher.deleteListNote(noteIdString)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        this.errorMsgs.push("Unable to retrieve your notes.");
        this.error = true;
        throw error;
      })
      .finally(() => {
        this.deleting = false;
        this.$emit("note_deleted", noteId);
      });
  }
}
</script>

<style lang="scss" scoped>
.note-card {
  border: 1px solid $color-brand-gray-light;
  border-radius: 5px;
  margin: 20px;
}

.note-actions {
  justify-content: center;
}
button#save-btn {
  &.update {
    background-color: $color-brand-purple-base;
    &:hover {
      background-color: $color-brand-purple-dark;
    }
  }
  &.save {
    background-color: $color-brand-green-base;
    &:hover {
      background-color: $color-brand-green-light;
    }
  }
}
</style>
