const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'Notetaker', 'public')));
app.set('views', path.join(__dirname, 'NoteTaker', 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  fs.readdir(`./NoteTaker/files`, function(err, files){
    res.render("index", {files: files});
  });
});
app.get('/file/:filename', function(req, res){
  fs.readFile(`./NoteTaker/files/${req.params.filename}`, "utf-8", function(err, filedata){
    res.render('show', {filename: req.params.filename, filedata: filedata}); 
  });
});
app.get('/edit/:filename', function(req, res){
  res.render('edit', {filename: req.params.filename, filedata: req.params.filedata});
});
app.post('/edit', function(req, res){
  fs.rename(`./NoteTaker/files/${req.body.previous}`, `./NoteTaker/files/${req.body.current}`, function(err){
    res.redirect("/");
  })
});
app.post('/create', function(req, res){
  fs.writeFile(`./NoteTaker/files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
    res.redirect("/")
  });
});

app.listen(3000);