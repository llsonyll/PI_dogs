const { Breed } = require('../db.js');

const getDogBreed = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    // Retornar listado de razas de perro
    return res.status(200).send('GET DOG BREED WITHOUT NAME');
  }

  // Razas de perro que contengan la palabra ingresada
  return res.status(200).send('GET DOG BREED WITH NAME');
}

const getDogByBreed = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).send('GET DOG BY BREED WITHOUT ID')
  }

  return res.status(200).send('GET DOG BY BREED ID')
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

  // const newBreed = await Breed.create({
  //   name,
  //   maxHeight,
  //   minHeight,
  //   maxWeight,
  //   minWeight,
  //   lifeTrail
  // });

  // return res.status(201).json(newBreed);
  return res.status(202).send('CREATE DOG BREED ROUTE');
}

module.exports = {
  getDogBreed,
  getDogByBreed,
  createDogBreed
}