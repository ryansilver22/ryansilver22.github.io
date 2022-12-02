/** const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/philadelphia?unitGroup=metric&key=RQSZMSAEV42SMND29GZV47C2W&contentType=json';

document.getElementById("get").onclick = async function() 
  
{
  console.log("It is being read.");
  let response = await fetch(url)
  fetch(url)
    //.then(response => {
        // handle the response
    //})
    //.catch(error => {
        // handle the error
    //});

  console.log(response); 
  document.getElementById('response').innerHTML = await response.text();
}; */

var xyValues = [
  {x:10, y:38},
  {x:11, y:40},
  {x:12, y:42},
  {x:13, y:43},
  {x:14, y:45},
  {x:15, y:44},
  {x:16, y:43},
  {x:17, y:41},
];

new Chart("myChart", {
  type: "scatter",
  data: {
    datasets: [{
      pointRadius: 4,
          pointBackgroundColor: "rgba(0,0,255,1)",
      data: xyValues
    }],
  },
  options:{
    title: {
      display: true,
      text: "Hourly Gametime Forecast in Philadelphia"
    }
  }
});

var myChart = new Chart("myChart", {
  type: "scatter",
  data: {},
  options: {}
});



// Declaring the variables
let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273;
  
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;
  
      // API ID
      const api = "6d055e39ee237af35ca066f35474e9df";
  
      // API URL
      const base = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;
  
      // Calling the API
      fetch(base)
        .then((response) => {
         return response.json();
        })
        .then((data) => {
          console.log(data);
          temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C";
          summary.textContent = data.weather[0].description;
          loc.textContent = data.name + "," + data.sys.country;
          let icon1 = data.weather[0].icon;
          icon.innerHTML = `<img src="icons/${icon1}.svg" style= 'height:10rem'/>`;
        });
    });
  }
});


let poll = {
    question:"Who is your pick to win Sunday's Titans @ Eagles Game?",
    answers:[
      "Titans", "Eagles"
    ],
    pollCount:100,
    answersWeight:[50,30],
    selectedAnswer:-1

  };
  
  let pollDOM = {
    question:document.querySelector(".poll .question"),
    answers:document.querySelector(".poll .answers")
  };
  
  pollDOM.question.innerText = poll.question;
  pollDOM.answers.innerHTML = poll.answers.map(function(answer,i){
    return (
      `
        <div class="answer" onclick="markAnswer('${i}')">
          ${answer}
          <span class="percentage-bar"></span>
          <span class="percentage-value"></span>
        </div>
      `
    );
  }).join("");
  
  function markAnswer(i){
    poll.selectedAnswer = +i;
    try {
      document.querySelector(".poll .answers .answer.selected").classList.remove("selected");
    } catch(msg){}
    document.querySelectorAll(".poll .answers .answer")[+i].classList.add("selected");
    showResults();
  }
  
  function showResults(){
    let answers = document.querySelectorAll(".poll .answers .answer");
    for(let i=0;i<answers.length;i++){
      let percentage = 0;
      if(i == poll.selectedAnswer){
        percentage = Math.round(
          (poll.answersWeight[i]+50) * 100 / (poll.pollCount+1)
        );
      } else {
        percentage = Math.round(
          (poll.answersWeight[i]) * 100 / (poll.pollCount+1)
        );
      }
      
      answers[i].querySelector(".percentage-bar").style.width = percentage + "%";
      answers[i].querySelector(".percentage-value").innerText = percentage + "%";
    }
  }
