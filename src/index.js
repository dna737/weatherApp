import "./styles.css";

//API key: d76698f4e34640fa8c434718230206
async function retrieveWeatherInfo(location) {
  let userInput = sanitizeInput(location);
  try {
    let apiResponse = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=d76698f4e34640fa8c434718230206&q=53703&days=3`
    );
    let jsonData = await apiResponse.json();
    console.log("data:", jsonData);
    return jsonData.forecast.forecastday;
    // console.log("data:", jsonData.[1].day.condition.text);
  } catch (error) {
    console.log("error:", error);
  }
}

function sanitizeInput(input) {
  if (!input) return "London";
  return input;
}

retrieveWeatherInfo("").then(function (data) {
  console.log(data);
});

//TODO: implement an IIFE that displays a default country and adds event listeners to the input field.
(() => {
  retrieveWeatherInfo();
})();
