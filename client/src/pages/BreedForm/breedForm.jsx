import "./breedForm.scss";
import NavBar from "../../components/NavBar";
import Pagination from "../../components/Pagination";

import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBreed } from "../../actions";

const BreedForm = () => {
  const [breed, setBreed] = useState({
    name: "",
    minHeight: 0,
    maxHeight: 0,
    minWeight: 0,
    maxWeight: 0,
    lifeSpan: "",
    temperaments: [],
  });

  const dispatch = useDispatch();

  // const [ errors, setErrors ] = useState({ })

  const [tempPage, setRempPage] = useState(1);

  const stateTemperaments = useSelector((state) => state.temperaments);

  const showTemperaments = useMemo(() => {
    return stateTemperaments.slice(
      tempPage === 1 ? 0 : (tempPage - 1) * 10,
      tempPage * 10
    );
  }, [tempPage, stateTemperaments]);

  const handlePrevPage = () => setRempPage(tempPage - 1);
  const handleNextPage = () => setRempPage(tempPage + 1);

  const handleInputChange = (e) => {
    setBreed({
      ...breed,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const selectedTemperament = (temperament) =>
    breed.temperaments.find((t) => t.id === temperament.id);

  const handleTemperamentSelection = (temperament) => {
    if (selectedTemperament(temperament)) {
      setBreed({
        ...breed,
        temperaments: breed.temperaments.filter((t) => t.id !== temperament.id),
      });
      return;
    }
    setBreed({
      ...breed,
      temperaments: breed.temperaments.concat(temperament),
    });
  };

  // const validateMaxMin = (e) => {

  // }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(breed);
    dispatch(
      createBreed({
        ...breed,
        lifeSpan:
          breed.lifeSpan > 1
            ? `${breed.lifeSpan} years`
            : `${breed.lifeSpan} year`,
        temperaments: breed.temperaments.map((t) => t.id),
      })
    );
  };

  return (
    <div className="breedForm">
      <NavBar landing={false} justify="space-between" title="Breed Detail " />
      <div className="content">
        <form onSubmit={handleFormSubmit}>
          <h2> New breed </h2>

          <div className="textField">
            <label htmlFor="name"> Name </label>
            <input type="text" name="name" onChange={handleInputChange} />
          </div>

          <div className="minmaxField">
            <div className="title"> Altura(centimetros) </div>
            <div className="fields">
              <div className="field">
                <label htmlFor="minHeight"> Min </label>
                <input
                  type="number"
                  name="minHeight"
                  min={15}
                  max={100}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="maxHeight"> Max </label>
                <input
                  type="number"
                  name="maxHeight"
                  min={20}
                  max={110}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="minmaxField">
            <div className="title"> Peso(kilogramos) </div>
            <div className="fields">
              <div className="field">
                <label htmlFor="minWeight"> Min </label>
                <input
                  type="number"
                  min={1}
                  max={40}
                  name="minWeight"
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="maxWeight"> Max </label>
                <input
                  type="number"
                  min={1}
                  max={80}
                  name="maxWeight"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="textField">
            <label htmlFor="lifeSpan"> Años de vida </label>
            <input
              type="number"
              name="lifeSpan"
              min={1}
              max={15}
              onChange={handleInputChange}
            />
          </div>

          <input type="submit" value="Enviar" />
        </form>

        <div className="temperaments">
          <div className="container ">
            {showTemperaments.map((temp) => {
              return (
                <div
                  className={
                    selectedTemperament(temp)
                      ? "temperamentBox selected"
                      : "temperamentBox"
                  }
                  key={temp.id}
                  onClick={() => handleTemperamentSelection(temp)}
                >
                  {temp.name}
                </div>
              );
            })}
          </div>

          <Pagination
            handlePreviousPage={handlePrevPage}
            handleNextPage={handleNextPage}
            disableNext={showTemperaments.length < 10}
            page={tempPage}
          />
        </div>
      </div>
    </div>
  );
};

export default BreedForm;
