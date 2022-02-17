import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./style.scss";

const MeteoForm = ({ defaultCity }) => {
  const [value, setValue] = useState("");
  const [city, setCity] = useState(defaultCity);
  const [desc, setDesc] = useState("");
  const [temperature, setTemperature] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(value);
    setValue("");
  };

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    axios
      .get(`${apiBaseUrl}?q=${city}&units=metric&lang=fr&appid=${apiKey}`)
      .then((res) => {
        setTemperature(res.data.main.temp.toFixed());
        setDesc(res.data.weather[0].description);
      })
      .catch((err) => console.log(err));
  }, [city]);

  return (
    <section className="widget-meteo">
      <div className="widget-meteo__infos">
        <p className="widget-meteo__city">{city}</p>
        <p className="widget-meteo__desc">{desc}</p>
      </div>
      <p className="widget-meteo__temp">{temperature}°C</p>
      <form className="widget-meteo__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="widget-meteo__input"
          placeholder="Entrez le nom d'une ville"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </section>
  );
};

MeteoForm.propTypes = {
  defaultCity: PropTypes.string,
};

MeteoForm.defaultProps = {
  defaultCity: "Paris",
};

export default MeteoForm;
