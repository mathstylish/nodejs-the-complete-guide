const products = []

module.exports = {
    getAddProduct: (req, res) => {
        res.render('add-product', {
            pageTitle: 'Add Product',
            styles: ['form'],
            path: '/admin/add-product'
        })
    },
    postAddProduct: (req, res) => {
        products.push({ title: req.body.title })
        res.redirect('/')
    },
    getProducts: (req, res) => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            styles: ['shop', 'product'],
            path: '/shop'
        })
    }
};