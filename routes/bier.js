'use strict'

var express = require('express');
var BierController = require ('../controllers/bier');

var router = express.Router();

/*this variable and the other,are needed to upload files.After
a new folder should be created and include it as parameter in the router post*/
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

router.get('/home',BierController.home);
router.get('/test',BierController.test);
router.post('/save-bier',BierController.saveBier);
router.get('/bier/:id?',BierController.getBier);
router.get('/biers/',BierController.getBiers);
router.put('/bier-update/:id',BierController.updateBier);
router.delete('/bier-delete/:id',BierController.daleteBier);
router.post('/upload-image/:id',multipartMiddleware,BierController.uploadImage);
router.get('/get-image/:image',BierController.getImageFile);

module.exports = router;
