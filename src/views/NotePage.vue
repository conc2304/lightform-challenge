<template lang="pug">
  
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoteCardComponent from "@/components/NoteComponent.vue";

@Component({
  components: {
    NoteCardComponent,
  },
})
export default class NotePAge extends Vue {
  /** PROPERTIES ------------------------- */
  // @Prop({ type: String, default: "Take a note ..." }) noteBody!: string;
  /** PUBLIC PROPERTIES------------------- */
  // public noteBody!: string;
  /** PUBLIC METHODS --------------------- */
  /** LIFECYCLE HOOKS  ------------------- */
  // beforeCreate(): void {}
  // created(): void {}¬
  // beforeMount(): void {}
  mounted(): void {
    console.log(this.$route.params.id);
  }
  // beforeDestroy(): void {}
  // destroyed(): void {}
  // beforeUpdate(): void {}
  // updated(): void {}
  /** PRIVATE PROPERTIES ----------------- */
  /** PRIVATE METHODS -------------------- */
}
</script>

<style lang="scss" scoped></style>
