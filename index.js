console.log("inicio API");
const Products = require("./Products");

var express = require("express");
var bodyParse = require("body-parser");
var cors = require("cors");
const { request, response } = require("express");

var app = express();
var router = express.Router();

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.use(cors());

app.use("/webApi", router);

/**
 * ruta para obtener lista de productos
 */
router.route("/products").get((request, response) => {
  Products.getProducts().then((result) => {
    response.json(result[0]);
  });
});

/**
 * ruta para leer un producto
 */
 router.route("/product/:idProduct").get((request, response) => {
  Products.getProduct(request.params.idProduct).then((result) => {
    response.json(result[0]);
  });
});

/**
 * ruta para insertar un producto
 */
router.route("/product").post((request, response) => {
  let product = {...request.body}
  Products.newProduct(product).then((result) => {
    response.json('Registro Completado');
  }, (err) => {
      console.log(err);
      response.json(`Se presento el siguiente error: ${err.message}`);
  });
});

/**
 * ruta para actualizar un producto
 */
 router.route("/product").put((request, response) => {
  let product = {...request.body}
  Products.updateProduct(product).then((result) => {
    response.json('Actualizacion Completada');
  }, (err) => {
      console.log(err);
      response.json(`Se presento el siguiente error: ${err.message}`);
  });
});

/**
 * ruta para delete un producto
 */
 router.route("/product").delete((request, response) => {
  let product = {...request.body}
  Products.deleteProduct(product).then((result) => {
    response.json('Registro Eliminado');
  }, (err) => {
      console.log(err);
      response.json(`Se presento el siguiente error: ${err.message}`);
  });
});

var ports = process.env.PORT || 5000;
app.listen(ports);

console.log("fin del proceso");
