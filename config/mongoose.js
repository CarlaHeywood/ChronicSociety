const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://hyh014:password@ds157599.mlab.com:57599/diary-tone-hh");
mongoose.connect("mongodb://localhost:27017/diarytone");

module.exports = {
  mongoose: mongoose
};
