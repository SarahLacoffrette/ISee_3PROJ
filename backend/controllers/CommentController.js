const db = require('../database/db')

const createComment = (req, res) => {
    const id_user = req.body.id_user;
    const user = req.body.user;
    const id_video = req.body.id_video;
    const text = req.body.comment;
    const newDate = new Date();
    const date = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
    const state = true;
    const values = [id_user, user, id_video, text, date, state];

    const sql = "INSERT INTO comment (id_user, user, id_video, text, date, state) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Comment created"});
    });
}

const getAllCommentsByVideo = (req, res) => {
    const id_video = req.body.id_video;
    const sql = "SELECT * FROM comment WHERE id_video = ? AND state = true";
    db.query(sql, id_video, (err, result) => {
        if (err) throw err;
        res.json({success: true, data: result});
    });
}

const getAllComments = (req, res) => {
    const sql = "SELECT * FROM comment";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json({success: true, data: result});
    });
}

const deleteComment = (req, res) => {
    const id = req.body.id;
    const sql = "UPDATE comment SET state = 2 WHERE id = ?";
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Comment deleted"});
    });
}

module.exports = {createComment, getAllCommentsByVideo, getAllComments, deleteComment}

