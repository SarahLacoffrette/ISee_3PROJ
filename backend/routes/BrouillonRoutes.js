var express = require("express")
var BrouillonController = require("../controllers/BrouillonController")
const router = express.Router()

router.post("/user", BrouillonController.createUser)

module.exports = router;