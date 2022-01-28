import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

let coordinates = {
  lat: 24.914162,
  lng: 67.082216,
  type: "daily",
};

const WeatherInfo = () => {
  const apiKey = "01c0bb6f2e51a78a5ff3988e06a1a051";
  // Note: Handling states here...!
  const [weatherArr, setWeatherArr] = useState([]);
  // const [inputCity, setInputCity] = useState("");
  // Note: This function will call api...!
  const callApi = async () => {
    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&units=metric&appid=${apiKey}`;

    try {
      let response = await axios({
        method: "GET",
        url: api,
      });
      console.log(response);

      if (response.status === 200) {
        let data = response.data.daily;
        setWeatherArr(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Note: When this component rendered successfully then this hook will run and call the api...!
  useEffect(() => callApi(), []);

  // const weekDays = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];
  // const handleSearch = () => {
  //   callApi(inputCity);
  // };

  // const handleChangeInput = (e) => {
  //   console.log("value", e.target.value);
  //   setInputCity(e.target.value);
  // };

  return (
    <Fragment>
      <div className='Weather'>
        <h1>Weather App</h1>
        <h4>Karachi 7 Days Weather Forecast</h4>
      </div>
      {/* <div className='Search' style={{ margin: "20px" }}>
        <input
          type='text'
          style={{ padding: "10px", width: "300px" }}
          onChange={handleChangeInput}
          value={inputCity}
        />
        <button style={{ padding: "10px" }} onClick={handleSearch}>
          Search
        </button>
      </div> */}
      <div
        className='main-container'
        style={{
          display: "flex",
          flexDirection: "row",
          alignItem: "center",
          justifyContent: "center",
        }}
      >
        {weatherArr && weatherArr.length > 0 ? (
          weatherArr.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  border: "1px solid #000",
                  padding: "10px",
                  margin: "10px",
                  borderRadius: "10px",
                  backgroundColor: "grey",
                  color: "#fff",
                }}
              >
                <p>
                  Temp: {item.temp.day.toFixed(0)}°C <br /> Max Temp:
                  {item.temp.max.toFixed(0)}°C
                  <br /> Min Temp: {item.temp.min.toFixed(0)}°C
                </p>
              </div>
            );
          })
        ) : (
          <h1> Data Not Found! </h1>
        )}
      </div>
    </Fragment>
  );
};

export default WeatherInfo;
