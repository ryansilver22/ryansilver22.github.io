const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/philadelphia?unitGroup=metric&key=RQSZMSAEV42SMND29GZV47C2W&contentType=json';
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
};

let poll = {
    question:"Who is your pick to win Sunday's Titans @ Eagles Game?",
    answers:[
      "Titans", "Eagles"
    ],
    pollCount:0,
    answersWeight:[100,0]

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
