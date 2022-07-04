import axios from "axios";

export const GET_BREEDS = "GET_BREEDS";
export const GET_BREEDS_BY_NAME = "GET_BREEDS_BY_NAME";
export const GET_BREED_BY_ID = "GET_BREED_BY_ID";
export const CLEAN_BREED = "CLEAN_BREED";
export const FILTER_BREED = "FILTER_BREED";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const SET_BREED_LOADING = "SET_BREED_LOADING";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const SET_SB_STATE = "SET_SB_STATE";

const DogAPI = axios.create({
  // baseURL: "http//localhost:3000/",
  baseURL: "https://dogs-pi-henry.herokuapp.com/",
  timeout: 5000,
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Content-Type": "application/json",
  // },
});

export const getBreeds = (page = 0) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_BREED_LOADING, payload: true });
      const { data } = await DogAPI.get(`dogs?page=${page}`);
      dispatch({ type: GET_BREEDS, payload: data });
      return {
        data,
      };
    } catch (e) {
      return {
        error: {
          name: "GetBreeds",
          message: e.message,
        },
      };
    }
  };
};

export const getBreedByName = (name) => {
  return async function (dispatch) {
    try {
      const { data } = await DogAPI.get(`dogs?name=${name}`);
      console.log(data);
      dispatch({ type: SET_BREED_LOADING, payload: true });
      dispatch({ type: GET_BREEDS_BY_NAME, payload: data });
      return { data };
    } catch (e) {
      return {
        error: {
          name: "GetBreedByName",
          message: e.message,
        },
      };
    }
  };
};

export const getBreedById = (id, fromAPI = false) => {
  return async (dispatch) => {
    try {
      const { data } = await DogAPI.get(`dogs/${id}?fromDogAPI=${fromAPI}`);
      dispatch({ type: GET_BREED_BY_ID, payload: data });
      return { data };
    } catch (e) {
      return {
        error: {
          name: "GetBreedById",
          message: e.message,
        },
      };
    }
  };
};

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const { data } = await DogAPI.get("temperaments");
      const parsedData = data.map((t) => ({ ...t, selected: false }));
      localStorage.setItem("temperaments", JSON.stringify(parsedData));
      dispatch({
        type: GET_TEMPERAMENTS,
        payload: parsedData,
      });
      return { data };
    } catch (e) {
      return {
        error: {
          name: "getTemperaments",
          message: e.message,
        },
      };
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
    } catch (error) {
      console.log(error);
      return {
        error: {
          name: "createBreed",
          status: error.response.status,
          message: error.response.data,
        },
      };
    }
  };
};

export const filterBreeds = ({ filters, myBreedsFilter: myBreeds }) => {
  return {
    type: FILTER_BREED,
    payload: {
      filters,
      myBreeds,
    },
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

export const setSbState = (state) => {
  return { type: SET_SB_STATE, payload: state };
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
