<template lang="pug">
  .note-page-wrapper
    NoteCardComponent(
      :note="noteInView"
      :inNotebook="false"
    )
    
    v-dialog( 
      v-model="error" 
      max-width="550"
    )
      v-card.error-dialog(
        color="$colorBrandUiBlack" 
        elevation="10"
      )
        v-card-title.headline Note Not Found
        v-card-text
          p.error-msg {{ errorMsg }}
          .error-btn-wrapper
            v-btn( 
              to="/"
              color="colorBrandBlueBase"
              large 
            ) Back to all of your notes

  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoteCardComponent from "@/components/NoteCardComponent.vue";
import NoteFetcher from "@/services/NoteFetcher.service";
import { NoteObject } from "@/types";

@Component({
  components: {
    NoteCardComponent,
  },
})
export default class NoteIdPage extends Vue {
  /** PROPERTIES ------------------------- */

  /** PUBLIC PROPERTIES------------------- */
  public noteInView: NoteObject = {
    title: "Loading",
    body: "Loading ....",
    id: 0,
  };
  public error = false;
  public loading = true;
  public errorMsg = "";
  /** PUBLIC METHODS --------------------- */

  /** LIFECYCLE HOOKS  ------------------- */
  mounted(): void {
    const noteId = this.$route.params.noteId.toString();

    NoteFetcher.retreiveNote(noteId)
      .then(response => {
        this.noteInView = response.data;
      })
      .catch(error => {
        console.warn(error);
        this.errorMsg = "Unable to retrieve this note.";
        this.error = true;
        this.noteInView = {
          title: "Not Available",
          body: "...",
          id: -1,
        };
      })
      .finally(() => {
        this.loading = false;
      });
  }

  /** PRIVATE PROPERTIES ----------------- */

  /** PRIVATE METHODS -------------------- */
}
</script>

<style lang="scss" scoped>
.note-page-wrapper {
  max-width: 900px;
  margin: 50px auto;
}

.error-dialog {
  padding: 20px;
}
.headline {
  background-color: $color-brand-red-base;
  @include poppins-medium();
}
.error-msg {
  margin: 20px 0;
  @include noto-sans-light($color-brand-white-base, 16px);
}
.error-btn-wrapper {
  text-align: center;
  margin: 32px auto 0;
}
</style>
