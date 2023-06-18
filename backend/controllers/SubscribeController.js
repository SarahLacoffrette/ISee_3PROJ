const db = require('../database/db')

const addSubscribe = (req, res) => {
    const id_user = req.body.id_user;
    const id_channel = req.body.id_channel;
    const values = [id_user, id_channel];
    const sql = "INSERT INTO SubscribeTable (id_user, id_channel) VALUES (?, ?)";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Subscribe created"});
    });
}
const checkSubscribe = (req, res) => {
    const id_user = req.body.id_user;
    const id_channel = req.body.id_channel;
    const values = [id_user, id_channel];
    const sql = "SELECT * FROM SubscribeTable WHERE id_user = ? AND id_channel = ?";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        if (result.length !== 0) {
            return res.json({success: true, message: "Subscribe found"});
        }else{
            return res.json({success: false, message: "Subscribe not found"});
        }
    });
}
const unsubscribe = (req, res) => {
    const id_user = req.body.id_user;
    const id_channel = req.body.id_channel;
    const values = [id_user, id_channel];
    const sql = "Delete FROM SubscribeTable WHERE id_user = ? AND id_channel = ?";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Subscribe deleted"});
    });
}

const getSubscribes = (req, res) => {
    const id_user = req.body.id_user;
    const sql = "SELECT * FROM SubscribeTable WHERE id_user = ?";
    db.query(sql, id_user, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Subscribe found", data: result});
    });
}

module.exports = {addSubscribe, checkSubscribe, unsubscribe, getSubscribes}