import "./styles.css";

const cardsContainer = document.querySelector(".cards-container");
//API key: d76698f4e34640fa8c434718230206
async function retrieveWeatherInfo(location) {
  let userInput = sanitizeInput(location);
  console.log(
    "🚀 ~ file: index.js:7 ~ retrieveWeatherInfo ~ userInput:",
    userInput
  );
  try {
    let apiResponse = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=d76698f4e34640fa8c434718230206&q=${userInput}&days=3`
    );
    let jsonData = await apiResponse.json();
    console.log("data:", jsonData);

    let daysArray = jsonData.forecast.forecastday;
    console.log(
      "🚀 ~ file: index.js:15 ~ retrieveWeatherInfo ~ daysArray:",
      daysArray
    );

    for (let i = 0; i < daysArray.length; i++) {
      createWeatherCard(daysArray[i], i);
    }
  } catch (error) {
    console.log("error:", error);
  }
}

function sanitizeInput(input) {
  if (!input) return "London";
  return input;
}

function activateSubmitButton() {
  const submitButton = document.querySelector(".submit-button");
  submitButton.addEventListener("click", () => {
    const inputValue = document.getElementById("search").value;
    retrieveWeatherInfo(inputValue);
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

//TODO: implement an IIFE that displays a default country and adds event listeners to the input field.
(() => {
  retrieveWeatherInfo();
  activateSubmitButton();
})();
