const weatherInput = document.querySelector(".weatherInput");
const weatherText = document.getElementById("weatherText");
const weatherContent = document.querySelector(".weatherContent");
const weatherIcon = document.querySelector(".weatherIcon");
const weatherTemperature = document.querySelector(".weatherTemperature");
const weatherDescriptions = document.querySelector(".weatherDescriptions");
const weatherDetails = document.querySelector(".weatherDetails");

const apikey = "2c6be44a654d9f613600360fe7c25852";

weatherInput.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = weatherText.value;
  getWeatherValues(cityName);
});

async function getWeatherValues(cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`
    );
    const data = await response.json();
    console.log(data);
    const icon = data.weather[0].icon;
    const temperature = Math.round(data.main.temp);
    const details = [
      `Hissedilen sıcaklık: ${Math.round(data.main.feels_like)}°C`,
      `Nem Oranı: ${data.main.humidity}%`,
      `Rüzgar Hızı: ${data.wind.speed} m/s`,
    ];
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" >`;
    weatherTemperature.textContent = `Sıcaklık: ${temperature}°C`;
    const detailsDiv = details.map((detail) => `<div>${detail}</div>`).join("");
    weatherDetails.innerHTML = detailsDiv;
    weatherDescriptions.textContent = "";
  } catch (error) {
    weatherDescriptions.textContent = "Geçersiz işlem lütfen tekrar deneyiniz..."
    weatherIcon.innerHTML = "";
    weatherTemperature.textContent = "";
    weatherDetails.innerHTML = "";
  }
}
