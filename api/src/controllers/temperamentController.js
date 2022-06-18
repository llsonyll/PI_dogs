const { Temperament } = require('../db');

const getTemperaments = async (req, res) => {
  return res.status(200).send('GET TEMPERAMENTS ROUTE');
}

module.exports = {
  getTemperaments
}