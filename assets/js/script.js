var apikey = "86de7b2c36c7bf67600a2051e5b6e7b2"
var dashboardEl = document.getElementById("dashboard")
var fiveDayEl = document.getElementById("five-day")
var searchInputEl = document.getElementById("search-input")
var searchBtnEl = document.getElementById("search-btn")
var sectionBtnEl = document.getElementById("historyBtn")
var historyArray = JSON.parse(localStorage.getItem("history")) || []

function displayHistory(){
    searchBtnEl.innerHTML = ""
    for(var i = 0; i < historyArray; i++){
        sectionBtnEl.innerHTML = searchBtnEl.innerHTML+`<button type="button" class="btn btn-danger bg-danger bg-gradient w-100 mx-2 my-2">${historyArray}</button>`
        

    }
}

function populateData(event){
    var currentButton = event.target
    var cityName = currentButton.textContent
    currentWeather(cityName)
    fiveDayForecast(cityName)
}

sectionBtnEl.addEventListener("click", populateData)

function currentWeather(cityName){
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=imperial`

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)

        if(historyArray.includes(data.name)===false){
            historyArray.push(data.name)

            localStorage.setItem("history", JSON.stringify(historyArray))
        }

        dashboardEl.innerHTML = `
        <h3>${data.name} (${dayjs.unix(data.dt).format("MM/DD/YYYY")}) <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=""></h3>
        <p>Temp: 75 F</p>
        <p>Wind: 8.43 MPH</p>
        <p>Humidity: 44%</p>`

        
    })

}

function fiveDayForecast(cityName){
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apikey}&units=imperial`

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        fiveDayEl.textContent = ""

        for(var i = 3; i < data.list.length ; i = i + 8  ){
            var fiveDayArray = data.list
            console.log(fiveDayArray[i])
            var divCol = document.createElement("div")
            divCol.classList = "col-sm-2 mb-3 mb-sm-0"
            
            var divCard = document.createElement("div")
            divCard.classList = "card"

            var divBody = document.createElement("div")
            divBody.classList = "card-body"

            var h5 = document.createElement("h5")
            h5.classList = "card-title"
            h5.textContent = dayjs.unix(fiveDayArray[i].dt).format("MM/DD/YYYY")
            divBody.appendChild(h5)
            var img = document.createElement("img")
            img.src="https://openweathermap.org/img/wn/" +fiveDayArray[i].weather[0].icon +"@2x.png"
            divBody.appendChild(img)
            var pTemp = document.createElement("p")
            pTemp.classList = "card-text"
            pTemp.textContent = "temp: "+fiveDayArray[i].main.temp
            divBody.appendChild(pTemp)
            divCard.appendChild(divBody)
            divCol.appendChild(divCard)

            fiveDayEl.appendChild(divCol)
        }
        
    })
}


currentWeather('chicago')
fiveDayForecast('Chicago')

function search(){
    var cityName = searchInputEl.value

    currentWeather(cityName)
    fiveDayForecast(cityName)
}

searchBtnEl.addEventListener("click", search)