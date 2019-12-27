const express = require('express');
const passport = require('passport');
const controller = require('../controllers/user');
const controllerC = require('../controllers/category');
const controllerP = require('../controllers/product');
const controllerO = require('../controllers/order');

const router = express.Router();

//auth user
router.post('/login', controller.login);
router.post('/register', controller.register);

//category user
router.get('/getCategories',passport.authenticate('jwt', {session: false}), controllerC.getAllCategories);
router.get('/getCategory/:id',passport.authenticate('jwt', {session: false}), controllerC.getById);

//products user
router.get('/products/:category',passport.authenticate('jwt', {session: false}),  controllerP.getAllProducts);

//order
router.get('/orderUser',passport.authenticate('jwt', {session: false}), controllerO.getUserOrder);
router.post('/order',passport.authenticate('jwt', {session: false}), controllerO.create);
module.exports = router;