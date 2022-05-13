const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  if (req.method === 'PATCH') {
    req.body.updateAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})
const POST = process.env.PORT || 3000;
// Use default router
server.use("/api", router)
server.listen(POST), () => {
  console.log('JSON Server is running')
}