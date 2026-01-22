import apiRouter from '../apiRouter'  // Replace
import Router from '@koa/router'

describe('ApiRouter', () => {
  test('mounts all routes', () => {
    const router = new Router()
    router.use(apiRouter.routes())  // No error = mounted
    expect(router.stack.length).toBeGreaterThan(0)
  })

  test('logs mounting', () => {
    global.console = { debug: jest.fn() } as any
    require('../apiRouter')  // Triggers log
    expect(console.debug).toHaveBeenCalledWith('Mounting API routes:', expect.objectContaining({ totalRoutes: 19 }))
  })
})