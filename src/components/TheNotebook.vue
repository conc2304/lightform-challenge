<template lang="pug">
    .notebook( 
      ref="notebook" 
      v-if="notes.length > 0 || loading"
    )
      v-container( fluid)
        v-col( cols="12")
          v-row( 
            align="end"
            justify="center"
          )
            NoteCardComponent(
              :inNotebook="true"
              @note_saved="handleAddedNote"
            )
            NoteCardComponent(
              v-for="(note, i) in notes" 
              :key="i" 
              :note="note"
              :inNotebook="true"
              @note_deleted="handleDeletedNote"
            )
        v-col.end-of-notes( 
          v-if="lastNoteReached"
          cols="12"
        )
          h4 Sorry #[br] Those are all of your notes
          p( @click="scrollToTop") go back to top

            
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
  public notes: Array<NoteObject> = [];
  public error = false;
  public loading = true;
  public errorMsg = "";
  public noteRequestLimit = 5;
  public nextRequestNotesPage = 1;
  public totalNotesAvailable = 0;

  /** PUBLIC METHODS --------------------- */
  public handleDeletedNote(noteId: string): void {
    for (let i = 0; i < this.notes.length; i++) {
      const note = this.notes[i];
      if (note.id === Number(noteId)) {
        this.notes.splice(i, 1);
      }
    }
    this.fillNotebookPage();
  }

  public handleAddedNote(note: NoteObject): void {
    this.notes.unshift(note);
  }

  /** LIFECYCLE HOOKS  ------------------- */
  created(): void {
    this.getNotes();
  }

  mounted(): void {
    this.loading = true;
    this.scroll();
    this.fillNotebookPage();
  }

  /** PRIVATE PROPERTIES ----------------- */

  /** PRIVATE METHODS -------------------- */
  public get lastNoteReached(): boolean {
    return this.notes.length === this.totalNotesAvailable;
  }

  private appendNotes(response: AxiosResponse): void {
    // concatting and setting to dedupe the array of notes
    const newNotes = response.data._embedded.notes;
    const allNotes = this.notes.concat(newNotes);
    const sortedNotes: Array<NoteObject> = allNotes.sort((n1, n2) => {
      if (n1.id < n2.id) return -1;
      if (n1.id > n2.id) return 1;
      return 0;
    });
    const set = new Set(sortedNotes);
    this.notes = Array.from(set);
  }

  private getNotes(): void {
    NoteFetcher.getListNotes(this.nextRequestNotesPage, this.noteRequestLimit)
      .then(response => {
        this.appendNotes(response);
        this.totalNotesAvailable = response.data.total;
        this.nextRequestNotesPage++;
      })
      .catch(() => {
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

  private scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  private fillNotebookPage(): void {
    const notebookHeight = this.$el.clientHeight;
    const windowHeight = window.innerHeight;

    if (this.nextRequestNotesPage === 1) {
      this.nextRequestNotesPage = 2;
    }

    if (notebookHeight < windowHeight * 0.68) {
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

.end-of-notes {
  text-align: center;

  h4 {
    @include poppins-regular($color-brand-text-gray, 18px);
    margin: 0 auto;
  }

  p {
    @include poppins-medium($color-brand-blue-light, 14px);
    margin-left: 10px;

    &:hover {
      color: $color-brand-blue-base;
      cursor: pointer;
    }
  }
}
</style>
