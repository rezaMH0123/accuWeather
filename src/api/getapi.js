import axios from "axios";

export const getweatherapi = async (cityName) => {
  const result = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=cbe0285df80d4e58aec102718232703&q=${cityName}&days=3&aqi=no&alerts=no`
  );
  const data = result.data;
  return data;
};
export const getcurrentcondition = async (cityName) => {
  const result = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=cbe0285df80d4e58aec102718232703&q=${cityName}&aqi=no`
  );
  const data = result.data;
  console.log(data);
  return data;
};
