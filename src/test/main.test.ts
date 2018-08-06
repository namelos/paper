import request from 'supertest'
import { bootstrap } from 'endpoint'

it('should return response', async () => {
  const app = await bootstrap()

  return await request(app)
    .post('/api')
    .send({
      query: `
        {
          hello
        }
      `
    })
    .expect(200)
})
