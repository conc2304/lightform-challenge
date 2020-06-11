<template lang="pug">
  v-row
    v-col(
      col="12"
    )
      v-textarea(
        v-model="noteBody"
        name="input-7-4"
        label="Take a note ..."
        solo
        dark
        required
      )
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Test extends Vue {
  /** PROPERTIES ------------------------- */
  @Prop({ type: String, default: "Take a note ..." }) noteBody!: string;

  /** PUBLIC PROPERTIES------------------- */
  // public noteBody!: string;
  /** PUBLIC METHODS --------------------- */

  /** LIFECYCLE HOOKS  ------------------- */
  // beforeCreate(): void {}
  // created(): void {}¬
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
