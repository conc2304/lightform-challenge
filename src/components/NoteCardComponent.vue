<template lang="pug">
  v-card.note-card( 
    v-if="note"
    outlined
    :class="[inNotebook ? 'tile ma-3 pa-6' : 'full-page-note']"
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

        .error-msg-wrapper
          .error-msg( v-if="error" ) {{ errorMsg }}

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
        .see-full-note-link 
          p(
            v-if="inNotebook && note.id > 0"
            @click="navigateToFullNote(note.id)"
          ) view full note
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
  @Prop({
    type: Boolean,
    default: false,
  })
  inNotebook!: boolean;

  /** PUBLIC PROPERTIES------------------- */
  public valid = true;
  public saving = false;
  public deleting = false;
  public errorMsg!: string;
  public error = false;

  public titleRules = [
    (v: string) => !!v || "Title is required",
    (v: string) =>
      (v && v.length >= 5) || "Title must be more than 4 characters",
  ];

  public bodyRules = [
    (v: string) => !!v || "Note body is required",
    (v: string) =>
      (v && v.length >= 10) || "Note must be more than 10 characters",
  ];

  /** PUBLIC METHODS --------------------- */
  public handleSave(): void {
    if (this.note.id == -1) {
      this.saveNote(this.note);
    } else {
      this.updateNote(this.note);
    }
  }

  public get isExistingNote(): boolean {
    return this.note.id > 0;
  }

  public get noteIsSavable(): boolean {
    return this.valid && !this.saving;
  }

  public navigateToFullNote(noteId: number) {
    this.$router.push({ name: "Note", params: { noteId: noteId.toString() } });
  }

  /** LIFECYCLE HOOKS  ------------------- */

  /** PRIVATE PROPERTIES ----------------- */

  /** PRIVATE METHODS -------------------- */
  private saveNote(note: NoteObject): void {
    this.saving = true;
    NoteFetcher.saveNote(note)
      .then()
      .catch(error => {
        const errorMsg = "Unable to save your note.";
        this.displayError(errorMsg);
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
      .then()
      .catch(error => {
        const errorMsg = "Unable to update your note.";
        this.displayError(errorMsg);
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
      .then()
      .catch(error => {
        const errorMsg = "Unable to delete this note.";
        this.displayError(errorMsg);
        throw error;
      })
      .finally(() => {
        this.deleting = false;
        this.$emit("note_deleted", noteId);
      });
  }

  private displayError(errorMessage: string): void {
    this.errorMsg = errorMessage;
    this.error = true;
    setTimeout(() => {
      this.errorMsg = "";
      this.error = false;
    }, 3000);
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
    background-color: $color-brand-blue-base;
    &:hover {
      background-color: $color-brand-blue-dark;
    }
  }
  &.save {
    background-color: $color-brand-green-base;
    &:hover {
      background-color: $color-brand-green-light;
    }
  }
}

.see-full-note-link {
  text-align: center;
  @include poppins-medium($color-brand-blue-light, 14px);
  margin: 10px auto 0;
  min-height: 24px;

  &:hover {
    color: $color-brand-blue-base;
    cursor: pointer;
  }
}

.error-msg-wrapper {
  height: 27px;
  text-align: center;
  @include noto-sans-light($color-brand-red-base, 16px);
  line-height: 27px;
  font-weight: bold;
}
</style>
