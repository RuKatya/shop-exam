import { createSlice } from "@reduxjs/toolkit";

interface PopulationState {
  number: Array<number>;
}

const initialState: PopulationState = {
  number: [0, 500],
};

export const populationSlice = createSlice({
  name: "population",
  initialState,
  reducers: {
    changePopulation: (state, action) => {
      state.number = action.payload;
    },
  },
});

export const { changePopulation } = populationSlice.actions;

interface State {
  population: PopulationState;
}

export const selectPopulation = (state: State) => state.population.number;

export default populationSlice.reducer;
