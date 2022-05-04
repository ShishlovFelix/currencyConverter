import React from "react";
import Header from "./componets/Header";
import Convertor from "./componets/Сonvertor";
import useGetCurrenciesQuery from "../../api";
import Loader from "./componets/Loader";

const Main: React.FC = () => {
  const { isLoadingCurrencies, currencies } = useGetCurrenciesQuery();

  if (isLoadingCurrencies) {
    return <Loader />;
  }

  if (!currencies || !currencies.length) {
    return <h1>No Data</h1>;
  }

  return (
    <div>
      <Header currencies={currencies} />
      <Convertor currencies={currencies} />
    </div>
  );
};

export default Main;
