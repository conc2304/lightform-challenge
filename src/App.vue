<template lang="pug">
  v-app
    TheHeaderBar
    v-content
      router-view
</template>

<script lang="ts">
import Vue from "vue";
import TheHeaderBar from "@/components/TheHeaderBar.vue";

export default Vue.extend({
  name: "App",

  components: {
    TheHeaderBar,
  },
});
</script>
