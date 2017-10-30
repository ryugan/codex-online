var express = require('express');
var router = express.Router();
var controller = require('./../controllers/HomeController.js')


/* GET home page. */
router.post('/', controller.Index);
router.post('/index', controller.Index);
router.post('/index.js', controller.Index);
router.post('/:premium_code', controller.Index);
router.post('/index/:premium_code', controller.Index);
router.get('/', controller.Index);
router.get('/index', controller.Index);
router.get('/index.js', controller.Index);
router.get('/:premium_code', controller.Index);
router.get('/index/:premium_code', controller.Index);

module.exports = router;
