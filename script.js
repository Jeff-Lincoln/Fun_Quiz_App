const questions = [
    {
        question: "Which NBA player has the best mid-range pull up jumper?",
        answers: [
            { text: "Kevin Durant", correct: false},
            { text: "Kobe Bryant", correct: false},
            { text: "Devin Booker", correct: false},
            { text: "Kyrie Irving", correct: true},
            
        ]
    },
    {
        question: "Who is the toughest 1v1 player on Youtube today?",
        answers: [
            { text: "Mooon", correct: false},
            { text: "KamSoSmooth", correct: false},
            { text: "Jlaw", correct: true},
            { text: "Jlew", correct: false},
            
        ]
    },
    {
        question: "Who has the best step back in the NBA?",
        answers: [
            { text: "Luka Doncic", correct: true},
            { text: "spider", correct: false},
            { text: "James Harden", correct: false},
            { text: "Stephen Curry", correct: false},
            
        ]
    },
    {
        question: "Who is the best guard in the NBA among the given below",
        answers: [
            { text: "Luka Doncic", correct: false},
            { text: "Spider", correct: false},
            { text: "Ja Morant", correct: false},
            { text: "Kyrie Irving", correct: true},
            
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score= 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
};

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
};

function showScore(){
    resetState();
    questionElement.innerHTML = `You have scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();