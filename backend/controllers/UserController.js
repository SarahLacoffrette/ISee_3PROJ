const db = require('../database/db')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
require("dotenv").config();


const getAllUsers = (req, res) => {
    const sql = "SELECT * FROM User";

    db.query(sql, (err, result) => {
        if (err)throw err;

        res.status(200).json({success: true, data: result});
    });
}
const getUserId = (req, res) => {
    const email = req.body.email;
    const sql = "SELECT * FROM User WHERE email = ?";

   db.query(sql, email, (err, result) => {
        if (err)throw err;
        if (result.length === 0) {
            return res.status(400).json({success: false, message: "User not found"});
        }else{
            const id_user = result[0].id;
            return res.status(200).json({success: true, message: "User found", id_user});
        }
    });
}

const getUserById = (req, res) => {
    const id = req.body.id;
    const sql = "SELECT * FROM User WHERE id = ?";

    db.query(sql, id, (err, result) => {
        if (err)throw err;
        if (result.length === 0) {
            return res.status(400).json({success: false, message: "User not found"});
        }else{
            const data = result[0];
            return res.status(200).json({success: true, message: "User found", data});
        }
    });
}

const searchUserAllReadyExist = (req, res) => {

    const email = req.body.email;
    const sql = "SELECT * FROM User WHERE email = ?";

    db.query(sql, email, (err, result) => {
        //if (err)throw err;
        if (result.length !== 0) {
            return res.json({success: true, message: "User found"});
        }else{
            return res.json({success: false, message: "User not found"});
        }
    });
}

const getCookie = (req, res) => {
    const token = req.body.token;
    if (!token) {
        return res.status(403).json({success: false, message: "Cookie not found"});
    }else{
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        return res.status(200).json({success: true, message: "Cookie ok", data : decoded});
    }
}

const logOut = (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out" });
}

const createUser = (req, res) => {
    const {firstname, lastname, email, password, username, age, gender} = req.body;
    const values = [firstname, lastname, email, password, username, age, gender, 0, "...", "...", 0];
    const sql = "INSERT INTO user (firstname, lastname, email, password, username, age, gender, role, token, picture, followers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.status(200).json({success: true, message: "User created"});
    });

}

const updateUser = (req, res) => {
    const id = req.body.id;
    const fistname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const username = req.body.username;
    const age = req.body.age;
    const role = req.body.role;
    const picture = req.body.picture;
    const values = [fistname, lastname, email, username, age, role, picture, id];
    const sql = "UPDATE User SET firstname = ?, lastname = ?, email = ?, username = ?, age = ?, role = ?, picture = ? WHERE id = ?";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.status(200).json({success: true, message: "User updated"});
    });
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM user WHERE id = ?";
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        res.status(200).json({success: true, message: "User deleted"});
    });
}

const getUserToLogin = (req, res) => {
    const {email, password} = req.body;
    const values = [email, password];
    const sql = "SELECT * FROM User WHERE email = ?";
    db.query(sql, [req.body.email], (err, result) => {
        if (err)throw err;
        if(result.length === 0){
            return res.status(400).json({success: false, error: "Can't find the User"});
        }else{
            if(result[0].password === req.body.password){
                const user = {
                    id: result[0].id,
                    email: result[0].email,
                    password: result[0].password,
                    username: result[0].username,
                    role: result[0].role
                }
                console.log(user);
                console.log("password ok");
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    password: user.password,
                    username: user.username,
                    role: user.role
                }, process.env.TOKEN_KEY);
                return res
                    .cookie("access_token", token, {
                        httpOnly: true,
                        secure: process.env.TOKEN_KEY === "production",
                    })
                    .status(200)
                    .json({ message: "Connected", token: token, id_user: user.id });
            }else{
                console.log("password not ok");
                return res.status(401).json({success: false, error: "Wrong password"});
            }
        }
    });
}

const changeRoleUser = (req, res) => {
    const id = req.body.id;
    const role = req.body.role;
    const values = [role, id];
    const sql = "UPDATE user SET role = ? WHERE id = ?";
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.status(200).json({success: true, message: "User role updated"});
    });
}

const numberOfUsers = (req, res) => {
    console.log("numberOfUsers");
    const sql = "SELECT COUNT(username) AS nbUser FROM User";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("result : " + result[0].nbUser);
        const data = result[0].nbUser;
        res.status(200).json({success: true, message: "Number of users", data});
    });
}

const addSubscription = (req, res) => {
    const id = req.body.id;
    const value = [1, id];
    sql = "UPDATE User SET followers = followers + ? WHERE id = ?";
    db.query(sql, value, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "User updated"});
    });
}

const removeSubscription = (req, res) => {
    const id = req.body.id;
    const value = [1, id];
    sql = "UPDATE User SET followers = followers - ? WHERE id = ?";
    db.query(sql, value, (err, result) => {
        if (err) throw err;
        res.json({success: true, message: "User updated"});
    });
}

const sumOfSubscriptions = (req, res) => {
    const id = req.body.id;
    const sql = "SELECT SUM(followers) AS totalFollowers FROM User WHERE id = ?";
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        const data = result[0].totalFollowers;
        res.json({success: true, message: "Total followers", data: data});
    });
}

const getRole = (req, res) => {
    const id = req.body.id;
    const sql = "SELECT role FROM User WHERE id = ?";
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        const data = result[0].role;
        res.json({success: true, message: "Role", data: data});
    })
}



module.exports = {createUser, getUserToLogin, getCookie, logOut, getUserId,
    searchUserAllReadyExist, getUserById, updateUser, deleteUser, getAllUsers,
    changeRoleUser, numberOfUsers, addSubscription, removeSubscription, sumOfSubscriptions, getRole};