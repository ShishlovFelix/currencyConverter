import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import React from "react";

import { IConvertedCurrency } from "../hooks/useGetCurrenciesQuery";
import useGetCalculateData from "../hooks/useGetCalculateData";

interface OwnProps {
  currencies: IConvertedCurrency[];
}

const CurrenciesConvertor: React.FC<OwnProps> = (props) => {
  const { currencies } = props;
  const {
    calculateFirstToSecond,
    calculateSecondToFirst,
    firstValue,
    setFirstValue,
    secondValue,
    setSecondValue,
    firstCurrency,
    setFirstCurrency,
    secondCurrency,
    setSecondCurrency,
  } = useGetCalculateData(currencies);

  return (
    <Grid container spacing={1}>
      <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
        <Autocomplete
          value={firstCurrency}
          onChange={(event, newValue) => {
            if (newValue) {
              setFirstCurrency(newValue);
              calculateFirstToSecond({ currency: newValue });
            }
          }}
          disablePortal
          options={currencies}
          getOptionLabel={(option) => option.letterCode}
          renderInput={(params) => (
            <TextField {...params} label="First currency" />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.letterCode}
            </Box>
          )}
        />
        <br />
        <TextField
          value={firstValue}
          onChange={(e) => {
            setFirstValue(() => e.target.value);
            calculateFirstToSecond({ value: e.target.value });
          }}
          label="Value"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
        <Autocomplete
          value={secondCurrency}
          onChange={(event, newValue) => {
            if (newValue) {
              setSecondCurrency(newValue);
              calculateSecondToFirst({ currency: newValue });
            }
          }}
          disablePortal
          options={currencies}
          getOptionLabel={(option) => option.letterCode}
          renderInput={(params) => (
            <TextField {...params} label="Second currency" />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.letterCode}
            </Box>
          )}
        />
        <br />
        <TextField
          value={secondValue}
          type="number"
          onChange={(e) => {
            setSecondValue(() => e.target.value);
            calculateSecondToFirst({ value: e.target.value });
          }}
          label="Value"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CurrenciesConvertor;
