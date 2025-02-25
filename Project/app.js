const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./Project/models/user');
const postModel = require('./Project/models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const multer = require('multer');
const multerconfig = require('./Project/multerconfig');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'Project', 'public')));
app.set('views', path.join(__dirname, 'Project', 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, './Project/public/images/uploads')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, function(err, bytes){
            const fn = bytes.toString('hex') + path.extname(file.originalname)
            cb(null, fn)
        });
    }
});
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/picture', (req, res) => {
    res.render('picture');
});

app.post('/upload', isLoggedIn, upload.single('image'), async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    user.profilepic = req.file.filename;
    await user.save();
    res.redirect('/profile');
});

app.get('/profile/upload', (req, res) => {
    res.render('picture');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email}).populate("posts");
    res.render('profile', {user});
});

app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id}).populate("user");
    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
    } 
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }
    await post.save();
    res.redirect('/profile');
});

app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id}).populate("user");
    res.render('edit', {post});
});

app.post('/update/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({_id: req.params.id}, {content: req.body.content});
    res.redirect('/profile');
});

app.post('/post', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    let {content} = req.body;
    let post = await postModel.create({
        user: user._id,
        content: content
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
});

app.post('/register', async (req, res) => {
    let {email, password, name, age} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("Registered");
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
            let user = await userModel.create({
                name,
                email,
                password: hash,
                age,
            });
            let token = jwt.sign({email: email, userid: user._id}, "ssss");
            res.cookie('token', token);
            res.send("registered");
        });
    });
});

app.post('/login', async (req, res) => {
    let {email, password} = req.body;

    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went wrong");
    bcrypt.compare(password, user.password, function (err, result){
        if(result){
            let token = jwt.sign({email: email, userid: user._id}, "ssss");
            res.cookie('token', token);
            res.status(200).redirect('/profile');
        } 
        else res.send("Something went wrong"); //redirect('/login');
    })
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

function isLoggedIn(req, res, next){
    if(req.cookies.token === "") res.redirect('/login');
    else{
        let data = jwt.verify(req.cookies.token, 'ssss');
        req.user = data;
        next();
    }
}
app.listen(3000);