const { Breed, Temperament } = require('../db.js');
const DogAPI = require('../utils/axios');
const LIMIT_DOGS = 8;

const getDogBreed = async (req, res) => {
  const { name, page = 0 } = req.query;

  try {
    if (!name) {
      // Retornar listado de razas de perro
      const dbBreeds = await Breed.findAll({
        offset : page === 0 ? 0 : page * LIMIT_DOGS,
        limit: LIMIT_DOGS,
        include: Temperament
      });

      if (dbBreeds.length === 0) {
        const { data: breeds } = await DogAPI.get(`breeds?limit=${LIMIT_DOGS}&page=${page}`);
        return res.status(200).json(breeds);
      } else if (dbBreeds.length === LIMIT_DOGS) {
        return res.status(200).json(dbBreeds.map(breed => {
          return {
            'name': breed.name,
            'id': breed.id,
            'life_span': breed.life_span,
            'temperament': breed.temperaments.map(temp => temp.name).join(', '),
            'height': {
              'imperial': breed.maxHeight,
              'metric': breed.minHeight,
            },
            'weight': {
              'imperial': breed.maxWeight,
              'metric': breed.minWeight,
            }
          }
          })
        );
      } else {
        // si el numero de razas en la db no es 8 sino menor se completa con el resto
        const numberToComplete = LIMIT_DOGS - dbBreeds.length;
        const { data: breeds } = await DogAPI.get(`breeds?limit=${numberToComplete}&page=0`);
        return res.status(200).json(dbBreeds.map(breed => {
          return {
            'name': breed.name,
            'id': breed.id,
            'life_span': breed.life_span,
            'temperament': breed.temperaments.map(temp => temp.name).join(', '),
            'height': {
              'imperial': breed.maxHeight,
              'metric': breed.minHeight,
            },
            'weight': {
              'imperial': breed.maxWeight,
              'metric': breed.minWeight,
            }
          }
          }).concat(breeds)
        );
      }
    }

    const regex = new RegExp(name, 'i');
    const dbBreeds = await Breed.findAll({
      offset : page === 0 ? 0 : page * LIMIT_DOGS,
      limit: LIMIT_DOGS,
      where: { name: regex },
      include: Temperament
    });

    if (dbBreeds.length === 0) {
      const { data: breeds } = await DogAPI.get(`breeds/search?q=${name}&limit=${LIMIT_DOGS}&page=${page}`);
      return res.status(200).json(breeds);
    } else if (dbBreeds.length === LIMIT_DOGS) {
      return res.status(200).json(dbBreeds.map(breed => {
        return {
          'name': breed.name,
          'id': breed.id,
          'life_span': breed.life_span,
          'temperament': breed.temperaments.map(temp => temp.name).join(', '),
          'height': {
            'imperial': breed.maxHeight,
            'metric': breed.minHeight,
          },
          'weight': {
            'imperial': breed.maxWeight,
            'metric': breed.minWeight,
          }
        }
        })
      );
    } else {
      const numberToComplete = LIMIT_DOGS - dbBreeds.length;
      const { data: breeds } = await DogAPI.get(`breeds/search?q=${name}&limit=${numberToComplete}&page=0`);
      return res.status(200).json(dbBreeds.map(breed => {
        return {
          'name': breed.name,
          'id': breed.id,
          'life_span': breed.life_span,
          'temperament': breed.temperaments.map(temp => temp.name).join(', '),
          'height': {
            'imperial': breed.maxHeight,
            'metric': breed.minHeight,
          },
          'weight': {
            'imperial': breed.maxWeight,
            'metric': breed.minWeight,
          }
        }
        }).concat(breeds)
      );
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
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
      const breed = await Breed.findByPk(id, { include: Temperament });
      if (!breed) return res.status(404).send('ID provided does not belong to any existing breed on DB')
      return res.status(200).json({
        'name': breed.name,
        'id': breed.id,
        'life_span': breed.life_span,
        'temperament': breed.temperaments.map(temp => temp.name).join(', '),
        'height': {
          'imperial': breed.maxHeight,
          'metric': breed.minHeight,
        },
        'weight': {
          'imperial': breed.maxWeight,
          'metric': breed.minWeight,
        }
      })
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
    lifeTrail,
    temperaments
  } = req.body;

  if (!name || !lifeTrail) {
    return res.status(404).send(`CREATE DOG BREED WITHOUT: name(${!!name}) and lifeTrail(${!!lifeTrail})`);
  }

  try {
    const newBreed = await Breed.create({
      name,
      maxHeight,
      minHeight,
      maxWeight,
      minWeight,
      lifeTrail
    });

    // console.log(Object.keys(newBreed.__proto__));
    if (temperaments && temperaments.length > 0) {
      await newBreed.setTemperaments(temperaments);
    }

    return res.status(201).json(newBreed);
  } catch (error) {
    return res.status(404).json({
      error: error.message
    });

  }
}

module.exports = {
  getDogBreed,
  getBreedById,
  createDogBreed
}