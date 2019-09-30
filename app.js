const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const dotEnv = require('dotenv');
dotEnv.config();
const PORT = process.env.SERVER_PORT || 3000;
const mongodb = require('./config/db/Mongoose');
// const mongodb = require('./config/database/mongoose-connect');
mongodb();

const userRouter = require('./routes/users');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userRouter);

app.listen(PORT, console.log(`Server start... on PORT: ${PORT}`));