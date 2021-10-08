<template>
  <li 
    class="light"
    :class="{
      isActive: this.isActive,
      isAnimated: this.isActive && this.time <= 3 && this.isPaused !== true
      }"
     >
    <p class="time">
      <slot>
        {{this.isActive ? this.time : 0}}
      </slot>
    </p>
  </li>
    
</template>

<script>

export default {
   props: {
     isActive: {
       type: Boolean,
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

}
</script>

<style scoped>

.light {
  margin-top: 15px;
  width: 150px;
  height: 150px;
  border: 3px solid black;
  border-radius: 50%;
  align-self: center;
  opacity: 0.25;
}

.isActive {
  opacity: 1;
}

.time {
  padding-top: 40px;
  text-align: center;
  vertical-align: middle;
  font-size: 50px;
  font-weight: bold;
}

.isAnimated { 
  animation: animate 1s linear infinite;
}

@keyframes animate {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}


</style>