const BNS = require('../models/bns');

const Brand = BNS.Brands;

const brands = (req, res) => {
    Brand.find()
        .then((result) =>{
            res.render('brands', {brands: result});
        })
        .catch((err) => res.status(404).render('404'));
}

const brand = (req, res) => {
    const id = req.params.id;
    Brand.findById(id)
        .then((result) =>{
            res.render('brand', {brands: result});
        })
        .catch((err) => res.status(404).render('404'));
}

const add_brand = (req, res) => {
    res.render('add_brand');
}

const add_brand_post = (req, res) => {
    const brands = new Brand(req.body);
    brands.save()
        .then(res.redirect('/brands'))
        .catch((err) => res.status(404).render('404'));
}

const edit_brand = (req, res) => {
    res.render('edit_brand');
}

const edit_brand_post = (req, res) => {
    res.render('edit_brand', {qs: req.query});
}

const del_brand = (req, res) => {
    const id = req.params.id;
    Brand.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/brands'});
        })
        .catch(err => {
            res.status(404).render('404');
        });
}


module.exports = {
    brands,
    brand,
    add_brand,
    add_brand_post,
    edit_brand,
    edit_brand_post,
    del_brand
}