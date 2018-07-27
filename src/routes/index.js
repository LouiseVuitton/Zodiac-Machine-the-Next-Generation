// src/routes/index.js
const router = require('express').Router();
const mongoose = require('mongoose');

//****************************** */
// CREATING FILES
// MAKE SURE TO NAME BACK-END AND FRONT-END FILES CONSISTENTLY.
//****************************** */

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


//****************************** */
// READING FILES
// 
//****************************** */

router.get('/file/:fileId', function(req, res, next) {
  const { fileId } = req.params;
  // same as 'const fileId = req.params.fileId'

  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  res.json(file);
});


//****************************** */
// UPDATING FILES
// MAKE SURE TO NAME BACK-END AND FRONT-END FILES CONSISTENTLY.
// FILE IDS COME FROM MONGOOSE, SO NO NEED TO NAME THEM!
//****************************** */

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
    file.words = req.body.words;
    file.sign2 = req.body.sign2;
    file.mood = req.body.mood;
    file.color = req.body.color;
    file.luckyNumber = req.body.luckyNumber;
    file.luckyTimeOfDay = req.body.luckyTimeOfDay;
  
    file.save(function(err, savedFile) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(savedFile);
    })
  
  })
});
  

//****************************** */
// LISTING FILES ON SCREEN
//  {{deleted: $ne: true}} IS THE MONGOOSE WAY OF EXCLUDING SOFT DELETED FILES FROM APPEARING ONSCREEN
//****************************** */
router.get('/file', function(req, res, next) {
  mongoose.model('File').find({deleted: {$ne: true}}, function(err, files) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  
    res.json(files);
  });
});


//****************************** */
// DELETING FILES - SOFT DELETE EDITION
// THIS INVOLVES: MONGOOSE, JSON
//****************************** */

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