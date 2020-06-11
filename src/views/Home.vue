<template lang="pug">
    .notes-wrapper( v-if="notes.length > 0 || loading")
      v-container( fluid)
        v-col( cols="12")
          v-row( 
            align="end"
            justify="center"
          )
            NoteComponent()
            NoteComponent(
              v-for="(note, i) in notes" 
              :key="i" 
              :note="note"
            )
            
    .no-notes-wrapper( v-else) 
      h2 You currently have no notes.  Why don't you start a new one.
      .new-note
        NoteComponent()
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NoteComponent from "@/components/NoteComponent.vue";
import NoteFetcher from "@/services/NoteFetcher.service";
import { AxiosResponse } from "axios";

@Component({
  components: {
    NoteComponent,
  },
})
export default class Home extends Vue {
  /** PROPERTIES ------------------------- */
  @Prop({ type: String, default: "Title" }) noteTitle!: string;

  /** PUBLIC PROPERTIES------------------- */
  public notes: Array<object> = [];
  public error = false;
  public loading = true;
  public errorMsg = "";
  public noteRequestLimit = 3;
  public nextRequestNotesPage = 1;
  public totalNotesAvailable = 0;
  /** PUBLIC METHODS --------------------- */

  /** LIFECYCLE HOOKS  ------------------- */
  // beforeCreate(): void {}
  // created(): void {}
  // beforeMount(): void {}
  mounted(): void {
    this.loading = true;

    NoteFetcher.getListNotes(this.nextRequestNotesPage, this.noteRequestLimit)
      .then(response => {
        console.log(response);
        this.notesConcat(response);
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
  // beforeDestroy(): void {}
  // destroyed(): void {}
  // beforeUpdate(): void {}
  // updated(): void {}

  /** PRIVATE PROPERTIES ----------------- */

  /** PRIVATE METHODS -------------------- */
  private notesConcat(response: AxiosResponse): void {
    const newNotes = response.data._embedded.notes;
    const allNotes = this.notes.concat(newNotes);
    const set = new Set(allNotes);
    this.notes = Array.from(set);
  }
}
</script>

<style lang="scss">
.no-notes-wrapper {
  @include noto-sans-light($color-brand-red-base, 22px);
  text-align: center;
}
</style>