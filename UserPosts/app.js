const express = require('express');
const app = express();
const userModel = require('./UserPosts/models/user');
const postModel = require('./UserPosts/models/post');

app.get('/', function (req, res){
    res.send('');
});

app.get('/create', async function (req, res){
    let user = await userModel.create({
        name: "sanu",
        email: "sanu25@gmail.com"
    });
    res.send(user);
});

app.get('/post/create', async function (req, res){
    let post = await postModel.create({
        postdata: "hello",
        user: '66c1997c106578532f48de9d'   //While running, paste the id here from the create page, only then post/create will run.
    });
    let user = await userModel.findOne({_id: '66c1997c106578532f48de9d'});
    user.posts.push(post._id);
    await user.save();
    res.send({post, user});
});

app.listen(3000);