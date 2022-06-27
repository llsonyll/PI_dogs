import axios from "axios";

export const GET_BREEDS = "GET_BREEDS";
export const GET_BREEDS_BY_NAME = "GET_BREEDS_BY_NAME";
export const CREATE_BREED = "CREATE_BREED";
export const FILTER_BREED = "FILTER_BREED";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";

const DogAPI = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 5000,
});

export const getBreeds = (page = 0) => {
  return function (dispatch) {
    return (
      DogAPI.get(`dogs?page=${page}`)
        // .then((response) => response.json())
        .then(({ data }) => {
          dispatch({ type: GET_BREEDS, payload: data });
        })
        .catch((e) => console.log(e))
    );
  };
};

export const getBreedByName = (page = 0, name) => {
  return function (dispatch) {
    return (
      DogAPI.get(`dogs?page=${page}&name=${name}`)
        // .then((response) => response.json())
        .then(({ data }) => {
          dispatch({ type: GET_BREEDS, payload: data });
        })
        .catch((e) => console.log(e))
    );
  };
};

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const { data } = await DogAPI.get("temperaments");
      dispatch({ type: GET_TEMPERAMENTS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

// export const getBreedByName = () => {
//   return function (dispatch) {
//     return fetch("breeds")
//       .then((response) => response.json())
//       .then((json) => {
//         dispatch({ type: GET_BREEDS_BY_NAME, payload: json });
//       });
//   };
// };
