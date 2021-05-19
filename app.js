window.addEventListener("load", () => {
    let temperatureDescription = document.querySelector(
        ".temperature-description"
    );
    let temperatureDegree = document.querySelector(
        ".temperature-degree"
    );
    let locationTimezone = document.querySelector(
        ".location-timezone"
    );
    let temperatureSection = document.querySelector(
        ".temperature-section"
    );
    const temperatureSpan = document.querySelector(
        ".temperature span"
    );
    // get apiKey from openweathermap
    const apiKey = "";
    const api = `https://api.openweathermap.org/data/2.5/find?q=Ismailia&appid=${apiKey}&units=metric`;
    fetch(api)
    .then(Response => {
        return Response.json();
    })
    .then(data => {
        const {list} = data;
        const apiResult = list.shift();
        console.log(apiResult);
        //Set DOM Elements from the API
        locationTimezone.textContent = apiResult.sys.country +" / "+ apiResult.name;
        temperatureDegree.textContent = apiResult.main.temp;
        temperatureDescription.textContent = apiResult.weather[0].description;
        //FORUMULA For Celsius
        let Farenheit = (apiResult.main.temp * (9 / 5)) + 32;
        //Set Icon
        setIcons("PARTLY_CLOUDY_DAY", document.querySelector(".icon"));
        //Change temperature to Clesius/Farenheit
        temperatureSection.addEventListener('click', () => {
            if(temperatureSpan.textContent === "F"){
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = apiResult.main.temp;
            }
            else{
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = Math.floor(Farenheit);
            }
        });
    });
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});