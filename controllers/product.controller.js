var uuid = require('uuid');
const db = require("../models");
const Product = db.products;

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    const offset = parseInt(req.query.offset);
    const limit = parseInt(req.query.limit);
    Product.find({}, 'id image name price', { skip: offset * limit, limit: limit })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};

// Retrieve all products from the database.
exports.findOne = (req, res) => {
    const productId = req.params.id;
    Product.findOne({ id: productId })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};

// Retrieve all products from the database.
exports.findByName = (req, res) => {
    const name = req.query.name;
    const condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Product.find(condition, 'id image name price', { skip: 0, limit: 12 })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};

// Create and Save a new product
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Name can not be empty!" });
        return;
    }

    const product = new Product({
        id: uuid.v4(),
        name: req.body.name,
        image: req.body.image,
        link: req.body.link,
        price: req.body.price,
        currency: req.body.currency,
        description: req.body.description,
    });

    // Save product in the database
    product
        .save(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the product."
            });
        });
};

// Update a product by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    //   flag useFindAndModify to remove deperecation warning
    Product.findOneAndUpdate({ id: id }, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found!`
                });
            } else res.send({ message: "Product was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
};

// Delete a product with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    //   flag useFindAndModify to remove deperecation warning
    Product.findOneAndRemove({ id: id }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            } else {
                res.send({
                    message: "Product was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
};
