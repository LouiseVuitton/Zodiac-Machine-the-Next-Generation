// Load mongoose package
const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  sign1: String,
  sign2: String,
  words: String,
  compatibility: String,
  mood: String,
  color: String,
  luckyNumber: String,
  luckyTimeOfDay: String,
  created_at: { type: Date, default: Date.now },
  deleted: {type: Boolean, default: false}
});

const File = mongoose.model('File', FileSchema);

File.countDocuments({}, function(err, count) {
  if (err) {
    throw err;
  }

  console.log('count', count)
  
  if (count > 0) return ;

  const files = require('./file.seed.json');
  File.create(files, function(err, newFiles) {
    if (err) {
      throw err;
    }
    console.log("DB seeded")
  });

});

module.exports = File;
