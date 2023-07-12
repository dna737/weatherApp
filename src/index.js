//API key: d76698f4e34640fa8c434718230206
async function retrieveWeatherInfo(location) {
  try {
    let apiResponse = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=d76698f4e34640fa8c434718230206&q=${location}=3`
    );
    let jsonData = await apiResponse.json();
    console.log("data:", jsonData.forecast.forecastday[1].day.condition.text);
  } catch (error) {
    console.log("error:", error);
  }
}

retrieveWeatherInfo();
