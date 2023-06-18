const db = require('../database/db')

const createVideo = (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const source = req.body.source;
    const state = req.body.state;
    const id_user = req.body.id_user;
    const image = req.body.image;
    const likes = 0;
    const view = 0;
    const values = [title, description, source, state, id_user, image, likes, view];
    const sql = "INSERT INTO Video (title, description, source, state, id_user, image, likes, view) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Video created successfully!"});
    });
}

const getAllVideos = (req, res) => {

    const sql = "SELECT * FROM Video WHERE state = 2";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "All videos", data: result});
    });
}

const getAllVideosAllState = (req, res) => {

    const sql = "SELECT * FROM Video";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "All videos", data: result});
    });
}

const getVideoById = (req, res) => {
    const id = req.body.id;
    const sql = "SELECT * FROM Video WHERE id = ?";
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        const source = result[0].source;
        const title = result[0].title;
        const view = result[0].view
        const state = result[0].state
        const description = result[0].description
        res.json({success: true, message: "Video", source, title, view, state, description});
    });
}

const getVideoByUser = (req, res) => {
    const id_user = req.body.id_user;
    const sql = "SELECT * FROM Video WHERE id_user = ?";
    db.query(sql, id_user, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Video", data: result});
    });
}

const getVideoByUserLimit = (req, res) => {
    const id_user = req.body.id_user;
    const sql = "SELECT * FROM Video WHERE id_user = ? LIMIT 1";
    db.query(sql, [id_user], (err, result) => {
        if (err) throw err;
        res.json({ success: true, message: "Video", data: result });
    });
}

const updateVideoById = (req, res) => {
    const id = req.body.id;
    const {title, description, source, state} = req.body;
    const values = [title, description, source, state, id];
    const sql = "UPDATE Video SET title = ?, description = ?, source = ?, state = ? WHERE id = ?";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Video updated"});
    });
}

const updateStateVideoById = (req, res) => {
    const id = req.body.id;
    const state = req.body.state;
    const values = [state, id];
    const sql = "UPDATE Video SET state = ? WHERE id = ?";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Video updated"});
    });
}

const addView = (req, res) => {
    const id = req.body.id;
    const value = [1, id];

    sql = "UPDATE Video SET view = view + ? WHERE id = ?";

    db.query(sql, value, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Video updated"});
    });
}

const addLike = (req, res) => {
    const id = req.body.id;
    const value = [1, id];

    sql = "UPDATE Video SET likes = likes + ? WHERE id = ?";

    db.query(sql, value, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Video updated"});
    });
}

const revmoveLike = (req, res) => {
    const id = req.body.id;
    const value = [1, id];

    sql = "UPDATE Video SET likes = likes - ? WHERE id = ?";

    db.query(sql, value, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Video updated"});
    });
}

const deleteVideo = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM Video WHERE id = ?";
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Video deleted"});
    });
}

const changeStateVideo = (req, res) => {
    const id = req.body.id;
    const state = req.body.state;
    const values = [state, id];
    const sql = "UPDATE Video SET state = ? WHERE id = ?";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Video updated"});
    });
}

const numberOfVideos = (req, res) => {
    const sql = "SELECT COUNT(id) AS numberVideo FROM Video";
    db.query(sql, (err, result) => {
        if (err) throw err;
        const data = result[0].numberVideo;
        res.json({success: true, message: "Number of videos", data: data});
    });
}

const sumOfViews = (req, res) => {
   const id_user = req.body.id_user;
    const sql = "SELECT SUM(view) AS totalView FROM Video WHERE id_user = ?";
    db.query(sql, id_user, (err, result) => {
        if (err) throw err;
        const data = result[0].totalView;
        res.json({success: true, message: "Total views", data: data});
    });
}

const sumOfLikes = (req, res) => {
    const id_user = req.body.id_user;
    const sql = "SELECT SUM(likes) AS totalLikes FROM Video WHERE id_user = ?";
    db.query(sql, id_user, (err, result) => {
        if (err) throw err;
        const data = result[0].totalLikes;
        res.json({success: true, message: "Total likes", data: data});
    });
}

const searchVideo = (req, res) => {
    const title = req.body.title;
    const sql = "SELECT * FROM Video WHERE title LIKE CONCAT('%', ?, '%') AND state = 2";
    db.query(sql, title, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "Video", data: result});
    });
}

module.exports = { createVideo, getAllVideos, getAllVideosAllState, getVideoById,
    getVideoByUser, addView, deleteVideo, updateVideoById, updateStateVideoById,
    changeStateVideo, numberOfVideos, sumOfViews, sumOfLikes, addLike, revmoveLike,
    searchVideo, getVideoByUserLimit};