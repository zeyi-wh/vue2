<template>
  <div>
    <div @click="test">123</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
//
export default {
  name: "workspace.vue",
  computed: {
    ...mapGetters("template", ["getCount"]),
  },
  methods: {
    ...mapMutations("template", ["setCount"]),
    test() {
      this.setCount(3);
    },
  },
};
</script>

<style scoped></style>
