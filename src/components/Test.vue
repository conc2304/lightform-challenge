<template lang="pug">
  p {{ propValue }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Test extends Vue {
  /** PROPERTIES ------------------------- */
  @Prop({ type: String, default: "TEST" }) propValue!: string;

  /** COMPONENT DATA --------------------- */

  /** LIFECYCLE HOOKS  ------------------- */
  // beforeCreate(): void {}
  // created(): void {}
  // beforeMount(): void {}
  // mounted(): void {}
  // beforeDestroy(): void {}
  // destroyed(): void {}
  // beforeUpdate(): void {}
  // updated(): void {}

  /** PRIVATE PROPERTIES ----------------- */

  /** PRIVATE METHODS -------------------- */
}
</script>

<style lang="scss" scoped>
p {
  color: $test-color;
}
</style>
