import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

import { IConvertedCurrency } from "../hooks/useGetCurrenciesQuery";

interface OwnProps {
  currencies: IConvertedCurrency[];
}

interface CalculatedData {
  currency?: IConvertedCurrency;
  value?: string;
}

const CurrenciesConvertor: React.FC<OwnProps> = (props) => {
  const { currencies } = props;

  const [firstValue, setFirstValue] = useState<string>("");
  const [secondValue, setSecondValue] = useState<string>("");

  const [firstCurrency, setFirstCurrency] = React.useState<IConvertedCurrency>(
    currencies[0]
  );
  const [secondCurrency, setSecondCurrency] =
    React.useState<IConvertedCurrency>(currencies[1]);

  const calculateFirstToSecond = (props: CalculatedData) => {
    if (props.currency) {
      const num =
        (Number(firstValue) * props.currency.rate) / secondCurrency.rate;
      setSecondValue(String(Math.round(num * 100) / 100));
    }

    if (props.value) {
      const num =
        (Number(props.value) * firstCurrency.rate) / secondCurrency.rate;
      setSecondValue(String(Math.round(num * 100) / 100));
    }
  };

  const calculateSecondToFirst = (props: CalculatedData) => {
    if (props.currency) {
      const num =
        (Number(secondValue) * props.currency.rate) / firstCurrency.rate;
      setFirstValue(String(Math.round(num * 100) / 100));
    }
    if (props.value) {
      const num =
        (Number(props.value) * secondCurrency.rate) / firstCurrency.rate;
      setFirstValue(String(Math.round(num * 100) / 100));
    }
  };

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
