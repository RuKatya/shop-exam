import { createSlice } from '@reduxjs/toolkit'

interface CountryState {
    value: string
}

const initialState: CountryState = {
    value: "AF"
}

export const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        changeCountry: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { changeCountry } = countrySlice.actions

interface State {
    country: CountryState
}

export const selectCountry = (state: State) => state.country.value

export default countrySlice.reducer