const express = require('express');
const BNSC = require('../controllers/bnsc');

const router = express.Router();

// Brand Routes
router.get('/', BNSC.home);
router.get('/brands', BNSC.brands);
router.get('/:name/:id', BNSC.shoes);
router.get('/add-brand', BNSC.add_brand);
router.post('/add-brand', BNSC.add_brand_post);
router.get('/edit-brand', BNSC.edit_brand);
router.put('/edit-brand/:id', BNSC.edit_brand_put);
router.get('/delete-brand', BNSC.del_brand);
router.delete('/delete-brand/:id', BNSC.del_brand_delete);


// Shoe Routes

router.get('/add-shoe', BNSC.add_shoe);
router.post('/add-shoe', BNSC.add_shoe_post);
router.get('/edit-shoe', BNSC.edit_shoe);
router.put('/edit-shoe/:id', BNSC.edit_shoe_put);
router.delete('/delete-shoe/:id', BNSC.del_shoe_delete);
router.get('/delete-shoe', BNSC.del_shoe);

module.exports = router;

