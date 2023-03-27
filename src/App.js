import React, { useEffect, useState } from "react";
import { getweatherapi, getcurrentcondition } from "./api/getapi";
import CurrentDay from "./components/currentDay";
import Weekday from "./components/weekday";
import { getday } from "./helpers/helperFunction";

function App() {
  const [inputValue, setInputValue] = useState();
  const [weatherDays, setWeatherDays] = useState();
  const [iconSrc, setIconSrc] = useState();
  const [avgtemp, setAvgtemp] = useState();
  const [conditiontext, setConditiontext] = useState();
  const [condition24, setCondition24] = useState([]);
  const [date, setDate] = useState();
  const singleDayClick = async (item) => {
    if (item === 0) {
      setIconSrc(weatherDays?.current?.condition?.icon);
      setAvgtemp(weatherDays?.current?.feelslike_f);
      setDate(weatherDays?.current?.last_updated);
      setConditiontext(weatherDays?.current?.condition?.text);
      setCondition24(weatherDays?.forecast?.forecastday[0]?.hour);
    } else {
      setIconSrc(weatherDays?.forecast?.forecastday[item].day.condition.icon);
      setAvgtemp(weatherDays?.forecast?.forecastday[item].day.avgtemp_f);
      setDate(weatherDays?.forecast?.forecastday[item].date);
      setConditiontext(
        weatherDays?.forecast?.forecastday[item].day.condition.text
      );
      setCondition24(weatherDays?.forecast?.forecastday[item]?.hour);
    }
  };
  const getweather = async () => {
    const weather = await getweatherapi(inputValue);
    setWeatherDays(weather);
    return weather;
  };

  useEffect(() => {
    if (inputValue) {
      getweather();
    }
    getday();
  }, [inputValue]);
  useEffect(() => {
    if (inputValue) {
      setIconSrc(weatherDays?.current?.condition?.icon);
      setAvgtemp(weatherDays?.current?.feelslike_f);
      setDate(weatherDays?.current?.last_updated);
      setConditiontext(weatherDays?.current?.condition?.text);
      setCondition24(weatherDays?.forecast?.forecastday[0]?.hour);
    }
  }, [inputValue]);
  console.log(condition24);

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <div className="bg-gray-100 shadow-xl rounded-md w-full md:w-[500px] h-[800px]">
        <div className="p-4 mt-8">
          <h1 className="text-5xl text-center text-blue-400 font-sans">
            AccuWeather
          </h1>
          <form className="flex flex-col items-center">
            <label className="mb-3" htmlFor="city">
              Enter a location for weather information
            </label>
            <input
              className="shadow appearance-none border rounded w-[90%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="city"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
          {inputValue ? (
            <div className="location p-4 mt-2 flex">
              <span className="mr-4">Results for</span>
              <span className="font-bold">
                {`${
                  weatherDays?.location?.name === undefined
                    ? ""
                    : weatherDays?.location?.name
                },${
                  weatherDays?.location?.region === undefined
                    ? ""
                    : weatherDays?.location?.region
                },${
                  weatherDays?.location?.country === undefined
                    ? ""
                    : weatherDays?.location?.country
                }`}
              </span>
            </div>
          ) : null}
        </div>
        {inputValue ? (
          <CurrentDay
            iconSrc={iconSrc}
            avgtemp={avgtemp}
            date={getday(date)}
            conditiontext={conditiontext}
            condition24={condition24}
          />
        ) : null}
        <div className=" flex justify-between p-8">
          {inputValue &&
            weatherDays?.forecast?.forecastday.map((item, key) => (
              <Weekday
                iconSrc={item.day.condition.icon}
                date={getday(item.date).substring(0, 3)}
                singleDayClick={() => singleDayClick(key)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
export default App;
