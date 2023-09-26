const express = require('express');
const BNSC = require('../controllers/bnsc');

const router = express.Router();

router.get('/', BNSC.brands);
router.get('/:name/:id', BNSC.brand);
router.get('/add-brand', BNSC.add_brand);
router.post('/add-brand', BNSC.add_brand_post);
router.get('/edit-brand/:id', BNSC.edit_brand);
router.post('/edit-brand/:id', BNSC.edit_brand_post);
router.delete('/del-brand/:id', BNSC.del_brand);
 
module.exports = router;