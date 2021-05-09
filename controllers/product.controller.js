const db = require("../models");
const Product = db.products;

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    const offset = parseInt(req.query.offset);
    const limit = parseInt(req.query.limit);
    Product.find({}, 'id image name price', {skip: offset * limit, limit: limit})
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
    Product.findOne({id: productId})
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
    Product.find(condition, 'id image name price', {skip: 0, limit: 12})
        .then(data => {
            console.log('******** hello ********', name);
            res.send(data);
        })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving products."
        });
    });
};
