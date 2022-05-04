import React, { useEffect, useState } from "react";
import { IConvertedCurrency } from "../../../../api";
import {
  Box,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

interface IOwnProps {
  currencies: IConvertedCurrency[];
}
interface ValueCurrencyProps {
  num: number;
}

const Convertor: React.FC<IOwnProps> = (props) => {
  const { currencies } = props;
  const [valueCurrency1, setValueCurrency1] = useState(0);
  const [valueCurrency2, setValueCurrency2] = useState(0);
  const [selectValue1, setSelectValue1] = useState(currencies[0].letterCode);
  const [selectValue2, setSelectValue2] = useState(currencies[1].letterCode);

  const handleChange1 = (event: SelectChangeEvent) => {
    setSelectValue1(event.target.value);
  };
  const handleChange2 = (event: SelectChangeEvent) => {
    setSelectValue2(event.target.value);
  };

  const selectElemets = currencies.map((currency) => {
    const { letterCode, rate } = currency;
    return <MenuItem value={rate}>{letterCode}</MenuItem>;
  });

  const setFirstToSecond = (num: number) => {
    setValueCurrency2((num * Number(selectValue1)) / Number(selectValue2));
  };

  const setSecondToFirts = (num: number) => {
    setValueCurrency1((num * Number(selectValue2)) / Number(selectValue1));
  };

  console.log(valueCurrency1, "valueCurrency1");
  console.log(valueCurrency2, "valueCurrency2");
  console.log(selectValue1, "selectValue1");
  console.log(selectValue2, "selectValue2");

  return (
    <div>
      <Grid container>
        <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ display: "flex", mr: 5, mt: "10%" }}>
            <TextField
              id="outlined-basic"
              label={valueCurrency1.toFixed(3)}
              variant="outlined"
              value={valueCurrency1}
              onChange={(e) => {
                setValueCurrency1(() => parseFloat(e.target.value));
                setFirstToSecond(parseFloat(e.target.value));
              }}
            />

            <Box>
              <Select
                sx={{ ml: 2, width: "100%" }}
                id="demo-simple-select"
                defaultValue={selectValue1}
                value={selectValue1}
                onChange={handleChange1}
              >
                {selectElemets}
              </Select>
            </Box>
          </Box>
          <Box sx={{ display: "flex", mt: "10%" }}>
            <TextField
              id="outlined-basic"
              label={valueCurrency2.toFixed(3)}
              variant="outlined"
              value={valueCurrency2}
              onChange={(e) => {
                setValueCurrency2(() => parseFloat(e.target.value));
                setSecondToFirts(parseFloat(e.target.value));
              }}
            />
            <Box>
              <Select
                sx={{ ml: 2, width: "100%" }}
                id="demo-simple-select"
                defaultValue={selectValue2}
                value={selectValue2}
                onChange={handleChange2}
              >
                {selectElemets}
              </Select>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Convertor;
