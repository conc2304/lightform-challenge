<template lang="pug">
    .notebook( ref="notebook" v-if="notes.length > 0 || loading")
      v-container( fluid)
        v-col( cols="12")
          v-row( 
            align="end"
            justify="center"
          )
            NoteCardComponent()
            NoteCardComponent(
              v-for="(note, i) in notes" 
              :key="i" 
              :note="note"
              @note_deleted="handleDeletedNote"
              @note_saved="handleAddedNote"
            )
            
    .no-notes-wrapper( v-else) 
      h2 You currently have no notes.  Why don't you start a new one.
      .new-note
        NoteCardComponent()
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NoteCardComponent from "@/components/NoteCardComponent.vue";
import NoteFetcher from "@/services/NoteFetcher.service";
import { NoteObject } from "@/types";
import { AxiosResponse } from "axios";

@Component({
  components: {
    NoteCardComponent,
  },
})
export default class Home extends Vue {
  /** PROPERTIES ------------------------- */
  @Prop({ type: String, default: "Title" }) noteTitle!: string;

  /** PUBLIC PROPERTIES------------------- */
  public notes: Array<any> = [];
  public error = false;
  public loading = true;
  public errorMsg = "";
  public noteRequestLimit = 3;
  public nextRequestNotesPage = 1;
  public totalNotesAvailable = 0;

  /** PUBLIC METHODS --------------------- */

  public handleDeletedNote(noteId: string): void {
    for (let i = 0; i < this.notes.length; i++) {
      const note = this.notes[i];
      console.log(note);
      if (note.id === Number(noteId)) {
        this.notes.splice(i, 1);
      }
    }
  }

  public handleAddedNote(note: NoteObject): void {
    this.notes.push(note);
  }

  /** LIFECYCLE HOOKS  ------------------- */
  // beforeCreate(): void {}
  created(): void {
    this.getNotes();
  }
  // beforeMount(): void {}
  mounted(): void {
    this.loading = true;
    this.fillNotebookPage();
    this.scroll();
  }
  // beforeDestroy(): void {}
  // destroyed(): void {}
  // beforeUpdate(): void {}
  // updated(): void {}

  /** PRIVATE PROPERTIES ----------------- */

  /** PRIVATE METHODS -------------------- */
  private appendNotes(response: AxiosResponse): void {
    // concatting and setting to dedupe the array of notes
    const newNotes = response.data._embedded.notes;
    const allNotes = this.notes.concat(newNotes);
    const set = new Set(allNotes);
    this.notes = Array.from(set);
  }

  private getNotes(): void {
    NoteFetcher.getListNotes(this.nextRequestNotesPage, this.noteRequestLimit)
      .then(response => {
        console.log(response);
        this.appendNotes(response);
        this.totalNotesAvailable = response.data.total;
        this.nextRequestNotesPage++;
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = "Unable to retrieve your notes.";
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private scroll(): void {
    window.onscroll = () => {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        this.getNotes();
      }
    };
  }

  private fillNotebookPage(): void {
    const notebookHeight = this.$el.clientHeight;
    const windowHeight = window.innerHeight;

    console.log(notebookHeight, windowHeight);
    if (notebookHeight < windowHeight * 0.66) {
      this.getNotes();
    }
  }
}
</script>

<style lang="scss">
.no-notes-wrapper {
  @include noto-sans-light($color-brand-red-base, 22px);
  text-align: center;
}
</style>
