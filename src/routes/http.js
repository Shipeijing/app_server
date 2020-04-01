const router = require('koa-router')()
const UserController = require('../controllers_http/user.js')


router.get('/', UserController.login)
router.post('/login', UserController.login)


module.exports = router
