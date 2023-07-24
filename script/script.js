let quizArray = [
  {
    id: 1,
    question: "Which country has the longest coastline in the world?",
    options: ["Indonesia", "Canada", "Russia", "Australia"],
    answer: "Canada",
  },
  {
    id: 2,
    question: "What is the world's most populated country?",
    options: ["USA", "India", "Russia", "China"],
    answer: "India",
  },
  {
    id: 3,
    question: "What is the capital of the Philippines?",
    options: ["Manilla", "Jakarta", "Dili", "Marawi"],
    answer: "Manilla",
  },
  {
    id: 4,
    question: "What is the World's Smallest Country?",
    options: ["Luxembourg", "Vatican City", "Monaco", "Lichtenstein"],
    answer: "Vatican City",
  },
  {
    id: 5,
    question: "In which country is the world's highest waterfall?",
    options: ["Venezuela", "USA", "Brazil", "South Africa"],
    answer: "Venezuela",
  },
  {
    id: 6,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Canberra", "Melbourne", "Adelaide"],
    answer: "Canberra",
  },
  {
    id: 7,
    question: "In which country is Mount Fuji located?",
    options: ["Peru", "Japan", "South Korea", "China"],
    answer: "Japan",
  },
  {
    id: 8,
    question: "Which of these countries uses the Shilling as its currency?",
    options: ["Malta", "Zimbabwe", "Seychelles", "Kenya"],
    answer: "Kenya",
  },
  {
    id: 9,
    question: "Which of these countries has three national capitals?",
    options: ["South Africa", "Bolivia", "Nepal", "Morocco"],
    answer: "South Africa",
  },
  {
    id: 10,
    question: "In which ocean is the island of Madagascar?",
    options: ["Pacific", "Indian", "Atlantic", "Arctic"],
    answer: "Indian",
  },
];

let userAnswers = [];
let count = 0;
let numberOfCorrectAnswers = 0;
let numberOfFalseAnswers = 0;
let numberOfNotAnswered = 0;

const generateCards = () => {
  let quizElement = document.querySelector(".quiz-part");
  let quizCards = `<div class="question-card">
                <h2>${quizArray[count].question}</h2>
                <p class="question-count">${quizArray[count].id} of 10</p>
            </div>
            <button  class="options-card" id="option-card-0" onclick="checkAnswer(event, 0)" >${quizArray[count].options[0]}</button>
            <button class="options-card" id="option-card-1" onclick="checkAnswer(event, 1)">${quizArray[count].options[1]}</button>
            <button class="options-card" id="option-card-2" onclick="checkAnswer(event, 2)">${quizArray[count].options[2]}</button>
            <button class="options-card" id="option-card-3" onclick="checkAnswer(event, 3)">${quizArray[count].options[3]}</button>
            <button class="btn next-btn" type="button" onclick="next(event)">Next <svg fill="#000000" viewBox="0 0 24 24" id="next" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="secondary" d="M17,12,5,21V3Z" style="fill: #2ca9bc; stroke-width: 2;"></path><path id="primary" d="M17,12,5,21V3Z" style="fill: none; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></g></svg></button>
            `;

  quizElement.innerHTML = quizCards;
};

const checkAnswer = (event, index) => {
  event.preventDefault();
  let answer = quizArray[count].answer;
  let userAnswer = quizArray[count].options[index];
  if (userAnswer === answer) {
    document.getElementById(`option-card-${index}`).style.backgroundColor =
      "var(--secondary)";
    numberOfCorrectAnswers++;
    document.querySelectorAll(".options-card").forEach((node) => {
      node.disabled = true;
    });
  } else {
    document.getElementById(`option-card-${index}`).style.backgroundColor =
      "var(--orange)";
    numberOfFalseAnswers++;
    let answerIndex = quizArray[count].options.findIndex(
      (item) => item === answer
    );
    document.getElementById(
      `option-card-${answerIndex}`
    ).style.backgroundColor = "var(--secondary)";
    document.querySelectorAll(".options-card").forEach((node) => {
      node.disabled = true;
    });
  }
  userAnswers.push(userAnswer);
};

const showResult = () => {
  let resultPartElement = document.querySelector(".result-part");
  resultPartElement.style.display = "grid";
  let reviewQuestionTable = `<div class="question-review">
                <table class="question-review-table">
                    <thead>
                        <tr>
                            <td class="number-row" style="color:black; font-weight:600">No.</td>
                            <td class="question-row" style="color:black; font-weight:600">
                                Question
                            </td>
                            <td class="answer-row" style="color:black; font-weight:600">Answer</td>
                            <td class="user-answer-row" style="color:black; font-weight:600">Your Answer</td>
                        </tr>
                    </thead>`;
  quizArray.map((quizItem) => {
    reviewQuestionTable =
      reviewQuestionTable +
      `<tr>
  <td class="number-row">${quizItem.id}</td>
  <td class="question-row"><p>${quizItem.question}</p></td>
  <td class="answer-row">${quizItem.answer}</td>
  <td class="user-answer-row" style="color:${
    quizItem.answer === userAnswers[quizItem.id - 1]
      ? "#5db3c1"
      : userAnswers[quizItem.id - 1] === "-"
      ? "white"
      : "#ffbd5c"
  }">${userAnswers[quizItem.id - 1]}</td>
</tr>`;
  });
  reviewQuestionTable =
    reviewQuestionTable +
    `</table>
            </div>
  `;
  resultPartElement.innerHTML =
    `
  <div class="score-card">
                <p>Your score is</p>
                <p class="score">${numberOfCorrectAnswers}</p>
            </div>
            <table class="total-review">
                <thead>
                    <tr>
                        <td>Total Questions</td>
                        <td>Correct Answers</td>
                        <td>Wrong Answers</td>
                        <td>Not Answered</td>
                    </tr>
                </thead>
                <tr>
                    <td>10</td>
                    <td>${numberOfCorrectAnswers}</td>
                    <td>${numberOfFalseAnswers}</td>
                    <td>${numberOfNotAnswered}</td>
                </tr>
            </table>` + reviewQuestionTable;
};

const next = (event) => {
  event.preventDefault();
  count++;
  if (userAnswers.length < count) {
    userAnswers.push("-");
    numberOfNotAnswered++;
  }
  if (count < 10) {
    generateCards();
  } else if ((count = 10)) {
    document.querySelector(".quiz-part").style.display = "none";
    showResult();
  }
};
const startQuiz = () => {
  document.querySelector(".home-page").style.display = "none";
  document.querySelector(".quiz-part").style.display = "grid";
  generateCards();
};

let startButton = document.querySelector(".start-btn");
startButton.addEventListener("click", startQuiz);
