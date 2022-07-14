import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./reducers/countryReducer";
import populationReducer from "./reducers/populationReducer";

export default configureStore({
    reducer: { country: countryReducer, population: populationReducer },
});