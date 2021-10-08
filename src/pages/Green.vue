<template>
  <ul>
    <flashlight
      v-for="item in lanterns"
      :key="item.id"
      :isActive="item.color === 'green' ? true : false"
      :time="this.time"
      :isPaused="this.isPaused"
      :style="{
          background: item.color
        }"
    />
  </ul>
</template>

<script>
import Flashlight from '../components/Flashlight.vue'

export default {
  components: {Flashlight},
  props: {
    lanterns: {
      type: Object,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    isPaused: {
      type: Boolean,
      required: true
    }
  },
};

</script>

<style scoped>

ul {
    list-style: none;
}

</style>
 