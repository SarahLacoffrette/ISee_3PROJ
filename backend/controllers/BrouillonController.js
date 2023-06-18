const db = require('../database/db')

const createUser = (req, res) => {
    const {email} = req.body;
    const values = [email];
    const sql = "INSERT INTO brouillon (email) VALUES (?)";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
}

module.exports = {createUser}