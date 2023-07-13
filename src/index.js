import "./styles.css";

const cardsContainer = document.querySelector(".cards-container");
//API key: d76698f4e34640fa8c434718230206
async function hitWeatherApi(location) {
  let apiResponse = null;
  try {
    let userInput = sanitizeInput(location);

    apiResponse = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=d76698f4e34640fa8c434718230206&q=${userInput}&days=3`
    );
    return apiResponse;
  } catch {
    apiResponse = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=d76698f4e34640fa8c434718230206&q=London&days=3`
    );
    return apiResponse;
  }
}

async function retrieveWeatherDetails(apiResponse) {
  console.log(
    "🚀 ~ file: index.js:23 ~ retrieveWeatherDetails ~ apiResponse:",
    apiResponse
  );
  try {
    let jsonData = await apiResponse.json();

    let daysArray = jsonData.forecast.forecastday;
    let currLocation =
      jsonData.location.name + ", " + jsonData.location.country;
    console.log(
      "🚀 ~ file: index.js:20 ~ hitWeatherApi ~ location:",
      currLocation
    );

    return daysArray;
  } catch {
    throw new Error("failed to parse JSON!");
  }
}

function sanitizeInput(input) {
  if (!input) {
    console.log("London");
    return "London";
  }
  return input;
}

function activateSubmitButton() {
  const submitButton = document.querySelector(".submit-button");
  submitButton.addEventListener("click", () => {
    const inputValue = document.getElementById("search").value;
    setWeatherInfo(inputValue);
  });
}

function createWeatherCard(day, index) {
  //TODO: fetch the image area div using the index of the thing
  if (cardsContainer) {
    appendTopBar(day, index);
    appendDescription(day, index);
    appendImage(day, index);
  }
}

function appendTopBar(day, index) {
  const dateDiv = document.querySelector(`.date-indicator-${index}`);
  const tempDiv = document.querySelector(`.temp-indicator-${index}`);
  appendDateInfo(day, dateDiv);
  appendTempInfo(day, tempDiv);
}

function appendDateInfo(day, dateDiv) {
  dateDiv.textContent = day.date;
}

function appendTempInfo(day, tempDiv) {
  tempDiv.textContent = day.day.avgtemp_c + "°C";
}

function appendDescription(day, index) {
  const descriptionArea = document.querySelector(`.description-area-${index}`);
  descriptionArea.textContent = day.day.condition.text;
}

function appendImage(day, index) {
  const imageDiv = document.querySelector(`.image-area-${index}`);
  let image = new Image();
  image.src = day.day.condition.icon;
  imageDiv.innerHTML = "";
  imageDiv.appendChild(image);
}

function manageWeatherCards(data) {
  //data is an array that contains the forecast details of three days.
  for (let i = 0; i < data.length; i++) {
    createWeatherCard(data[i], i);
  }
}

async function setWeatherInfo(inputValue = "") {
  let apiResponse = await hitWeatherApi(inputValue);
  let data = await retrieveWeatherDetails(apiResponse);
  manageWeatherCards(data);
}

(() => {
  activateSubmitButton();
  setWeatherInfo();
})();
