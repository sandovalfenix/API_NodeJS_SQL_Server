console.log("inicio API");
const DBProdcuts = require("./getProducts");
const Products = require("./Products");

var express = require("express");
var bodyP = require("body-parser");
var cors = require("cors");
const { request, response } = require("express");

var app = express();
var router = express.Router();

app.use(bodyP.urlencoded({ extended: true }));
app.use(bodyP.json());
app.use(cors());

app.use("/webApi", router);

/**
 * ruta para obtener lista de productos
 */
router.route("/products").get((request, response) => {
  DBProdcuts.getProducts().then((result) => {
    response.json(result[0]);
  });
});

/**
 * ruta para insertar un producto
 */
router.route("/product/new").post((request, response) => {
    let product = {...request.body}
    DBProdcuts.newProduct(product).then((result) => {
      response.json('Registro Completado');
    }, (err) => {
        console.log(err);
        response.json(`Se presento el siguiente error: ${err.message}`);
    });
  });

var ports = process.env.PORT || 5000;
app.listen(ports);

console.log("fin del proceso");
