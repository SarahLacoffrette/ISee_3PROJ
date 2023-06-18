var express = require("express")
var Video = require("../controllers/VideoController")
const router = express.Router()

router.post('/video/createVideo', Video.createVideo)
router.get('/video/getAllVideos', Video.getAllVideos)
router.post('/video/getVideoById', Video.getVideoById)
router.post('/video/getVideoByUser', Video.getVideoByUser)
router.put('/video/addView', Video.addView)
router.delete('/video/deleteVideo/:id', Video.deleteVideo)
router.put('/video/updateVideoById', Video.updateVideoById)
router.put('/video/updateStateVideoById', Video.updateStateVideoById)
router.put('/video/changeStateVideo', Video.changeStateVideo)
router.get('/video/getAllVideosAllState', Video.getAllVideosAllState)
router.get('/video/numberOfVideos', Video.numberOfVideos)
router.post('/video/sumOfViews', Video.sumOfViews)
router.post('/video/sumOfLikes', Video.sumOfLikes)
router.put('/video/addLikes', Video.addLike)
router.put('/video/removeLikes', Video.revmoveLike)
router.post('/video/searchVideo', Video.searchVideo)
router.post('/video/getVideoByUserLimit', Video.getVideoByUserLimit)

module.exports = router;