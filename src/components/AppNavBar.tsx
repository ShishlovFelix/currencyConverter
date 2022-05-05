import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

import { IConvertedCurrency } from "../hooks/useGetCurrenciesQuery";

interface OwnProps {
  currencies: IConvertedCurrency[];
}

const AppNavBar: React.FC<OwnProps> = (props) => {
  const { currencies } = props;

  const filteredCurrencies = currencies.filter(
    (currency) => currency.letterCode === "EUR" || currency.letterCode === "USD"
  );

  const currenciesElements = filteredCurrencies.map((currency) => {
    const { letterCode, rate, digitalCode } = currency;

    return (
      <Typography
        key={digitalCode}
        variant="h6"
        component="div"
        gutterBottom
        style={{ margin: 10 }}
      >
        {letterCode}/{rate}
      </Typography>
    );
  });

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div
            style={{
              display: "flex",
              overflowX: "auto",
            }}
          >
            {currenciesElements}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppNavBar;
