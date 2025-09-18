const Cat = require('../models/Category');
const Product = require('../models/Product');

exports.Viewhome = async (req, res) => {
    let Categories = await Cat.find();
    return res.render('users/home', { Categories });
}

exports.ViewCategory = async (req, res) => {
    let Categories = await Cat.find();

    let products = await Product.find({ category: req.params.category.toLowerCase() });

    let categoryName = req.params.category;
    return res.render('users/Category', { Categories, products, categoryName });
};



