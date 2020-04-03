const Koa = require('koa')
const socket = require('koa-websocket')
const app = socket(new Koa())
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const socketRoute = require('./src/routes/io.js')
const httpRoute = require('./src/routes/http.js')
const cors = require('koa-cors')

// error handler
onerror(app)

//配置跨域
app.use(cors())
// middlewares
app.use(bodyparser({
	enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
	extension: 'pug'
}))


//utils   ------  将工具库添加到ctx中
app.use(async (ctx, next) => {
	ctx.util = {
		mysql: require('./utils/mysql'),
		token : require('./utils/token.js'),
		redis: require('./utils/redis.js')
	}
	await next()
})


// logger   ----   打印日志
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
// routes   ---- 路由
app.ws.use(socketRoute.routes(), socketRoute.allowedMethods());
app.use(httpRoute.routes(), httpRoute.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
});
app.listen(80)

module.exports = app
