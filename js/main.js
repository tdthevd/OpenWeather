
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
            document.querySelector('.description').innerText =description;
            document.querySelector('.temp').innerText = temp + '°C';
            document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + '%';
            document.querySelector('.wind').innerText = 'Wind speed: ' + speed + ' km/h';
            document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1920x1080/?"+ name+"')"
        } else {
            console.error('Weather data not available or in unexpected format.');
        }
    },



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

function httpGetAsync(url, callback) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      callback(data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

const apiKey2 = API_KEY2; // Replace with your actual API key
const url2 = `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey2}`;

// Call the httpGetAsync function with the URL and callback
httpGetAsync(url2, handleResponse);

// Define the callback function to handle the response
function handleResponse(data) {
  console.log("Response data:", data);

  // Access specific properties from the API response
  const ipAddress = data.ip_address;
  const region = data.region;
  const city = data.city;

  console.log("IP Address:", ipAddress);
  console.log("Country:", region);
  console.log("City:", city);

  let location = city+', '+region
  weather.fetchWeather(location)
}





