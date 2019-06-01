<template>
  <div id="app">
    <my-transition>
      <div v-if="show">test</div>
    </my-transition>
    <button @click="show = !show">Toggle</button>
  </div>
</template>

<script>
import MyTransition from './components/my-transition.vue'

export default {
  name: 'app',
  components: {
    MyTransition
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
