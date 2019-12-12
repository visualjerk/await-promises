const AwaitPromises = require('../dist/index.js').default
const { wait } = require('../dist/index.js')

describe('AwaitPromises', () => {
  it('handles promise', async () => {
    let a = 0
    const waiter = new AwaitPromises
    waiter.collect()
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

  it('handles multiple promises', async () => {
    let a = 0
    const waiter = new AwaitPromises
    waiter.collect()
    new Promise((resolve, reject) => {
      setTimeout(() => {
        a++
        resolve()
      }, 10)
    })
    new Promise((resolve, reject) => {
      setTimeout(() => {
        a++
        resolve()
      }, 20)
    })
    new Promise((resolve, reject) => {
      setTimeout(() => {
        a++
        resolve()
      }, 30)
    })
    waiter.stop()
    await waiter.wait()
    expect(a).toEqual(3)
  })

  it('runs independently', async () => {
    let a = 0
    const waiter = new AwaitPromises
    waiter.collect()
    new Promise((resolve, reject) => {
      setTimeout(() => {
        a++
        resolve()
      }, 10)
    })
    waiter.stop()
    await waiter.wait()
    expect(a).toEqual(1)

    const waiter2 = new AwaitPromises
    waiter2.collect()
    new Promise((resolve, reject) => {
      setTimeout(() => {
        a++
        resolve()
      }, 10)
    })
    waiter2.stop()
    await waiter2.wait()
    expect(a).toEqual(2)
  })

  it('handles nested promises', async () => {
    let a = 0
    const waiter = new AwaitPromises
    waiter.collect()
    new Promise((resolve, reject) => {
      setTimeout(() => {
        a++
        new Promise((resolve, reject) => {
          setTimeout(() => {
            a++
            resolve()
          }, 10)
        }).then(resolve)
      }, 10)
    })
    waiter.stop()
    await waiter.wait()
    expect(a).toEqual(2)
  })
})

describe('wait', () => {
  it('handles promise', async () => {
    let a = 0
    await wait(() => {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          a++
          resolve()
        }, 10)
      })
    })
    expect(a).toEqual(1)
  })

  it('handles multiple promises', async () => {
    let a = 0
    await wait(() => {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          a++
          resolve()
        }, 10)
      })
      new Promise((resolve, reject) => {
        setTimeout(() => {
          a++
          resolve()
        }, 20)
      })
      new Promise((resolve, reject) => {
        setTimeout(() => {
          a++
          resolve()
        }, 30)
      })
    })
    expect(a).toEqual(3)
  })

  it('runs independently', async () => {
    let a = 0
    await wait(() => {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          a++
          resolve()
        }, 10)
      })
    })
    expect(a).toEqual(1)
    await wait(() => {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          a++
          resolve()
        }, 10)
      })
    })
    expect(a).toEqual(2)
  })

  it('handles nested promises', async () => {
    let a = 0
    await wait(() => {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          a++
          new Promise((resolve, reject) => {
            setTimeout(() => {
              a++
              resolve()
            }, 10)
          }).then(resolve)
        }, 10)
      })
    })
    expect(a).toEqual(2)
  })
})