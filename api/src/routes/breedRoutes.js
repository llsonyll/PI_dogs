const { Router } = require('express');
const router = Router();

const { getDogBreed, getDogByBreed, createDogBreed } = require('../controllers/breedController');

router.route('/').get(getDogBreed).post(createDogBreed);
router.route('/:id').get(getDogByBreed);

module.exports = router;