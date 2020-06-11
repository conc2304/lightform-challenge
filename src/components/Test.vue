<template lang="pug">
  div.test-wrapper
    p {{ propValue }}
    p#count {{ count }}
    button( @click="increment") Increment
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Test extends Vue {
  /** PROPERTIES ------------------------- */
  @Prop({ type: String, default: "TEST" }) propValue!: string;

  /** PUBLIC PROPERTIES------------------- */
  public count = 0;

  /** PUBLIC METHODS --------------------- */

  public increment(): void {
    this.count++;
  }

  /** LIFECYCLE HOOKS  ------------------- */
  // beforeCreate(): void {}
  // created(): void {}
  // beforeMount(): void {}
  mounted(): void {
    console.log(process.env.NODE_ENV);
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
// $text-color: $color-brand-primary-black-text;

// p {
//   @include noto-sans-light($text-color, 2rem);
//   @include linear-gradient-brand-grey;
// }
</style>
