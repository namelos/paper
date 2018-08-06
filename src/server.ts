import { bootstrap } from 'endpoint'

(async () => {
  const app = await bootstrap()
  app.listen(4000, () => console.log(`🚀 Server ready at http://localhost:4000`))
})()
