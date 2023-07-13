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
    console.log("london");
    return "London";
  }
  return input;
}

function activateSubmitButton() {
  const submitButton = document.querySelector(".submit-button");
  submitButton.addEventListener("click", () => {
    const inputValue = document.getElementById("search").value;
    hitWeatherApi(inputValue);
    retrieveWeatherDetails(apiResponse);
    //FIXME: You can place the two functions above in another function called "updateLocation()" or something similar.
  });
}

function createWeatherCard(day, index) {
  console.log("called craeteWeatherCard");
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

//TODO: implement an IIFE that displays a default country and adds event listeners to the input field.
(async () => {
  activateSubmitButton();

  //TODO: you need to be able to call the default location without creating a "hellish" thing. LOOK AT STEPS 2 AND 3.
  let apiResponse = await hitWeatherApi();
  let data = await retrieveWeatherDetails(apiResponse);
  manageWeatherCards(data);
})();
