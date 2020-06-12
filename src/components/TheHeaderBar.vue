<template lang="pug">
  v-app-bar#header-bar( app dark)
    #header-content.d-flex.align-center
      v-img(
        alt="Lightform Logo"
        class="shrink mr-2"
        contain
        min-width="100"
        src="https://luxcapital.com/wp-content/uploads/2017/03/logo-lockup-2x-600x234.png"
        width="300"
      )
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
  /** PRIVATE PROPERTIES ----------------- */
  /** PRIVATE METHODS -------------------- */
}
</script>

<style lang="scss">
#header-content {
  justify-content: space-between;
  width: 100%;
}
#header-bar {
  @include linear-gradient-brand-grey;
}

.title {
  @include poppins-medium($color-brand-gray-base, 24px);
  text-align: center;
}
</style>
