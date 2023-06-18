var express = require("express")
var LikeController = require("../controllers/LikeController")
const router = express.Router()

router.post('/like/addLike', LikeController.addLike)
router.post('/like/checkLike', LikeController.checkLike)
router.post('/like/dislike', LikeController.dislike)

module.exports = router;