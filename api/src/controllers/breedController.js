const { Breed } = require('../db.js');
const axios = require("axios");

const LIMIT_DOGS = 8;
const { API_KEY } = process.env;

const getDogBreed = async (req, res) => {
  const { name, page = 0 } = req.query;
  // const path = name ? `https://api.thedogapi.com/v1/breeds/search?q=${name}&limit=${LIMIT_DOGS}&page=${page}` : `https://api.thedogapi.com/v1/breeds?limit=${LIMIT_DOGS}&page=${page}`;

  if (!name) {
    // Retornar listado de razas de perro
    const dbBreeds = await Breed.findAll({ offset : page, limit: LIMIT_DOGS});
    if (dbBreeds.length === 0) {
      const { data: breeds } = await axios.get(`https://api.thedogapi.com/v1/breeds?limit=${LIMIT_DOGS}&page=${page}`, {
        headers: {
          'x-api-key': API_KEY
        }
      });

      return res.status(200).json(breeds);
    } else if (dbBreeds.length < LIMIT_DOGS) {
      console.log(dbBreeds.length); // 3 , 5 , 7

    }
  }


  const regex = new RegExp(name, 'gi');
  const dbBreeds = await Breed.findAll({ offset : page, limit: LIMIT_DOGS, where: {
    name: regex
  }});

  if (dbBreeds.length === 0) {
    const { data: breeds } = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&limit=${LIMIT_DOGS}&page=${page}`, {
      headers: {
        'x-api-key': API_KEY
      }
    });

    return res.status(200).json(breeds);
  }

  return res.status(200).json([]);
}

const getBreedById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).send('ID is required, not provided')
  }

  const { fromDogAPI = false } = req.body;

  try {
    if (fromDogAPI) {
      const { data } =  await axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${id}`, {
        headers: {
          'x-api-key': API_KEY
        }
      })

      if (!data[0] || !data[0].breeds[0])  return res.status(404).send('ID provided does not belong to any existing breed')
      return res.status(200).json(data[0].breeds[0])

    } else {
      const breed = await Breed.findByPk(id);
      if (!breed) return res.status(404).send('ID provided does not belong to any existing breed on DB')
      return res.status(200).json(breed)
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send('Something went wrong, try it later')
  }


}

const createDogBreed = async (req, res) => {
  const {
    name,
    maxHeight,
    minHeight,
    maxWeight,
    minWeight,
    lifeTrail
  } = req.body;

  if (!name || !lifeTrail) {
    return res.status(404).send(`CREATE DOG BREED WITHOUT: name(${!!name}) and lifeTrail(${!!lifeTrail})`);
  }

  const newBreed = await Breed.create({
    name,
    maxHeight,
    minHeight,
    maxWeight,
    minWeight,
    lifeTrail
  });

  return res.status(201).json(newBreed);
}

module.exports = {
  getDogBreed,
  getBreedById,
  createDogBreed
}