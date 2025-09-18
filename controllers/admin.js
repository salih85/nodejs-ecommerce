// const Cat =require('../models/Category')
// exports.adminDashboard=async (req,res)=>{
//     return res .render('admin/dashboard.ejs');
// }

// exports.viewCategories=async (req,res)=>{
//     let Categories=await Cat.find()
//     return res.render('admin/view-categories.ejs',{Categories});
// }

// exports.addCategories=async (req,res)=>{
//    const {name}=req.body;
//   if (name) {
//     await Cat.create({
//         id: `${Date.now()}`,
//         name: name
//     });
//     return res.redirect('/admin/view-categories');
// }
// }

// exports.deleteCategories=async (req,res)=>{
//    const {id}=req.params;
//    await Cat.deleteOne({id:id});
//   return res.redirect('/admin/view-categories');
// }

const Cat = require('../models/Category');
const Product = require('../models/Product');

// Dashboard
exports.adminDashboard = (req, res) => {
  return res.render('admin/dashboard.ejs');
};

// Categories
exports.viewCategories = async (req, res) => {
  try {
    const Categories = await Cat.find();
    return res.render('admin/view-categories.ejs', { Categories });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error loading categories");
  }
};

exports.addCategories = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      await Cat.create({ id: `${Date.now()}`, name });
    }
    return res.redirect('/admin/categories');
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error adding category");
  }
};

exports.deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;
    await Cat.deleteOne({ id });
    return res.redirect('/admin/categories');
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error deleting category");
  }
};

//  Products 
exports.viewProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.render('admin/view-products.ejs', { products });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error loading products");
  }
};

exports.addProductpage = async (req, res) => {
  try {
    const Categories = await Cat.find();
    return res.render('admin/add-product.ejs', { Categories });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error loading add product page");
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, stock, image } = req.body;

    if (!category) {
      return res.status(400).send("Category is required");
    }

    const id = `PRO${Date.now()}`;
    await Product.create({
      id,
      name,
      category: category.toLowerCase(),
      price,
      stock,
      image
    });

    return res.redirect('/admin/products');

  } catch (err) {
    console.error("Error adding product:", err);
    return res.status(500).send("Error adding product: " + err.message);
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    return res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error deleting product");
  }
};
