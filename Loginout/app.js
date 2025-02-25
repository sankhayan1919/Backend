const express = require('express');
const app = express();
const userModel = require('./Loginout/models/user');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'Loginout', 'public')));
app.set('views', path.join(__dirname, 'Loginout', 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());

app.get('/', function (req, res){
    res.render('home');
});

app.post('/create', (req, res)=>{
    let {name, email, password, age} = req.body;
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                name,
                email,
                password: hash,
                age
            });
            let token = jwt.sign({email}, 'ssssssssssss');
            res.cookie('token', token);
            res.send(createdUser); 
        });
    }); 
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', async function (req, res){
    let user = await userModel.findOne({email: req.body.email});
    if(!user) return res.send('something went wrong');
    bcrypt.compare(req.body.password, user.password, function (err, result){
        if(result){
            let token = jwt.sign({email: user.email}, 'ssssssssssss');
            res.cookie('token', token);
            res.send('You are logged in');
        }
        else res.send('something went wrong');
    });
});

app.get('/logout', function(req, res){
    res.cookie('token', '');
    res.redirect("/");
});

app.listen(3000);