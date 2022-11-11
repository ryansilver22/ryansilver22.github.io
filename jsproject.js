let poll = {
  question:"Please enter your vote for American League MVP Award:",
  answers: [
    "Aaron Judge", "Yordan Alvarez", "Shohei Ohtani", "Bryce Harper"
  ],
  pollCount:30,
  answersWeight: [10, 10, 10],
  selectedAnswer: -1
};

let pollDOM = {
  question: document.querySelector(".poll .question"),
  answers: document.querySelector(".poll .answers")
};

pollDOM.question.innerText = poll.question;
poll.answers.innerHTML = poll.answers.map(function(answer, i) {
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

function markAnswer(i) {
  poll.selectedAnswer = +i;
  try {
    document.querySelector(".poll .answers .answer.selected").classList.remove("selected");
  } catch (msg) { }
  document.querySelectorAll(".poll .answers .answer")[+i].classList.add("selected");
  showResults();
}

function showResults() {
  let answers = document.querySelectorAll(".poll .answers .answer");
  for (let i = 0; i < answers.length; i++) {
    let percentage = 0;
    if (i == poll.selectedAnswer) {
      percentage = Math.round(
        (poll.answersWeight[i] + 1) * 100 / (poll.pollCount + 1)
      );
    } else {
      percentage = Math.round(
        (poll.answersWeight[i]) * 100 / (poll.pollCount + 1)
      );
    }
    answers[i].querySelector(".percentage-bar").style.width = percentage + "%";
    answers[i].querySelector(".percentage-value").innerText = percentage + "%";
  }
}

function markAnswer(i) {
  poll.selectedAnswer = +i;
  try {
    document.querySelector(".poll .answers .answer.selected").classList.remove("selected");
  } catch (msg) { }
  document.querySelectorAll(".poll .answers .answer")[+i].classList.add("selected");
  showResults();
}

function showResults() {
  let answers = document.querySelectorAll(".poll .answers .answer");
  for (let i = 0; i < answers.length; i++) {
    let percentage = 0;
    if (i == poll.selectedAnswer) {
      percentage = Math.round(
        (poll.answersWeight[i] + 1) * 100 / (poll.pollCount + 1)
      );
    } else {
      percentage = Math.round(
        (poll.answersWeight[i]) * 100 / (poll.pollCount + 1)
      );
    }
    answers[i].querySelector(".percentage-bar").style.width = percentage + "%";
    answers[i].querySelector(".percentage-value").innerText = percentage + "%";
  }
}
