const express = require('express');
const app = express();

// cookie
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

// app.get('/', function (req, res){
//   res.cookie("name", "sankhayan");
//   res.send("done");
// });

// app.get('/read', function (req, res){
//   console.log(req.cookies);
//   res.send("read page");
// });

// bcrypt
// const bcrypt = require('bcrypt');

// app.get('/', function (req, res){
//   bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash("password", salt, function(err, hash) {
//         console.log(hash);
//     });
//   });
// });

// app.get('/', function (req, res){
//   bcrypt.compare("password", "$2b$10$OlhFpKaT34kk9jfE4KgY1OOlZN0i60PtjBqWTBRYQ5rnI4iPqglBm", function(err, result) {
//     console.log(result);
//   });
// });

// jwt
// const jwt = require('jsonwebtoken');
// app.get('/', function (req, res){
//   let token = jwt.sign({email: "sanu25@gmail.com"}, "secret");
//   res.cookie("token", token);
//   res.send("done");
// });

// app.get('/read', function (req, res){
//   let data = jwt.verify(req.cookies.token, "secret");
//   console.log(data);
// });

app.listen(3000);