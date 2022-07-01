import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");
  const [icon, setIcon] = useState({});
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`
        );
        const data = res.data;
        setTemp(data.main.temp);
        setWind(data.wind.speed);
        setIcon({ code: data.weather[0].icon, alt: data.weather[0].description });
      } catch (err) {
        console.log(err);
      }
    };

    fetchWeather();
  }, [API_KEY, capital]);
  console.log(icon);

  if (Object.values(icon).length > 0) {
    const iconURL = `https://openweathermap.org/img/wn/${icon.code}@2x.png`;
    return (
      <>
        <h1>Weather in {capital}</h1>
        <p>Temperature {temp} celsius</p>
        <img
          alt={`icon of ${icon.alt} for current weather in ${capital}`}
          src={iconURL}
        />
        <p>wind {wind} m/s</p>
      </>
    );
  }
};
export default Weather;
