# Await Promises

This module makes testing asynchronous stuff easier.

You don't have to worry about every internally used promise in your tests. Just collect all promises and wait for them to finish.

## Example with JEST

```js
import AwaitPromises from 'await-promises'

it('async test', async () => {
  let a = 0
  const waiter = new AwaitPromises
  waiter.collect()
  // Run all kind of code, that invokes promises
  new Promise((resolve, reject) => {
    setTimeout(() => {
      a++
      resolve()
    }, 10)
  })
  waiter.stop()
  await waiter.wait()
  expect(a).toEqual(1)
})
```

## Example of testing a Vue transition component

```js
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

    // This triggers asynchronous behaviour inside the comp
    wrapper.vm.show = true
    const foo = wrapper.find('p')

    // Stop collecting promises
    waiter.stop()
    // Wait until all promises have finished
    await waiter.wait()
    expect(foo.element.style.cssText).toEqual('')
  })
})
```
