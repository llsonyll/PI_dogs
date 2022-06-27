import {
  CREATE_BREED,
  FILTER_BREED,
  GET_BREEDS,
  GET_BREEDS_BY_NAME,
  GET_TEMPERAMENTS,
} from "../actions";

const initialState = {
  page: 1,
  breeds: [],
  temperaments: [],
  currentBreed: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state,
        breeds: action.payload,
      };

    case GET_BREEDS_BY_NAME:
      return {
        ...state,
        breeds: action.payload,
      };

    case CREATE_BREED:
      return {
        ...state,
        // moviesFavourites: state.moviesFavourites.concat(action.payload)
      };

    case FILTER_BREED:
      return {
        ...state,
        // moviesFavourites: state.moviesFavourites.concat(action.payload)
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
