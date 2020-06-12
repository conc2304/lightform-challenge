<template lang="pug">
  .notebook-wrapper
    TheNotebook
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheNotebook from "@/components/TheNotebook.vue";

@Component({
  components: {
    TheNotebook,
  },
})
export default class Home extends Vue {
  /** PROPERTIES ------------------------- */
  /** PUBLIC PROPERTIES------------------- */
  /** PUBLIC METHODS --------------------- */
  /** LIFECYCLE HOOKS  ------------------- */
  // beforeCreate(): void {}
  // created(): void {}
  // beforeMount(): void {}
  // mounted(): void {  }
  // beforeDestroy(): void {}
  // destroyed(): void {}
  // beforeUpdate(): void {}
  // updated(): void {}
  /** PRIVATE PROPERTIES ----------------- */
  /** PRIVATE METHODS -------------------- */
}
</script>

<style lang="scss"></style>
