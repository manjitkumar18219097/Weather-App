const API_KEY = "122eafe8033921179689db0fcc758df2";

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const weatherDiv = document.getElementById("weather");

    if (!city) {
        weatherDiv.classList.remove("hidden");
        weatherDiv.innerHTML = "<p>⚠️ Please enter a city</p>";
        return;
    }

    weatherDiv.classList.remove("hidden");
    weatherDiv.innerHTML = "<p>Loading...</p>";

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
        const res = await fetch(url);

        const data = await res.json();

       
        console.log(data);

        if (res.status !== 200) {
            throw new Error(data.message);
        }

        weatherDiv.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <div class="temp">${Math.round(data.main.temp)}°C</div>
            <p class="desc">${data.weather[0].description}</p>

            <div class="details">
                <div>💧 ${data.main.humidity}%<br>Humidity</div>
                <div>🌬 ${data.wind.speed} m/s<br>Wind</div>
            </div>
        `;
    } catch (err) {
        weatherDiv.innerHTML = `<p>❌ ${err.message || "City not found"}</p>`;
    }
}
