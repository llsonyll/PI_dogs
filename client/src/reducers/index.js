import {
  CREATE_BREED,
  FILTER_BREED,
  GET_BREEDS,
  GET_BREEDS_BY_NAME,
  GET_BREED_BY_ID,
  GET_TEMPERAMENTS,
  SET_BREED_LOADING,
  NEXT_PAGE,
  PREV_PAGE,
  CLEAN_BREED,
} from "../actions";

const initialState = {
  page: 1,
  breeds: [],
  loadingBreeds: false,
  temperaments: localStorage.getItem("temperaments")
    ? JSON.parse(localStorage.getItem("temperaments"))
    : [],
  filters: {
    breedFilters: [],
    myBreedsFilter: false,
  },
  filtersActive: false,
  filteredBreeds: [],
  // filteredBreeds: {
  //   breeds: [],
  //   myBreeds: false,
  // },
  currentBreed: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state,
        breeds: action.payload,
        loadingBreeds: false,
      };
    case GET_BREEDS_BY_NAME:
      return {
        ...state,
        breeds: action.payload,
      };
    case GET_BREED_BY_ID:
      return {
        ...state,
        currentBreed: action.payload,
      };
    case CREATE_BREED:
      return {
        ...state,
        // moviesFavourites: state.moviesFavourites.concat(action.payload)
      };
    case FILTER_BREED:
      const { myBreeds, filters } = action.payload;
      const filtered = state.breeds
        .filter((breed) => {
          if (myBreeds) {
            return Object.keys(breed).length === 6;
          }
          return true;
        })
        .filter((breed) => {
          if (myBreeds && filters.length === 0) return true;
          if (!breed.temperament) return false;
          return (
            breed.temperament.split(", ").filter((t) => {
              return !!filters.find((filter) => {
                return filter.name === t;
              });
            }).length > 0
          );
        });

      return {
        ...state,
        filtersActive: filters.length > 0 || myBreeds,
        filteredBreeds: filtered,
        // filteredBreeds: {
        //   breeds: filtered,
        //   myBreeds,
        // },
        filters: {
          breedFilters: filters,
          myBreedsFilter: myBreeds,
        },
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case SET_BREED_LOADING:
      return {
        ...state,
        loadingBreeds: action.payload,
      };
    case NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case PREV_PAGE:
      return {
        ...state,
        page: state.page - 1,
      };
    case CLEAN_BREED:
      return {
        ...state,
        currentBreed: {},
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
