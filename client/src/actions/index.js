import axios from "axios";

export const GET_BREEDS = "GET_BREEDS";
export const GET_BREEDS_BY_NAME = "GET_BREEDS_BY_NAME";
export const GET_BREED_BY_ID = "GET_BREED_BY_ID";
export const CLEAN_BREED = "CLEAN_BREED";
export const CREATE_BREED = "CREATE_BREED";
export const FILTER_BREED = "FILTER_BREED";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const SET_BREED_LOADING = "SET_BREED_LOADING";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREV_PAGE = "PREV_PAGE";

const DogAPI = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 5000,
});

export const getBreeds = (page = 0) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_BREED_LOADING, payload: true });
      const { data } = await DogAPI.get(`dogs?page=${page}`);
      dispatch({ type: GET_BREEDS, payload: data });
    } catch (error) {
      console.log("getBreeds", error);
    }
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
        .catch((e) => console.log("getBreedByName", e))
    );
  };
};

export const getBreedById = (id, fromAPI = false) => {
  return async (dispatch) => {
    try {
      const { data } = await DogAPI.get(`dogs/${id}?fromDogAPI=${fromAPI}`);
      dispatch({ type: GET_BREED_BY_ID, payload: data });
    } catch (error) {
      console.log("getBreedById", error);
    }
  };
};

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const { data } = await DogAPI.get("temperaments");
      localStorage.setItem("temperaments", JSON.stringify(data));
      dispatch({ type: GET_TEMPERAMENTS, payload: data });
    } catch (error) {
      console.log("getTemperaments", error);
    }
  };
};

export const createBreed = (breed) => {
  return async (dispatch) => {
    try {
      const { status, data } = await DogAPI.post("dogs", breed);
      return {
        status,
        data,
      };
    } catch ({ response }) {
      return {
        status: response.status,
        data: response.data,
      };
    }
  };
};

export const nextPage = () => {
  return {
    type: NEXT_PAGE,
  };
};

export const prevPage = () => {
  return {
    type: PREV_PAGE,
  };
};

export const cleanCurrentBreed = () => {
  return { type: CLEAN_BREED };
};

// export const getBreeds = (page = 0) => {
//   return function (dispatch) {
//     return (
//       DogAPI.get(`dogs?page=${page}`)
//         // .then((response) => response.json())
//         .then(({ data }) => {
//           dispatch({ type: GET_BREEDS, payload: data });
//         })
//         .catch((e) => console.log(e))
//     );
//   };
// };
