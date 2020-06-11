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
          v-btn(
            color="colorBrandGreenBase"
          ) Save
          v-btn(
            color="colorBrandRedBase"
          ) Delete
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NoteTitle from "@/components/NoteTitle.vue";
import NoteBody from "@/components/NoteBody.vue";

@Component({
  components: {
    NoteTitle,
    NoteBody,
  },
})
export default class Test extends Vue {
  /** PROPERTIES ------------------------- */
  // @Prop({ type: String, default: "Title" }) noteTitle!: string;
  // @Prop({ type: String, default: "Take a note ..." }) noteBody!: string;

  @Prop({ type: String, default: { title: "Title", body: "Take a note ..." } })
  note!: object;

  /** PUBLIC PROPERTIES------------------- */
  public valid = true;
  /** PUBLIC METHODS --------------------- */

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
</style>
