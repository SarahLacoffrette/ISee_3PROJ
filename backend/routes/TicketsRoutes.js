var express = require("express")
var TicketsController = require("../controllers/TicketsController")
const router = express.Router()

router.post("/tickets/createTicket", TicketsController.createTicket)
router.get("/tickets/getNotifications", TicketsController.getAllTickets)
router.put("/tickets/updateTicket", TicketsController.updateTicketById)

module.exports = router;