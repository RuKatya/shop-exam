import { createSlice } from '@reduxjs/toolkit'

interface CountryState {
    location: string
}

const initialState: CountryState = {
    location: "AF"
}

export const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        changeCountry: (state, action) => {
            state.location = action.payload
        }
    }
})

export const { changeCountry } = countrySlice.actions

interface State {
    country: CountryState
}

export const selectCountry = (state: State) => state.country.location

export default countrySlice.reducer