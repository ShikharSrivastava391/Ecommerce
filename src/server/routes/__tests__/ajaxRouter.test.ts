import supertest from 'supertest'
import ajaxRouter from '../ajaxRouter'  // Replace path
import Koa from 'koa'

describe('AjaxRouter', () => {
  let app: Koa

  beforeAll(() => {
    app = new Koa()
    app.use(ajaxRouter.routes())
  })

  test('sanitizes email in forgot-password', async () => {
    const response = await supertest(app.callback())
      .post('/forgot-password')
      .send({ email: ' Test@ExAmPlE.com ' })  // Unsanitized
      .expect(200)
    expect(response.body.status).toBe(true)  // Passes sanitize
  })

  test('logs failed login', async () => {
    global.console = { log: jest.fn() } as any
    await supertest(app.callback())
      .post('/login')
      .send({ email: 'bad', password: 'wrong' })
      .expect(200)
    expect(console.log).toHaveBeenCalledWith('Failed login attempt:', 'bad')
  })
})