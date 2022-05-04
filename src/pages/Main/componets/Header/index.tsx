import React from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import { IConvertedCurrency } from "../../../../api";

interface IOwnProps {
  currencies: IConvertedCurrency[];
}

const Header: React.FC<IOwnProps> = (props) => {
  const { currencies } = props;

  const filteredCurrency = currencies.filter(
    (currency) => currency.letterCode === "USD" || currency.letterCode === "EUR"
  );

  const currencyElement = filteredCurrency.map((currency) => {
    const { letterCode, rate } = currency;
    return (
      <Typography variant="h3" color="inherit" component="div">
        {letterCode} {rate.toFixed(2)}
      </Typography>
    );
  });

  console.log(currencyElement);
  return (
    <Grid container>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{ justifyContent: "space-evenly", padding: "20px" }}
        >
          {currencyElement}
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Header;
