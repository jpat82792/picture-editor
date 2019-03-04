let pictureController = require('../controllers/savePictureReqController.js');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('profile-editor', { title: 'Express' });
});
router.post('/', (req, res, next) => {
  console.log("image post received");
  pictureController.savePhotoReqController(req, res, next);
});

module.exports = router;
