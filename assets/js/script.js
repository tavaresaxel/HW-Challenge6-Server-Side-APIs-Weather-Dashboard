var apikey = "86de7b2c36c7bf67600a2051e5b6e7b2"
var dashboardEl = document.getElementById("dashboard")

function currentWeather(cityName){
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=imperial`

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)

        dashboardEl.innerHTML = `
        <h3>${data.name} (${dayjs.unix(data.dt).format("MM/DD/YYYY")}) <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=""></h3>
        <p>Temp: 75 F</p>
        <p>Wind: 8.43 MPH</p>
        <p>Humidity: 44%</p>`

        
    })

}

function fiveDayForecast(cityName){
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apikey}`

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)

        for(var i = 3; i < data.list.length ; i = i + 8  ){
            var fiveDayArray = data.list
            console.log(fiveDayArray[i])
        }
        
    })
}

currentWeather('chicago')
fiveDayForecast('Chicago')