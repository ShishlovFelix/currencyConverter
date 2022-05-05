import { useEffect, useState } from "react";

interface ICurrency {
  r030: number;
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
}

export interface IConvertedCurrency {
  digitalCode: number;
  fullCurrencyName: string;
  rate: number;
  letterCode: string;
  exchangeDate: string;
}

const getCurrencies = () =>
  fetch(
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<ICurrency[]>;
  });

const convertCurrency = (currency: ICurrency): IConvertedCurrency => {
  const { r030, exchangedate, cc, txt, rate } = currency;

  return {
    digitalCode: r030,
    fullCurrencyName: txt,
    rate,
    letterCode: cc,
    exchangeDate: exchangedate,
  };
};

const useGetCurrenciesQuery = () => {
  const [isLoadingCurrencies, setLoadingCurrencies] = useState<boolean>(true);
  const [currencies, setCurrencies] = useState<ICurrency[] | undefined>(
    undefined
  );

  useEffect(() => {
    getCurrencies()
      .then((res) => setCurrencies(res))
      .finally(() => {
        setLoadingCurrencies(false);
      });
  }, []);

  const convertedCurrencies = currencies?.map((currency) => {
    return convertCurrency(currency);
  });

  if (convertedCurrencies) {
    const UAH: IConvertedCurrency = {
      digitalCode: 999_999_999,
      fullCurrencyName: "Гривня",
      rate: 1,
      letterCode: "UAH",
      exchangeDate: convertedCurrencies[0].exchangeDate,
    };

    convertedCurrencies.push(UAH);
  }

  return {
    isLoadingCurrencies,
    currencies: convertedCurrencies || [],
  };
};

export default useGetCurrenciesQuery;
