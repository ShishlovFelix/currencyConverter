import React, { useState } from "react";
import { IConvertedCurrency } from "./useGetCurrenciesQuery";

export interface CalculatedData {
  currency?: IConvertedCurrency;
  value?: string;
}

const useGetCalculateData = (currencies: IConvertedCurrency[]) => {
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

  return {
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
  };
};

export default useGetCalculateData;
