import { createSlice } from "@reduxjs/toolkit";

interface PopulationState {
  value: Array<number>;
}

const initialState: PopulationState = {
  value: [0, 500],
};

export const populationSlice = createSlice({
  name: "population",
  initialState,
  reducers: {
    changePopulation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changePopulation } = populationSlice.actions;

interface State {
  population: PopulationState;
}

export const selectPopulation = (state: State) => state.population.value;

export default populationSlice.reducer;
