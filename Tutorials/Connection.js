const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:27017/Practice`);
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model("user", userSchema);

//This is connected with Database.js
