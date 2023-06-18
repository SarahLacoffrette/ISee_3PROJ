const db = require('../database/db')

const addLike = (req, res) => {
    const id_user = req.body.id_user;
    const id_video = req.body.id_video;
    const values = [id_user, id_video];
    const sql = "INSERT INTO LikeTable (id_user, id_video) VALUES (?, ?)";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Like created"});
    });
}

const checkLike = (req, res) => {
    const id_user = req.body.id_user;
    const id_video = req.body.id_video;
    const values = [id_user, id_video];
    const sql = "SELECT * FROM LikeTable WHERE id_user = ? AND id_video = ?";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        if (result.length !== 0) {
            return res.json({success: true, message: "Like found"});
        }else{
            return res.json({success: false, message: "Like not found"});
        }
    });
}



const dislike = (req, res) => {
    const id_user = req.body.id_user;
    const id_video = req.body.id_video;
    const values = [id_user, id_video];
    const sql = "Delete FROM LikeTable WHERE id_user = ? AND id_video = ?";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Like deleted"});
    });
}
module.exports = {addLike, checkLike, dislike}