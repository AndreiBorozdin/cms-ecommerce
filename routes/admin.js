const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const controller = require('../controllers/admin');
const controllerC = require('../controllers/category');
const controllerP = require('../controllers/product');
const controllerO = require('../controllers/order');

const router = express.Router();

//auth admin
router.post('/loginAdmin', controller.adminLogin);
router.post('/registerAdmin', controller.adminRegister);
//all Users and all Orders
router.get('/users',passport.authenticate('jwt', {session: false}), controller.allUser);
router.get('/viewOrders',passport.authenticate('jwt', {session: false}), controllerO.getAll);
//admin category
router.get('/getCategoriesAdmin',passport.authenticate('jwt', {session: false}), controllerC.getAllCategoriesAdmin);
router.get('/getCategory/:id',passport.authenticate('jwt', {session: false}),  controllerC.getById);
router.post('/createCategory',passport.authenticate('jwt', {session: false}), upload.single('image'), controllerC.createCategory);
router.patch('/editCategory/:id',passport.authenticate('jwt', {session: false}), upload.single('image'), controllerC.updateCategory);
router.delete('/deleteCategory/:id',passport.authenticate('jwt', {session: false}), controllerC.deleteCategory);
//admin products

router.get('/products/:category', passport.authenticate('jwt', {session: false}), controllerP.getAllAdminProducts);
router.post('/products/create', passport.authenticate('jwt', {session: false}), controllerP.create);
router.patch('/products/:id', passport.authenticate('jwt', {session: false}), controllerP.update);
router.delete('/products/:id', passport.authenticate('jwt', {session: false}), controllerP.delete);





module.exports = router;
/*
  private PRDLST_API = "http://localhost:8087/user/getProducts";
  private ADD_CART_API = "http://localhost:8087/user/addToCart?productId=";
  private VW_CART_API = "http://localhost:8087/user/viewCart";
  private UP_CART_API = "http://localhost:8087/user/updateCart";
  private DEL_CART_API = "http://localhost:8087/user/delCart";
  private PLC_ORD_API = "http://localhost:8087/user/placeOrder";
  private ADR_API = "http://localhost:8087/user/addAddress";
  private GT_ADR_API = "http://localhost:8087/user/getAddress";
  private ADD_PRD_API = "http://localhost:8087/admin/addProduct";
  private DEL_PRD_API = "http://localhost:8087/admin/delProduct";
  private UPD_PRD_API = "http://localhost:8087/admin/updateProducts";
  private ORD_API = "http://localhost:8087/admin/viewOrders";
  private UPD_ORD_API = "http://localhost:8087/admin/updateOrder";

* */