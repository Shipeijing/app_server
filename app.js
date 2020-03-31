const Koa = require('koa')
const socket = require('koa-websocket')
const app = socket(new Koa())
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const socketRoute = require('./routes/socketRoute')
const httpRoute = require('./routes/httpRoute')
const cors = require('koa-cors')

// error handler
onerror(app)

//配置跨域
app.use(cors())
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.ip} - ${ms}ms`)
})
app.ws.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.ip} - ${ms}ms`);
})
// routes
app.ws.use(socketRoute.routes(), socketRoute.allowedMethods());
app.use(httpRoute.routes(), httpRoute.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
app.listen(80)
module.exports = app
