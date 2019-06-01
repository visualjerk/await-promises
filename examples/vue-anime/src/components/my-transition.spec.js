import { mount, config } from '@vue/test-utils'
import MyTransition from './my-transition.vue'
import AwaitPromises from 'await-promises'

// Use default vue transition comp
config.stubs.transition = false

describe('MyTransition.vue', () => {
  it('cleans styles after enter transition', async () => {
    // Initialize waiter
    const waiter = new AwaitPromises
    // Start collecting promises
    waiter.collect()

    const comp = {
      template: `<div><my-transition><p v-show="show">foo</p></my-transition></div>`,
      components: {
        MyTransition
      },
      data() {
        return {
          show: false
        }
      }
    }
    const wrapper = mount(comp)

    // This triggers asynchronious behaviour inside the comp
    wrapper.vm.show = true
    const foo = wrapper.find('p')

    // Stop collecting promises
    waiter.stop()
    // Wait until all promises have finished
    await waiter.wait()
    expect(foo.element.style.cssText).toEqual('')
  })
})
