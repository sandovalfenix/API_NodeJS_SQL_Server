const cnx = require('./cnx');
const sql = require('mssql')

/**
 * Lista de Productos
 */
async function getProducts(){
    try {
        let pool = await sql.connect(cnx)
        let result = await pool.request().query('SELECT * FROM tbl_products')
        return result.recordsets
    }catch(err){
        throw new Error (`Se presento el siguiente error: ${err.procName}... ${err.message}`)
    }
}

/**
 * vista de un Producto
 */
 async function getProduct(idProduct){
    try {
        let pool = await sql.connect(cnx)
        let result = await pool.request()
        .input('id_product', sql.Int, idProduct)
        .query('SELECT * FROM tbl_products WHERE id_product = @id_product')
        return result.recordsets
    }catch(err){
        throw new Error (`Se presento el siguiente error: ${err.procName}... ${err.message}`)
    }
}

/**
 * Añadir Producto
 */
 async function newProduct(product){
    try {
        let pool = await sql.connect(cnx)
        let newProduct = await pool.request()
        .input('id_product', sql.Int, product.id_product)
        .input('name_product', sql.VarChar, product.name_product)
        .input('price_product', sql.Float, product.price_product)
        .input('quantity_product', sql.Int, product.quantity_product)
        .execute('pr_newProduct');

        return newProduct.recordsets
    }catch(err){
        throw new Error (`Se presento el siguiente error: ${err.procName}... ${err.message}`)
    }
}

/**
 * Actualizar Producto
 */
 async function updateProduct(product){
    try {
        let pool = await sql.connect(cnx)
        let updateProduct = await pool.request()
        .input('id_product', sql.Int, product.id_product)
        .input('name_product', sql.VarChar, product.name_product)
        .input('price_product', sql.Float, product.price_product)
        .input('quantity_product', sql.Int, product.quantity_product)
        .execute('pr_updateProduct');

        return updateProduct.recordsets
    }catch(err){
        throw new Error (`Se presento el siguiente error: ${err.procName}... ${err.message}`)
    }
}

/**
 * Eliminar Producto
 */
 async function deleteProduct(product){
    try {
        let pool = await sql.connect(cnx)
        let deleteProduct = await pool.request()
        .input('id_product', sql.Int, product.id_product)
        .execute('pr_deleteProduct');

        return deleteProduct.recordsets
    }catch(err){
        throw new Error (`Se presento el siguiente error: ${err.procName}... ${err.message}`)
    }
}

module.exports = {
    getProducts: getProducts,
    getProduct: getProduct,
    newProduct: newProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
}