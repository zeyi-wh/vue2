<template>
  <div>
    <h1>子应用</h1>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
//
export default {
  name: 'workspace.vue',
  computed: {
    ...mapGetters('template', ['getCount'])
  },
  methods: {
    ...mapMutations('template', ['setCount']),
    add () {
      this.setCount(++this.getCount)
    }
  }
}
</script>

<style scoped></style>
