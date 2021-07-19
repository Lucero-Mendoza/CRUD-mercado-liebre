// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); // Se deberán listar todos los productos presentes en la base de datos JSON.


/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); // Es con GET, ya que muestra el formulario de creación para un producto
router.post('/', productsController.store); // Deberá recibir los datos del formulario de creación.


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); // Detalle de producto. Cada producto deberá contar con dos botones de acción: BORRAR y MODIFICAR.


/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id/', productsController.edit); // Botón MODIFICAR: modificará al producto correspondiente en la base de datos JSON.
router.put('/edit/:id/', productsController.update); // Recibirá datos de modificación


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
