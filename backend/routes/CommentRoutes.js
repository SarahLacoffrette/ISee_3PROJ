var express = require("express")
var CommentController = require("../controllers/CommentController")
const router = express.Router()

//router.post("/user", CommentController.createUser)
router.post("/comment/add", CommentController.createComment)
router.post("/comment/getAllCommentsByVideo", CommentController.getAllCommentsByVideo)
router.get("/comment/getAllComments", CommentController.getAllComments)
router.put("/comment/deleteComment", CommentController.deleteComment)

module.exports = router;