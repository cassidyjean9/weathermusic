// AJAX call
const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://rapidapi.p.rapidapi.com/weather?q=Richmond%2Cuk&lat=0&lon=0&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "1eccaf3740msh364dc2284432fb8p1ee4a0jsnfb282157efa5"
    }
};
let keyArray = [];
let key;
let response;
let respString;
let respVar;
let drumBeat;
let playing;





$.ajax(settings).done(function (response) {
    console.log(response);
   console.log(response.weather[0].main);
   respVar = response;
   return respVar;
});

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;
   
    // change page
    document.getElementById("play-section").style.display = "block";
    console.log("1 inputVal =" + inputVal)
    document.getElementById("submit-button").style.display = "none";
    document.getElementById("input-city").style.display = "none";
    document.getElementById("city-display").innerHTML= inputVal;

});


//    let synth = new Synth().toMaster();
$("#play-button").click(function () {
   
    

       if (!playing) {
           getKeyArray();
           getBeatTime();
           getDrumsTime();
           selectRandomNotes();
           play();
       }
            
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
    if (respVar.weather[0].main == "Clear") {
        //cmaj
        keyArray = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", null];
        key= "cmaj"
        // console.log(sound1);
    }

    else if (respVar.weather[0].main == "Rain") {
        //d major D, E, F♯, G, A, B, C♯
        keyArray = ["D3", "E3", "F#3", "G3", "A3", "B3", "C#", null];
        key= "c#min"
        // console.log(sound1);
    }
    else if(respVar.weather[0].main == "Clouds") {
        // fminor
        keyArray = ["F3", "G3", "Ab3", "Bb3", "C3", "Db3", "Eb3", null]
        
    }
    else if(respVar.weather[0].main == "Snow") {
        // eb major
        keyArray = ["Eb3", "F3", "G3", "Ab3", "Bb3", "C3", "D3", null]
        key = "cmin"
    }
    else if(respVar.weather[0].main == "Fog") {
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
    beatTime = Math.floor((respVar.main.temp) - 200);
    console.log(beatTime);
    return beatTime;
}

function getDrumsTime() {
    console.log("wind speed " + respVar.wind.speed)
    if (respVar.wind.speed < 2) {
        drumBeat = "2n"
    }
    if (respVar.wind.speed > 2 && respVar.wind.speed < 4){
        drumbeat = "4n"
    }
    if (respVar.wind.speed > 4 && respVar.wind.speed < 8){
        drumbeat = "8n"
    }
    if (respVar.wind.speed > 8 && respVar.wind.speed < 16){
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

  playing = true;
  

}
