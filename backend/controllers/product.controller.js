const db = require('../_helpers/db');
const Product = db.Product;

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = function (req, res) {
    let product = new Product(
        {
            title: req.body.title,
            price: req.body.price,
            inventory: req.body.inventory
        }
    );

    product.save(function (err, product) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(product)
    })
};

exports.all_product_details = function (req, res) {
    Product.find({}, function (err, product) {
        if (err) return res.status(500).send(err);
        res.send(product);
    })
};
exports.product_details = function (req, res) {
    Product.find({_id: req.params.id}, function (err, product) {
        if (err) return res.status(500).send(err);
        res.send(product);
    })
};

exports.product_update = function (req, res) {
    Product.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, function (err, product) {
        if (err) return res.status(500).send(err);
        res.send(product);
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};