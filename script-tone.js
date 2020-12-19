const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://rapidapi.p.rapidapi.com/weather?q=London%2Cuk&lat=0&lon=0&callback=test&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "1eccaf3740msh364dc2284432fb8p1ee4a0jsnfb282157efa5"
	}
};

$.ajax(settings).done(function (response) {

	console.log("main " + response.test.weather[0].main);

	if (response.weather[0].main == "Clouds"){
		let sound1 = "a4";
		console.log(sound1);
		};
	  
	else if (response.weather[0].main == "Rain") {
		let sound1 = "b4";
		console.log(sound1);
	  }
	else {
		console.log("error main weather not defined within string function")
	}

});

