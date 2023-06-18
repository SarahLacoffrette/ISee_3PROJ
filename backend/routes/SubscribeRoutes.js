var express = require("express")
var SubscribeConstroller = require("../controllers/SubscribeController")
const router = express.Router()

router.post('/subscribe/addSubscribe', SubscribeConstroller.addSubscribe)
router.post('/subscribe/checkSubscribe', SubscribeConstroller.checkSubscribe)
router.delete('/subscribe/unsubscribe', SubscribeConstroller.unsubscribe)
router.post('/subscribe/getSubscribes', SubscribeConstroller.getSubscribes)

module.exports = router;