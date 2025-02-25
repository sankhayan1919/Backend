const express = require('express');
const app = express();
const path = require('path');
const db = require('./Bagshop/config/mongoose-connection');
// const userModel = require('./Bagshop/models/user');
// const postModel = require('./Bagshop/models/post');
const cookieParser = require('cookie-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const multer = require('multer');
// const multerconfig = require('./Bagshop/multerconfig');
const ownersRouter = require('./Bagshop/routes/ownersRouter');
const usersRouter = require('./Bagshop/routes/usersRouter');
const productsRouter = require('./Bagshop/routes/productsRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'Bagshop', 'public')));
app.set('views', path.join(__dirname, 'Bagshop', 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());

app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(3000);