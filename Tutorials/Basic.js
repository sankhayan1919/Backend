//const fs = require('fs');

// fs.writeFile("sankhayan.txt", "Road to Backend.", function(err){
//     if(err)
//     console.error(err);
//     else
//     console.log("Success");
// })

// fs.appendFile("sankhayan.txt", "\nLearning from Sheriyans.", function(err){
//     if(err)
//     console.error(err);
//     else
//     console.log("Success");
// })

// fs.rename("sankhayan.txt", "sanu.txt", function(err){
//     if(err)
//     console.error(err);
//     else
//     console.log("Success");
// })

// fs.copyFile("sanu.txt", "copy.txt", function(err){
//     if(err)
//     console.error(err);
//     else
//     console.log("Success");
// })

// fs.readFile("sanu.txt", 'utf8', (err, data) => {
//     if (err)
//     console.error(err);
//     else
//     console.log(data);
// })

// fs.unlink("sankhayan.txt", function(err){
//     if(err)
//     console.error(err);
//     else
//     console.log("Success");
// })

// fs.rmdir("./copy", {recursive: true}, function(err){
//     if(err)
//     console.error(err);
//     else
//     console.log("Success");
// })

// const http = require('http');
// const server = http.createServer(function(req, res){
//     res.end("hello");
// })
// server.listen(3000);

//Express JS
const express = require('express')
const app = express();

//these two lines we can get and read data. These are parsers.
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Middleware
app.use(function(req, res, next){
  console.log("middleware is running");
  next();
})

app.get("/", function(req, res){
  res.send("Backend from Sheryians Coding School");
})

app.get("/profile", function(req, res, next){
  return next(new Error("Something went wrong.")) //this line is for error handling
 // res.send("It is profile page");
})

app.get("/author/:username/:age", function(req, res){
  res.send(`welcome ${req.params.username} of age ${req.params.age}`);
});

//Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error!!");
})

app.listen(3000);