let questions = [];

async function loadQuestions() {
    try {
        const response = await fetch("questions.json");

        if (!response.ok) {
            throw new Error("Could not load questions.");
        }

        questions = await response.json();

        if (
            !Array.isArray(questions) ||
            questions.length === 0 ||
            questions.some(question =>
                typeof question.question !== "string" ||
                !Array.isArray(question.answers) ||
                !Number.isInteger(question.correct) ||
                question.correct < 0 ||
                question.correct >= question.answers.length
            )
        ) {
            throw new Error("The question data is invalid.");
        }

        showQuestion();
    } catch (error) {
        document.getElementById("quiz-card").classList.add("hidden");
        document.getElementById("error-message").classList.remove("hidden");
        console.error("Quiz loading error:", error);
    }
}

const questionCount = document.getElementById("question-count");
const scoreDisplay = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");
const progressTrack = document.getElementById("progress-track");
const questionTitle = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const quizCard = document.getElementById("quiz-card");
const resultCard = document.getElementById("result-card");
const resultTitle = document.getElementById("result-title");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");

let currentQuestion = 0;
let score = 0;
let answered = false;

function updateProgress(completed) {
    const percentage = (completed / questions.length) * 100;

    progressBar.style.width = `${percentage}%`;
    progressTrack.setAttribute("aria-valuenow", completed);
}

function showQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionCount.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;
    questionTitle.textContent = current.question;

    answersContainer.replaceChildren();
    feedback.textContent = "";
    nextButton.disabled = true;
    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "See my results →"
            : "Next question →";

    updateProgress(currentQuestion);

    current.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent = answer;
        button.type = "button";

        button.addEventListener("click", function () {
            checkAnswer(index, button);
        });

        answersContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex, selectedButton) {
    if (answered) {
        return;
    }

    answered = true;

    const current = questions[currentQuestion];
    const answerButtons =
        answersContainer.querySelectorAll(".answer-btn");

    answerButtons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedIndex === current.correct) {
        score++;
        selectedButton.classList.add("correct");
        feedback.textContent = "Correct! Well done ♡";
    } else {
        selectedButton.classList.add("incorrect");
        answerButtons[current.correct].classList.add("correct");

        feedback.textContent =
            `Not quite! The correct answer is ${current.answers[current.correct]}.`;
    }

    scoreDisplay.textContent = `Score: ${score}`;
    updateProgress(currentQuestion + 1);
    nextButton.disabled = false;
}

function showResults() {
    quizCard.classList.add("hidden");
    resultCard.classList.remove("hidden");

    updateProgress(questions.length);

    finalScore.textContent =
        `You scored ${score} out of ${questions.length}.`;

    const percentage = (score / questions.length) * 100;

    if (percentage === 100) {
        resultTitle.textContent = "Perfect score! ✨";
        resultMessage.textContent =
            "Amazing work! You got every question right.";
    } else if (percentage >= 60) {
        resultTitle.textContent = "Well done! 🌷";
        resultMessage.textContent =
            "Nice work! Keep practising and learning.";
    } else {
        resultTitle.textContent = "Keep going! 💗";
        resultMessage.textContent =
            "Every try helps you learn something new. Give it another go!";
    }

    restartButton.focus();
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    resultCard.classList.add("hidden");
    quizCard.classList.remove("hidden");

    showQuestion();
    questionTitle.focus();
}

nextButton.addEventListener("click", function () {
    if (!answered) {
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
});

restartButton.addEventListener("click", restartQuiz);

loadQuestions();