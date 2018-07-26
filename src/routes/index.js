// src/routes/index.js
const router = require('express').Router();
const mongoose = require('mongoose');

//Totally fake data
// const FILES = [
//   {id: 'horoscope1',
//        words: 'Are you waiting for word on something, or hoping to hear back from a contact? Things are moving faster than you would expect, though it may still take a little longer for word to finally get to you.',
//        compatibiliy: 'Sagittarius',
//        mood: 'Patient',
//        color: 'Silver',
//        luckyNumber: 3,
//        luckyTimeOfDay: '9 am'},
//    {id: 'horoscope2',
//        words: 'Are you waiting for word on something, or hoping to hear back from a contact? Things are moving faster than you would expect, though it may still take a little longer for word to finally get to you.',
//        compatibiliy: 'Sagittarius',
//        mood: 'Patient',
//        color: 'Silver',
//        luckyNumber: 9,
//        luckyTimeOfDay: '9 am'},
//    {id: 'horoscope3',
//        words: 'Are you waiting for word on something, or hoping to hear back from a contact? Things are moving faster than you would expect, though it may still take a little longer for word to finally get to you.',
//        compatibiliy: 'Sagittarius',
//        mood: 'Patient',
//        color: 'Silver',
//        luckyNumber: 6,
//        luckyTimeOfDay: '9 am'},
//    {id: 'horoscope4',
//        words: 'Are you waiting for word on something, or hoping to hear back from a contact? Things are moving faster than you would expect, though it may still take a little longer for word to finally get to you.',
//        compatibiliy: 'Sagittarius',
//        mood: 'Patient',
//        color: 'Silver',
//        luckyNumber: 4,
//        luckyTimeOfDay: '9 am'},
//    {id: 'horoscope5',
//        words: 'Are you waiting for word on something, or hoping to hear back from a contact? Things are moving faster than you would expect, though it may still take a little longer for word to finally get to you.',
//        compatibiliy: 'Sagittarius',
//        mood: 'Patient',
//        color: 'Silver',
//        luckyNumber: 5,
//        luckyTimeOfDay: '9 am'},
// ];


/**
 * C - reate
 */

router.post('/file', function(req, res, next) {
  const File = mongoose.model('File');
  const fileData = {
    sign1: req.body.sign1,
    sign2: req.body.sign2,
    words: req.body.words,
    compatibility: req.body.compatibility,
    mood: req.body.mood,
    color: req.body.color,
    luckyNumber: req.body.luckyNumber,
    luckyTimeOfDay: req.body.luckyTimeOfDay,
  };

  File.create(fileData, function(err, newFile) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json(newFile);
  });
});


/**
 * R - ead
 */
router.get('/file/:fileId', function(req, res, next) {
  const { fileId } = req.params;
  // same as 'const fileId = req.params.fileId'

  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  res.json(file);
});
/**
 * U - pdate
 */
router.put('/file/:fileId', function(req, res, next) {
  const File = mongoose.model('File');
  const fileId = req.params.fileId;
  
  File.findById(fileId, function(err, file) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!file) {
      return res.status(404).json({message: "File not found"});
    }
  
    file.sign1 = req.body.sign1;
    file.userHoroscope = req.body.userHoroscope;
    file.sign2 = req.body.sign2;
    file.userMood = req.body.userMood;
    file.userColor = req.body.userColor;
    file.luckyNumber = req.body.luckyNumber;
    file.luckyTime = req.body.luckyTime;
  
    file.save(function(err, savedFile) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(savedFile);
    })
  
  })
});
  

/**
 * ¯\_(ツ)_/¯ - list
 */
router.get('/file', function(req, res, next) {
  mongoose.model('File').find({}, function(err, files) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  
    res.json(files);
  });
});


/**
 * D - elete
 */

router.delete('/file/:fileId', function(req, res, next) {
  const File = mongoose.model('File');
  const fileId = req.params.fileId;

  File.findById(fileId, function(err, file) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!file) {
      return res.status(404).json({message: "File not found"});
    }

    file.deleted = true;

    file.save(function(err, doomedFile) {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      res.json(doomedFile);
    })

  })
});

module.exports = router;