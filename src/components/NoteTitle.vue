<template lang="pug">
  v-row
    v-col(
      col="12"
    )
      v-text-field(
        v-model="noteTitle"
        label="Title"
        required
        dark
      )
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class NoteTitle extends Vue {
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
