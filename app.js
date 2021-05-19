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
    fetch("https://weather-api-be.herokuapp.com/apiKey")
    .then(apikeyResponse => {
        return apikeyResponse.json();
    })
    .then(({apiKey}) => {
        const api = `https://api.openweathermap.org/data/2.5/find?q=Ismailia&appid=${apiKey}&units=metric`;
        fetch(api)
        .then(Response => {
            return Response.json();
        })
        .then(data => {
            const {list} = data;
            const apiResult = list.shift();
            //Set DOM Elements from the API
            locationTimezone.textContent = apiResult.sys.country +" / "+ apiResult.name;
            temperatureDegree.textContent = apiResult.main.temp;
            temperatureDescription.textContent = apiResult.weather[0].description;
            //FORUMULA For Celsius
            let Farenheit = (apiResult.main.temp * (9 / 5)) + 32;
            //Set Icon
            setIcons(renameIcon(apiResult.weather[0].icon), document.querySelector(".icon"));
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
    })

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
    function renameIcon(icon) {
        switch (icon) {
            case "01d":
                return "CLEAR_DAY";
            case "01n":
                return "CLEAR_NIGHT";
            case "02d":
                return "PARTLY_CLOUDY_DAY";
            case "02n":
                return "PARTLY_CLOUDY_NIGHT";
            case "03d":
            case "03n":
            case "04d":
            case "04n":
                return "CLOUDY";
            case "09d":
            case "09n":
            case "10d":
            case "10n":
            case "11n":
            case "11d":
                return "RAIN";
            case "13d":
            case "13n":
                return "SNOW";
            case "50d":
            case "50n":
                return "FOG";
            default:
                return "CLEAR_DAY";
        }
    }
});