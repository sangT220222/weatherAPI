//API key: 8dc51e6e24ac47c7b26224039243003
// example of a get Request for 7 days forecast in london :
// http://api.weatherapi.com/v1/forecast.json?key=8dc51e6e24ac47c7b26224039243003&q=London&days=7&aqi=no&alerts=no

const forecast_btn = document.querySelector("#forecast");
const result_container = document.querySelector("#result");

forecast_btn.addEventListener("click", (e) => {
  e.preventDefault(); //preventing default form behaviour
  const location_name = document.querySelector("#location").value;
  get_forecast(location_name);
});

async function get_forecast(location_name) {
  try {
    const first_request = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=8dc51e6e24ac47c7b26224039243003&q=${location_name}&days=7&aqi=no&alerts=no`,
      { mode: "cors" }
    );
    const json_result = await first_request.json();
    const current_condition = await json_result.current.condition.text;
    const current_temp = await json_result.current.temp_c;
    const current_wind = await json_result.current.wind_mph;
    const current_icon = await json_result.current.condition.icon;
    const get_icon =
      "./assets/" +
      current_icon.substring(
        current_icon.indexOf("64x64"),
        current_icon.length
      );
    //   const average_temp = await json_result.forecast.forecastday[0].day.avgtemp_c;
    const location = await json_result.location.name;
    console.log(json_result);

    result_container.innerHTML = `
    <h2>Current Weather in ${location}</h2>
    <p>Temperature: ${current_temp} °C</p>
    <img src = ${get_icon} alt="weather_icon">
    <p>Description: ${current_condition}</p>
    <p>Wind Speed: ${current_wind} mph</p>`;
  } catch (error) {
    console.error("Error:", error);
  }
}
