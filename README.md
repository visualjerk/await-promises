# Await Promises

This module makes testing asynchronious stuff easier.

You don't have to expose every internally used promises to your tests, just collect them and wait for them all to finish.

Example with JEST:

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
