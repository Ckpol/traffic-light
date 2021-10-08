<template>
  <div  class="container">
    <green v-if="currentColor === 'green'"
     :lanterns="lanterns"
     :time="currentLimit"
     :isPaused="isPaused"/>
    <yellow v-else-if="currentColor === 'yellow'"
     :lanterns="lanterns"
     :time="currentLimit"
     :isPaused="isPaused"/>
    <red v-else 
      :lanterns="lanterns"
      :time="currentLimit"
      :isPaused="isPaused"/>
    <my-button  v-if="!isPaused"
      @click="stopTimer"
    >
    Стоп
    </my-button>
    <my-button  v-else
      @click="stopTimer"
    >
    Старт
    </my-button>
  </div>
</template>

<script>
import Green from '../pages/Green.vue';
import Yellow from '../pages/Yellow.vue';
import Red from '../pages/Red.vue';

export default {
  components: {Green, Yellow, Red},
 
  data() {
    return {
      lanterns: {
        red: {id: 1, color: 'red', time:10},
        yellow: {id: 2, color: 'yellow', time:3},
        green: {id: 3, color: 'green', time:15}
      },
      currentColor: '',
      currentLimit: 0,
      prevColor: '',
      timerId: null,
      isPaused: false,
    }
  },

  methods: {
    startTimer(ms) {
      setTimeout(function foo() {
      this.timeCount();
      this.timerId = setTimeout(foo.bind(this), 1000);
      }.bind(this), ms);
    },

    stopTimer() {
      if(!this.isPaused) {
        clearTimeout(this.timerId);
        this.timerId = null;
      } else {
        this.startTimer(0);
      }

      this.isPaused =!this.isPaused;
    }, 

    switchLight() {
      switch (this.currentColor) {
        case 'red': 
          this.prevColor = 'red';
          this.changeColor(this.lanterns['yellow'])
          break;

        case 'green': 
          this.prevColor = 'green';
          this.changeColor(this.lanterns['yellow'])
          break;

        case 'yellow': 
          if (this.prevColor === 'red') {
            this.changeColor(this.lanterns['green'])
          } else if (this.prevColor === 'green') {
            this.changeColor(this.lanterns['red'])
          } else {
            this.prevColor === 'red'
            this.changeColor(this.lanterns['green'])
          }
          break;
      }
      this.$router.push({name: `${this.currentColor}`}).catch(err => {console.log(err)});
    },

    changeColor(elem) { 
      this.currentLimit = elem.time;
      this.currentColor = elem.color;
    },

    timeCount() {
      return this.currentLimit > 0 ? this.currentLimit-- : this.switchLight();
    },
  },

  watch: {
    currentLimit(newValue) {
      localStorage.setItem('currentLimit',  JSON.stringify(newValue));
    },
    currentColor(newColor) {
      localStorage.setItem('currentColor', newColor);
    },
    prevColor(newPrevColor) {
      localStorage.setItem('prevColor', newPrevColor);
    }, 
    isPaused(newPauseStatus) {
      localStorage.setItem('isPaused', JSON.stringify(newPauseStatus)); 
    }
  },

  beforeMount() { 
    const linkName = this.$route.name;

    if (localStorage.currentColor && localStorage.currentLimit && localStorage.currentColor === linkName) {
      this.currentColor = localStorage.getItem('currentColor');
      this.currentLimit = JSON.parse(localStorage.getItem('currentLimit'));
      this.prevColor = localStorage.getItem('prevColor');
      this.isPaused = JSON.parse(localStorage.getItem('isPaused'));
    } else {
      this.changeColor(this.lanterns[linkName]);
    }
    
    if (!this.isPaused) {
      this.startTimer(1000);  
    }
  },
}
</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>