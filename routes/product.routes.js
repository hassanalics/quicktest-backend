module.exports = app => {
    const products = require("../controllers/product.controller");

    // Retrieve all products
    app.get("/products", products.findAll);

    app.get("/products/search", products.findByName);

    app.get("/products/:id", products.findOne);
};