const expressJwt = require('express-jwt');
const fs = require('fs');
path = require('path')
const RSA_PUBLIC_KEY = fs.readFileSync(path.join(__dirname , '../keys/jwtRS256.key.pub'));

const checkIfAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY,
    algorithms: ['RS256']
}); 

module.exports = app => {
    const products = require("../controllers/product.controller");

    // Retrieve all products
    app.get("/products", 
    checkIfAuthenticated,
    products.findAll);

    // Search Product By Name
    app.get("/products/search", products.findByName);

    // Retrieve Single product
    app.get("/products/:id", products.findOne);

    // Create a new Product
    app.post("/products", products.create);

    // Update a Product with id
    app.put("/products/:id", products.update);

    // Delete a Product with id
    app.delete("/products/:id", products.delete);
};