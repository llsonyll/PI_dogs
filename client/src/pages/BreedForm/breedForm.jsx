import "./breedForm.scss";
import NavBar from "../../components/NavBar";
import Pagination from "../../components/Pagination";

import StateCard from "../../components/StateCard";
import Spinner from "../../components/Spinner";

import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBreed } from "../../actions";

import { MdError } from "react-icons/md";

const BreedForm = () => {
  const [breed, setBreed] = useState({
    name: "",
    minHeight: 0,
    maxHeight: 0,
    minWeight: 0,
    maxWeight: 0,
    lifeSpan: 0,
    temperaments: [],
  });

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    emptyFields: "",
    creationError: "",
    nonSenseError: "",
  });

  const [creationState, setCreationState] = useState("");

  const [loading, setLoading] = useState(false);

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

  const validateMaxMin = (e) => {
    const field = e.target.name;
    const value = Number(e.target.value);

    setBreed({
      ...breed,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });

    let error = "";

    switch (field) {
      case "minHeight":
        if (value === 0) {
          error = "La altura minima debe ser un valor válido(mayor a 0)";
        } else if (value >= breed.maxHeight) {
          error = "La altura minima debe ser menor a la maxima";
        } else {
          error = "";
        }
        break;
      case "maxHeight":
        if (value === 0) {
          error = "La altura maxima debe ser un valor válido (mayor a 0)";
        } else if (value <= breed.minHeight) {
          error = "La altura maxima debe ser mayor a la altura maxima";
        } else {
          error = "";
        }
        break;
      case "minWeight":
        if (value === 0) {
          error = "El peso minimo debe ser un valor válido (mayor a 0)";
        } else if (value >= breed.maxWeight) {
          error = "El peso minimo debe ser menor al peso maximo";
        } else {
          error = "";
        }
        break;
      case "maxWeight":
        if (value === 0) {
          error = "El peso maximo debe ser un valor válido (mayor a 0)";
        } else if (value <= breed.minWeight) {
          error = "El peso maximo debe ser mayor al peso minimo";
        } else {
          error = "";
        }
        break;
      default:
        error = "";
        break;
    }

    return setErrors({
      ...errors,
      nonSenseError: error,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      breed.name.length <= 0 ||
      breed.minHeight === 0 ||
      breed.minWeight === 0 ||
      breed.maxHeight === 0 ||
      breed.maxWeight === 0
    ) {
      return setErrors({
        ...errors,
        emptyFields: `These fields are required: name(${
          breed.name.length <= 0
        }), min-max height (${breed.minHeight === 0} - ${
          breed.maxHeight === 0
        }) and min-max weight (${breed.minWeight === 0} - ${
          breed.maxWeight === 0
        })`,
      });
    } else {
      setErrors({
        ...errors,
        emptyFields: "",
      });
    }

    if (!Object.keys(errors).every((er) => er !== "")) return;

    setLoading(true);

    const { status } = await dispatch(
      createBreed({
        ...breed,
        lifeSpan:
          breed.lifeSpan > 1
            ? `${breed.lifeSpan} years`
            : `${breed.lifeSpan} year`,
        temperaments: breed.temperaments.map((t) => t.id),
      })
    );

    setLoading(false);

    if (status === 201) {
      return setCreationState("successfull");
    } else {
      return setCreationState("error");
    }
  };

  return (
    <div className="breedForm">
      <NavBar landing={false} justify="space-between" title="Breed Detail " />

      {creationState === "" ? (
        loading ? (
          <Spinner />
        ) : (
          <div className="content">
            <form onSubmit={handleFormSubmit}>
              <div className="formTitle"> New breed </div>
              <div className="textField">
                <label htmlFor="name"> Nombre </label>
                <input
                  type="text"
                  name="name"
                  value={breed.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="minmaxField">
                <div className="title"> Altura(centimetros) </div>
                <div className="fields">
                  <div className="field">
                    <label htmlFor="minHeight"> Min </label>
                    <input
                      type="number"
                      name="minHeight"
                      value={breed.minHeight}
                      onChange={validateMaxMin}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="maxHeight"> Max </label>
                    <input
                      type="number"
                      name="maxHeight"
                      value={breed.maxHeight}
                      onChange={validateMaxMin}
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
                      value={breed.minWeight}
                      name="minWeight"
                      onChange={validateMaxMin}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="maxWeight"> Max </label>
                    <input
                      type="number"
                      value={breed.maxWeight}
                      name="maxWeight"
                      onChange={validateMaxMin}
                    />
                  </div>
                </div>
              </div>

              <div className="textField">
                <label htmlFor="lifeSpan"> Años de vida </label>
                <input
                  type="number"
                  name="lifeSpan"
                  value={breed.lifeSpan}
                  onChange={handleInputChange}
                />
              </div>

              {errors.nonSenseError.length > 0 ? (
                <span className="error">
                  <MdError /> {errors.nonSenseError}
                </span>
              ) : errors.emptyFields.length > 0 ? (
                <span className="error">
                  <MdError /> {errors.emptyFields}
                </span>
              ) : null}

              <input className="submitBtn" type="submit" value="Enviar" />
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
        )
      ) : (
        <StateCard success={creationState === "successfull"} />
      )}
    </div>
  );
};

export default BreedForm;
