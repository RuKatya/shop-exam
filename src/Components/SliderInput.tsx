import { Box, Slider, Typography } from "@mui/material";
import { SliderProps } from "../interface";

const SliderInput = (props: SliderProps) => {
  const { numberOfPopulation, setNumberOfPopulation } = props;

  //Show the current value of slider
  function valuetext(numberOfPopulation: number) {
    return `${numberOfPopulation}`;
  }

  //Change the value of min/max populatuib
  const handleChange = (event: Event, newValue: number | number[]) => {
    setNumberOfPopulation(newValue as number[]);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography id="input-slider" sx={{ textAlign: "center" }}>
        Population
      </Typography>
      <Slider
        value={numberOfPopulation}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={500}
      />
    </Box>
  );
};

export default SliderInput;
