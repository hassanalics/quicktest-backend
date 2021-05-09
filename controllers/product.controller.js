const db = require("../models");
const Product = db.products;

// Retrieve all Tutorials from the database.
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
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};

// Retrieve all Tutorials from the database.
exports.findOne = (req, res) => {
    const productId = req.params.id;
    Product.findOne({id: productId})
        .then(data => {
            res.send(data);
        })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};