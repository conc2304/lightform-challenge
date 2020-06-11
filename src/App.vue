<template lang="pug">
  v-app
    TheHeaderBar
    v-content
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
import Vue from "vue";
import TheHeaderBar from "@/components/TheHeaderBar.vue";
import NoteComponent from "@/components/NoteComponent.vue";
import NoteFetcher from "@/services/NoteFetcher.service";
import { AxiosResponse } from "axios";

export default Vue.extend({
  name: "App",

  components: {
    TheHeaderBar,
    NoteComponent,
  },

  data: () => ({
    noteResponse: {},
    notes: [],
    error: false,
    errorMsg: "",
    loading: true,
    limit: 3,
    nextPageOfNotesToGet: 1,
    totalNotesAvailable: 0,
  }),

  mounted(): void {
    this.loading = true;

    NoteFetcher.getListNotes(this.nextPageOfNotesToGet, this.limit)
      .then(response => {
        console.log(response);
        this.notesConcat(response);
        this.totalNotesAvailable = response.data.total;
        this.nextPageOfNotesToGet++;
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = "Unable to retrieve your notes.";
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
      });
  },

  methods: {
    notesConcat(response: AxiosResponse): void {
      const newNotes = response.data._embedded.notes;
      const allNotes = this.notes.concat(newNotes);
      const set = new Set(allNotes);
      this.notes = Array.from(set);
    },
  },
});
</script>

<style lang="scss">
.no-notes-wrapper {
  @include noto-sans-light($color-brand-red-base, 22px);
  text-align: center;
}
</style>
