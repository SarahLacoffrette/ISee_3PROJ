const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const database = require('./database/db');
const minioService = require('./services/minioService');
const io = require('./services/socketService');
const nodemailer = require('nodemailer');
var cors = require('cors')
const port = 3003;

const app = express()

dotenv.config();

// view engine setupi
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


const userRoute = require("./routes/UserRoutes");
const emailRoute = require("./routes/EmailRoutes");
const videoRoute = require("./routes/VideoRoutes");
const commentRoute = require("./routes/CommentRoutes");
const likeRoute = require("./routes/LikeRoutes");
const subscribeRoute = require("./routes/SubscribeRoutes");
const ticketsRoute = require("./routes/TicketsRoutes");
const minioRoute = require("./routes/MinIoRoutes");

database
minioService

app.use('/api', userRoute);
app.use('/api', emailRoute);
app.use('/api', videoRoute);
app.use('/api', commentRoute);
app.use('/api', likeRoute);
app.use('/api', subscribeRoute);
app.use('/api', ticketsRoute);
app.use('/api', minioRoute);


app.listen(port, () => console.log("[SERVICE] BACKEND LISTENING ON PORT " + port));