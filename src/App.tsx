import React from "react";
import { Box, CircularProgress, Container } from "@mui/material";

import AppNavBar from "./components/AppNavBar";

import useGetCurrenciesQuery from "./hooks/useGetCurrenciesQuery";
import CurrenciesConvertor from "./components/CurrenciesConvertor";

const App: React.FC = () => {
  const { currencies, isLoadingCurrencies } = useGetCurrenciesQuery();

  if (isLoadingCurrencies) {
    return <CircularProgress />;
  }

  if (!currencies.length) {
    return <h1>No data</h1>;
  }

  return (
    <Box>
      <AppNavBar currencies={currencies} />
      <Container maxWidth="xl" style={{ marginTop: 20 }}>
        <CurrenciesConvertor currencies={currencies} />
      </Container>
    </Box>
  );
};

export default App;
