const mongoose = require('mongoose');
const { Schema } = mongoose; // same as : const Schema = mongoose.Schema; called destructuring

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema); // users is the name of the collection