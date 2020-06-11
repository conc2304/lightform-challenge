<template lang="pug">
  v-app
    TheHeaderBar
    v-content
      .notes-wrapper( v-if="notes.length > 0")
        v-container( fluid)
          v-cols( cols="12")
            v-row( 
              align="end"
              justify="center"
            )

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
import axios from "axios";
import TheHeaderBar from "@/components/TheHeaderBar.vue";
import NoteComponent from "@/components/NoteComponent.vue";

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
  }),

  mounted(): void {
    axios
      .get("http://note.dev.cloud.lightform.com/notes")
      .then(response => {
        console.log(response.data);
        console.log(typeof response.data);

        this.notes = response.data._embedded.notes;
      })
      .catch(error => {
        console.log(error);
        this.errorMsg = "Unable to retrieve your notes.";
        this.error = true;
      });
  },
});
</script>

<style lang="scss">
.no-notes-wrapper {
  @include noto-sans-light($color-brand-red-base, 22px);
  text-align: center;
}
</style>
