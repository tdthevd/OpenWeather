//Example fetch using pokemonapi.co
// document.querySelector('button').addEventListener('click', getFetch)

// function getFetch(){
//   const choice = document.querySelector('input').value
//   const url = 'http://dataservice.accuweather.com/locations/v1/postalcodes/search'+choice

//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }

// const config = require('./config');

let weather = {
  apiKey:API_KEY,
  fetchWeather: function (city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='
    +city 
    +'&units=metric&appid='
    +this.apiKey
    )
      .then(res => res.json()) // parse response as JSON
      .then(data => 
        this.displayWeather(data))
      },
      
      displayWeather: function (data){
        const { name } = data;
        
        if (data.weather && data.weather.length > 0) {
            const { icon, description } = data.weather[0]; // Access the first element of the 'weather' array
            const { temp, humidity }  = data.main;
            const { speed } = data.wind;
            
            console.log(name, icon, description, temp, humidity, speed);
    
            document.querySelector('.city').innerText = 'Weather in ' + name;
            document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
            document.querySelector('.description').innerText = description;
            document.querySelector('.temp').innerText = temp + '°C';
            document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + '%';
            document.querySelector('.wind').innerText = 'Wind speed: ' + speed + ' km/h';
            document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600x900/?"+ name+"')"
        } else {
            console.error('Weather data not available or in unexpected format.');
        }
    },


  // displayWeather: function (data){
  //   const { name } = data;
  //   const { icon, description } = data.weather[0];
  //   const { temp, humidity }  = data.main;
  //   const{ speed }= data.wind;
  //   console.log(name, icon,description,temp,humidity, speed);
  //   document.querySelector('.city').innerText = 'Weather in'+name;
  //   document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/01n'+icon+'@2x.png';
  //   document.querySelector('.description').innerText = description;
  //   document.querySelector('.temp').innerText = temp+'°C';
  //   document.querySelector('.temp').innerText = temp+'°C';
  //   document.querySelector('.humidity').innerText = 'Humidity:'+humidity+'%';
  //   document.querySelector('.wind').innerText = 'Windspeed:'+speed+'km/h';
  // }
  search: function(){
    this.fetchWeather(document.querySelector('.search-bar').value);
  }
}
document
.querySelector('.search button')
.addEventListener('click',function(){
weather.search()
})
document.querySelector('.search-bar').addEventListener('keydown',function(event){
  if (event.key === "Enter") {
    weather.search();
    event.preventDefault();
}
})

weather.fetchWeather('new york')



