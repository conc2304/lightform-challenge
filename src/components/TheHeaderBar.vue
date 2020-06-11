<template lang="pug">
  v-app-bar.header-bar( app dark)
    .d-flex.align-center
      v-img(
        alt="Lightform Logo"
        class="shrink mr-2"
        contain
        min-width="100"
        src="https://luxcapital.com/wp-content/uploads/2017/03/logo-lockup-2x-600x234.png"
        width="300"
      )
      v-spacer
      .title Notes App
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class TheHeaderBar extends Vue {
  /** PROPERTIES ------------------------- */
  /** PUBLIC PROPERTIES------------------- */
  /** PUBLIC METHODS --------------------- */
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

<style lang="scss">
.header-bar {
  @include linear-gradient-brand-grey;
}

.title {
  @include poppins-medium($color-brand-gray-base, 24px);
  text-align: center;
}
</style>
