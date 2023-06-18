var express = require("express")
var Email = require("../controllers/EmailController")
const router = express.Router()

router.post("/email/createRequest", Email.createRequest)
router.post('/email/send-email', Email.sendMail)
router.put('/email/validateEmail', Email.validateEmail)
router.post('/email/send-email-ticket', Email.sendMailTicket)

module.exports = router;