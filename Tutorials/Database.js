const express = require('express');
const app = express();
const userModel = require('./Tutorials/Connection');

app.get('/', (req, res)=>{
  res.send("MongoDB");
});
app.get('/create', async (req, res)=>{
  let createduser = await userModel.create({
    name: "Sanu",
    email: "sanu25@gmail.com",
    password: "sanu2004"
  })
  res.send(createduser);
});
app.get('/update', async (req, res)=>{
  let updateduser = await userModel.findOneAndUpdate({name: "Sanu"}, {name: "Sankhayan"}, {new: true})
  res.send(updateduser);
});
app.get('/read', async (req, res)=>{
  let users = await userModel.find(); //to get only one object write findOne({name: ""});
  res.send(users);
});
app.get('/delete', async (req, res)=>{
  let users = await userModel.findOneAndDelete({name: "Sankhayan"});
  res.send(users);
});
app.listen(3000);


//This is connected with Connection.js