const { escapeXML } = require('ejs');
const BNS = require('../models/bns');
const Brand = BNS.Brands;
const Shoe = BNS.Shoes;

// The Brand Controller

const home = (req, res) => {
    res.render('home')
}

const brands = (req, res) => {
    Brand.find()
        .then((result) => {
            res.render('brands', { brands: result });
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
    const id = req.query.id;
    Brand.findById(id)
        .then((result) => { res.status(200).render('edit_brand', { brand: result }) })
        .catch((err) => { res.status(404).render('404') });
}

const edit_brand_put = async (req, res) => {
    try {
      const id = req.params.id;
      const { brandNamed } = req.body;
  
        const doc = await Brand.findById(id);
        if (!doc) {
            return res.status(404).render('404');
        } 
        doc.brandName = brandNamed;
        await doc.save();
  
      res.status(200).json({ message: 'updated' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    };
}

const del_brand = async (req, res) => {
    const id = req.query.id;
    const bd = await Brand.findById(id);
    res.render('delete_brand', {id, bd} )
}

const del_brand_delete = (req, res) => {
    const id = req.params.id;
    Brand.findByIdAndDelete(id)
        .then(result => {
            res.status(200).redirect('/brands');
        })
        .catch(err => {
            res.status(404).render('404');
        });
}


// The Shoe Controller

const shoes = async (req, res) => {
    const id = req.params.id;
    brandss  = await Brand.findById(id)
    shoess = await Shoe.find({ brand: id })
    res.render('shoes', { shoes, brandss });
}

const add_shoe = (req, res) => {
    const id = req.query.id;
    Brand.findById(id)
        .then((result) => { res.render('add_shoe', { id, brand: result }) })
        .catch((err) => { res.status(404).render('404') });
}

const add_shoe_post = async (req, res) => {
    const id = req.query.id;
    const { shoeName } = req.body;
    const brandd = await Brand.findById(id);
    if (!brandd) {
        return res.status(404).json({ error: 'Brand with the specific id does not exist' })
    }

    const shoe = await Shoe.create({ shoeName: shoeName, brand: id })
    res.status(201).redirect(`/${brandd.brandName}/${id}`);
}

const edit_shoe = (req, res) => {
    const id = req.query.id;
    Shoe.findById(id)
        .then((result) => { 
            const brandId = result.brand;
            Brand.findById(brandId)
                .then((data) => { res.status(200).render( 'edit_shoe', { shoe: result, brand: data }) })
                .catch(() => { res.status(404).render('404') }); })
        .catch((err) => { res.status(404).render('404') });
}

const edit_shoe_put = async (req, res) => {
    try {
        const id = req.params.id;
        const { shoeNamed } = req.body;
    
          const doc = await Shoe.findById(id);
          const brand = Brand.findById(doc.brand);
          if (!doc) {
            return res.status(404).render('404');
          } 
          doc.shoeName = shoeNamed;
          await doc.save();
    
        res.status(200).json({message: 'updated'});
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Internal Server Error' });
    };
} 

const del_shoe = async (req, res) => {
    const id = req.query.id;
    const se = await Shoe.findById(id);
    const ft = se.brand;
    const bd = await Brand.findById(ft);
    res.render('delete_shoe', {id, se, bd})
}

const del_shoe_delete = async (req, res) => {
    const id = req.params.id; 
    const se = await Shoe.findById(id);
    ft = se.brand;
    const bd = await Brand.findById(ft);
    Shoe.findByIdAndDelete(id)
        .then(result => {
            res.status(200).redirect('/brands');
        })
        .catch(err => {
            res.status(404).render('404');
        });
}

module.exports = {
    brands,
    home,
    add_brand,
    add_brand_post,
    edit_brand,
    edit_brand_put,
    del_brand,
    del_brand_delete,
    shoes,
    add_shoe,
    add_shoe_post,
    edit_shoe,
    edit_shoe_put,
    del_shoe,
    del_shoe_delete
}