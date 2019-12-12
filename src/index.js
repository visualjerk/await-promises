class AwaitPromises {
  constructor() {
    this.promises = []
    this.OldPromise = null
  }

  collect() {
    const that = this
    this.OldPromise = Promise

    Promise = class Promise extends this.OldPromise {
      constructor() {
        super(...arguments)
        that.promises.push(this)
      }
    }
  }

  stop() {
    Promise = this.OldPromise
  }

  wait() {
    return Promise.all(this.promises)
  }
}

export default AwaitPromises

export async function wait(func) {
  const waiter = new AwaitPromises()
  waiter.collect()
  await func()
  waiter.stop()
  await waiter.wait()
}
