<template>
  <transition
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </transition>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'my-transition',
  methods: {
    // This is async, but we don't have to expose it in order to test it
    enter(element, done) {
      const width = getComputedStyle(element).getPropertyValue('width')
      element.style = {
        width,
        height: 'auto',
        position: 'absolute',
        visibility: 'hidden'
      }
      const height = getComputedStyle(element).getPropertyValue('height')
      element.style = {
        width: null,
        height: null,
        position: null,
        visibility: null
      }
      anime({
        targets: element,
        opacity: [0, 1],
        height: [0, height],
        easing: 'easeInOutCirc',
        duration: 500,
        complete: done
      })
    },
    afterEnter(element) {
      element.style = ''
    },
    leave(element, done) {
      const height = getComputedStyle(element).getPropertyValue('height')
      anime({
        targets: element,
        opacity: [1, 0],
        height: [height, 0],
        easing: 'easeInOutCirc',
        duration: 500,
        complete: done
      })
    },
    afterLeave(element) {
      element.style = ''
    }
  }
}
</script>