'use strict'

var express = require('express');
var BierController = require ('../controllers/bier');

var router = express.Router();

/*esta variable y la otra se necesitan para cargar archivos,despues
hay que crear una carpeta en el proyecto,despues hay que 
incluirlo como parametro en el router.post*/
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
