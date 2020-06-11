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

@Component({
  components: {},
})
export default class Home extends Vue {
  /** PROPERTIES ------------------------- */
  @Prop({ type: String, default: "Title" }) noteTitle!: string;

  /** PUBLIC PROPERTIES------------------- */
  // public !: string;
  /** PUBLIC METHODS --------------------- */

  /** LIFECYCLE HOOKS  ------------------- */
  // beforeCreate(): void {}
  // created(): void {}
  // beforeMount(): void {}
  // mounted(): void {
  //   console.log(process.env.NODE_ENV);
  // }
  // beforeDestroy(): void {}
  // destroyed(): void {}
  // beforeUpdate(): void {}
  // updated(): void {}

  /** PRIVATE PROPERTIES ----------------- */

  /** PRIVATE METHODS -------------------- */
}
</script>

<style lang="scss" scoped></style>
