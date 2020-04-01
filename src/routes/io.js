const router = require('koa-router')()
const ChatController = require('../controllers_io/chat.js')
const MapController = require('../controllers_io/map.js')

router.all('/chat', ChatController)
router.all('/map', MapController)

module.exports = router