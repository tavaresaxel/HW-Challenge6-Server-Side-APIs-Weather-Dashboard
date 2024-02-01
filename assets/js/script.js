var apikey = "86de7b2c36c7bf67600a2051e5b6e7b2"

function currentWeather(cityName){
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=imperial`

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
    })

}

function fiveDayForecast(cityName){
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apikey}`

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(fuction(data){
        console.log(data)
    })
}

currentWeather('chicago')