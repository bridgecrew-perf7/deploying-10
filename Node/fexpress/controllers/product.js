const Product = require('../models/product');

exports.createProduct = (req, res, next) =>
{
    const title = req.body.title;
    const price = parseFloat(req.body.price);
    const image = req.file;
    if(!image || title == '' || (price || -1) <= 0)
    {
        return res.status(402).json({
            message: "Campos invalidos para la creación del producto"
        });
    }
    let imageUrl =  (image.path).replace(/public\\/, '').replace('\\', '/');
    if(process.env.NODE_ENV == 'production')
    {
        imageUrl = (image.path).replace(/public/, '').replace('\\', '/');
    }
    const product = new Product(title, price, imageUrl);
    product.saveFirebase()
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(402).json({message: err}));
}

exports.readProducts = (req, res, next) =>
{
    Product.getAllFirebase()
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(402).json({message: err}));
};

exports.readProduct = (req, res, next) =>
{
    const productId = req.params.productId;
    Product.getByIdFirebase(productId)
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(402).json({message: err}));
};

exports.updateProduct = (req, res, next) =>
{
    const image = req.file;
    const productId = req.params.productId;
    if(req.body.price)
    {
        req.body.price = parseFloat(req.body.price);
    }
    if(image)
    {
        const imageUrl = (image.path).replace(/public\\/, '').replace('\\', '/');
        req.body.imageUrl = imageUrl ;
    }
    if(!req.body.imageUrl && !req.body.price && !req.body.title)
    {
        return res.status(402).json({
            message: "No existen campos a actualizar"
        });
    }
    const product = new Product(req.body.title, req.body.price, req.body.imageUrl, productId);
    product.updateFirebase()
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(402).json({message: err}));
};

exports.deleteProduct = (req, res, next) =>
{
    const productId = req.params.productId;
    Product.deleteByIdFirebase(productId)
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(402).json({message: err}));
}