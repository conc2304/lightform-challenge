<template lang="pug">
  v-card.note-card( 
    v-if="note"
    class="ma-3 pa-6"
    outlined
  )
    v-form( v-model="valid")
      v-container
        NoteTitle( :noteTitle="note.title")
        NoteBody( :noteBody="note.body")
        v-card-actions
          v-btn#save-btn(
            @click="handleSave()"
            :disabled="saveDisabled"
            :class="isExistingNote ? 'update' : 'save'"
          ) {{ isExistingNote ? "Update" : "Save"}}
          v-btn#delete-btn(
            color="colorBrandRedBase"
            @click="deleteNote(note.id)"
            :disabled="deleteDisabled"
          ) Delete
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NoteTitle from "@/components/NoteTitle.vue";
import NoteBody from "@/components/NoteBody.vue";
import { NoteObject } from "@/types";
import NoteFetcher from "@/services/NoteFetcher.service";
import { test } from "mocha";

@Component({
  components: {
    NoteTitle,
    NoteBody,
  },
})
export default class Test extends Vue {
  /** PROPERTIES ------------------------- */
  @Prop({
    type: Object,
    default: () => ({ title: "Title", body: "Take a note ...", id: -1 }),
  })
  note!: NoteObject;

  /** PUBLIC PROPERTIES------------------- */
  public valid = true;
  public deleteDisabled = false;
  public saveDisabled = false;
  public errorMsgs: Array<string> = [];
  public error = false;

  /** PUBLIC METHODS --------------------- */
  public get isExistingNote(): boolean {
    return this.note.id > 0;
  }

  public handleSave(): void {
    if (this.note.id == -1) this.saveNote(this.note);
    else this.updateNote(this.note);
  }

  private saveNote(note: NoteObject): void {
    this.saveDisabled = true;
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
        this.saveDisabled = false;
        this.$emit("note_saved", note);
      });
  }

  private updateNote(note: NoteObject): void {
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
        this.deleteDisabled = false;
        this.$emit("note_updated", note.id);
      });
  }

  private deleteNote(noteId: number): void {
    this.deleteDisabled = true;

    NoteFetcher.deleteListNote(noteId)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        this.errorMsgs.push("Unable to retrieve your notes.");
        this.error = true;
        throw error;
      })
      .finally(() => {
        this.deleteDisabled = false;
        this.$emit("note_deleted", noteId);
      });
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
}
</script>

<style lang="scss" scoped>
.note-card {
  // border: 1px solid $color-brand-white-base;
  border-radius: 3px;
  // max-width: 200px;
  margin: 20px;
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
