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
export default class Home extends Vue {}
</script>

<style lang="scss"></style>
