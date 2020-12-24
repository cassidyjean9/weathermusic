


// AJAX call

let keyArray = [];
let key;
let response;
let respString;
let data;
let drumBeat;
let playing = false;
let respVar;
let resp;

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
/*PUT YOUR OWN KEY HERE - THIS MIGHT NOT WORK
SUBSCRIBE HERE: https://home.openweathermap.org/users/sign_up*/
const apiKey = "c84c1b8c3e68ee2ba26917c14a518980";

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;
 
  // change page
  document.getElementById("play-section").style.display = "block";
  console.log("1 inputVal =" + inputVal)
  document.getElementById("submit-button").style.display = "none";
  document.getElementById("input-city").style.display = "none";
  document.getElementById("city-display").innerHTML= inputVal;

  //check if there's already a city
  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      //athens,gr
      if (inputVal.includes(",")) {
        //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        //athens
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      form.reset();
      input.focus();
      return;
    }
  }

  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    respVar = JSON.stringify(data);
     
  })
  .catch(() => {
    msg.textContent = "Please search for a valid city 😩";
  });
  
  msg.textContent = "";
  form.reset();
  input.focus();
});

function showPlaySection() {
  
}




$("#play-button").click(function () {
   
    
    
        getKeyArray();
        getBeatTime();
        getDrumsTime();
        selectRandomNotes();
        play();
    
       
            
    });

    
$("#stop-button").click(function(){
    if (playing) {
        location.reload();

    }
})

var notes = [keyArray[0]];
//creates instances of the Tone.Synth
var polySynth = new Tone.PolySynth(7, Tone.Synth).toMaster();
var intervalId=-1;
var increase=0;

function getKeyArray(){
    console.log("keyarray function " + respVar);
    console.log("keyarray function " + respVar.weather);
    resp = JSON.parse(respVar);
    console.log(resp.weather);
    if (resp.weather[0].main == "Clear") {
        //cmaj
        keyArray = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", null];
        key= "cmaj"
        // console.log(sound1);
    }

    else if (resp.weather[0].main == "Rain") {
        //d major D, E, F♯, G, A, B, C♯
        keyArray = ["D3", "E3", "F#3", "G3", "A3", "B3", "C#", null];
        key= "c#min"
        // console.log(sound1);
    }
    else if (resp.weather[0].main == "Clouds") {
        // fminor
        keyArray = ["F3", "G3", "Ab3", "Bb3", "C3", "Db3", "Eb3", null]
        
    }
    else if(resp.weather[0].main == "Snow") {
        // eb major
        keyArray = ["Eb3", "F3", "G3", "Ab3", "Bb3", "C3", "D3", null]
        key = "cmin"
    }
    else if(resp.weather[0].main == "Fog") {
        // b minor B, C♯, D, E, F♯, G, A
        keyArray = ["B3", "C#3", "D3", "E3", "F#3", "G3", "A3", null]
        key = "cmin"
    }

    else {
        keyArray = "Array undefined";
        console.log("error main weather not defined within string function")
        alert("Sorry! Seems like there's an error. Wait a second and try again.")

    }

}

function getBeatTime(){
  resp = JSON.parse(respVar);
    beatTime = Math.floor((resp.main.temp) - 200);
    console.log(beatTime);
    return beatTime;
}


function getDrumsTime() {
  resp = JSON.parse(respVar);
    console.log("wind speed " + resp.wind.speed)
    if (resp.wind.speed < 2) {
        drumBeat = "2n"
    }
    if (resp.wind.speed > 2 && resp.wind.speed < 4){
        drumbeat = "4n"
    }
    if (resp.wind.speed > 4 && resp.wind.speed < 8){
        drumbeat = "8n"
    }
    if (resp.wind.speed > 8 && resp.wind.speed < 16){
        drumbeat = "16n"
    }
    else {
        drumbeat = "16n"
    }
}
function selectRandomNotes(){
    
    // //above code is from code pen, below code is mine

    var note1 = keyArray[Math.floor(keyArray.length*Math.random())];
    var note2 = keyArray[Math.floor(keyArray.length*Math.random())];
    var note3 = keyArray[Math.floor(keyArray.length*Math.random())];
    var note4 = keyArray[Math.floor(keyArray.length*Math.random())];

    keyArray = [note1, note2, note3, note4];
    

    console.log("randpom array " + keyArray);

}

function play() { 
  playing = true;

    const synth = new Tone.AMSynth().toMaster();



const synthPart = new Tone.Sequence(
    function(time, note) {
      synth.triggerAttackRelease(note, "10hz", time);
      
    },
    keyArray,
    "8n", "2n"
  );

  var snare = new Tone.NoiseSynth({
	'volume' : -30,
	'envelope' : {
		'attack' : 0.001,
		'decay' : 0.2,
		'sustain' : 0
	},
	'filterEnvelope' : {
		'attack' : 0.001,
		'decay' : 0.1,
		'sustain' : 0
	}
}).toMaster();

  var snarePart = new Tone.Loop(function(time){
	snare.triggerAttack(time);
}, drumBeat).start(1);

var kick = new Tone.MembraneSynth({
	'envelope' : {
		'sustain' : 0,
		'attack' : 0.8,
		'decay' : 0.8
	},
	'octaves' : 10
}).toMaster();

var kickPart = new Tone.Loop(function(time){
	kick.triggerAttackRelease('C2', '8n', time);
}, drumBeat).start(0);

  Tone.Transport.bpm.value = beatTime;
  synthPart.start();
  Tone.Transport.start();

  
  

}
