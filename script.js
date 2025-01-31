document.addEventListener("DOMContentLoaded", () =>  {

    console.log("run")

    // gathering elements
    const form = document.getElementById("quiz-form");
    const submitBtn = document.getElementById("submit-btn");
    const progressBar = document.getElementById("progress-bar");
    const resultDiv = document.getElementById("result");
    const scoreDisplay = document.getElementById("score");

    // store correct answer based on index
    const correctAnswers = [1, 0, 1, 1, 2, 1, 0, 1, 1, 2, 0, 0, 0, 1, 1, 1];

    form.addEventListener("input", () => {

        const totalQuestions = correctAnswers.length;

        const answeredQuestions = Array.from(form.elements).filter((input) => input.type === "radio" && input.checked).length;

        const progress = Math.round((answeredQuestions / totalQuestions) * 100 );

        progressBar.style.width = `${progress}% `;
        progressBar.innerText = `${progress}%`;
        progressBar.setAttribute("area-valuenow", progress);

        submitBtn.disabled = answeredQuestions !== totalQuestions;

    })

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let score = 0;

        correctAnswers.forEach((correctIndex, questionIndex) => {
            const QuestionName = `q${questionIndex + 1}`;
            const options = form.elements[QuestionName];

            let userAnswer = null;

            Array.from(options).forEach((option, optionIndex) => {
                if (option.checked)
                {
                    userAnswer = optionIndex;
                }

                if (optionIndex === correctIndex) {
                    option.parentElement.style.color = "green";
                    option.parentElement.style.fontWeight = "bold";
                } else if(option.checked && optionIndex !== correctIndex) {
                    option.parentElement.style.color = "red";
                    option.parentElement.style.fontWeight = "bold";
                } else{
                    option.parentElement.style.color = "";
                    option.parentElement.style.fontWeight = "normal";
                }
            });

            if(userAnswer === correctIndex) {
                score += 1;
            }

            resultDiv.style.display = "block";
            scoreDisplay.innerHTML = `Helyes válaszok: ${score} / ${correctAnswers.length}`;

        })

    })

})