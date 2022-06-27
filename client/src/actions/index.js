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

export const getBreeds = () => {
  return function (dispatch) {
    return DogAPI.get("dogs")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_BREEDS, payload: json });
      })
      .catch((e) => console.log(e));
  };
};

export const getTemperaments = () => {
  console.log("getTemperaments action");
  return async (dispatch) => {
    const { data } = await DogAPI.get("temperaments");
    dispatch({ type: GET_TEMPERAMENTS, payload: JSON.parse(data) });
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
