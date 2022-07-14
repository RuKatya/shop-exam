import { Box, Button, TextField } from "@mui/material";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { changeCountry } from "../store/reducers/countryReducer";

const InputSearch = () => {
  const dispatch = useDispatch();

  //The function get the value of input
  const searchCountry = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputSearch = document.querySelector(
      "input[name=searchInput]"
    ) as HTMLInputElement;

    dispatch(changeCountry(inputSearch.value));

    inputSearch.value = "";
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
      }}
      onSubmit={searchCountry}
    >
      <TextField
        sx={{ ml: 1, flex: 1 }}
        placeholder="countryIds"
        name="searchInput"
        variant="outlined"
      />
      <Button
        type="submit"
        variant="outlined"
        sx={{
          m: "0 5px",
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default InputSearch;
