import { Server } from './interface/Server'

const server = new Server()

const PORT = Number(process.env.PORT ?? 8082)

server.getApp().listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})
