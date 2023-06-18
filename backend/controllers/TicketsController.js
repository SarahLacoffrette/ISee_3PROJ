const db = require('../database/db')

const createTicket = (req, res) => {
    const id_user = req.body.id_user;
    const username = req.body.username;
    const email = req.body.email;
    const text = req.body.text;
    const state = false;
    const values = [id_user, username, email, text, state];
    const sql = "INSERT INTO Tickets (id_user, username, email, text, state) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Ticket created"});
    });
}

const getAllTickets = (req, res) => {
        const sql = "SELECT * FROM Tickets";
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.json({success: true, message: "All tickets", data: result});
        });
}

const updateTicketById = (req, res) => {
    const id = req.body.id;
    const state = true;
    const values = [state, id];
    const sql = "UPDATE Tickets SET state = ? WHERE id = ?";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Ticket updated"});
    });
}

module.exports = {createTicket, getAllTickets, updateTicketById}