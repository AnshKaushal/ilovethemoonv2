(function () {
    function buildQuiz() {
        // variable to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                // variable to store the list of possible answers
                const answers = [];

                // and for each available answer...
                for (letter in currentQuestion.answers) {

                    // ...add an HTML radio button
                    answers.push(
                        `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
                );
            }
        );

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';
            }


            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        // show number of correct answers out of total
        if (numCorrect == 1) {
            resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length} <br> Sorry but you cannot access the gallery!`;
        } else if (numCorrect == 2) {
            resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length} <br> You don't have the Jigra! to access the gallery`;
        } else if (numCorrect == 0) {
            resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length} <br> Atleast attempt the quiz and show your love for moon!!!`;
        }
        
        else {
            resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length} <br> You can access the gallery now! <br> Now before going to your love (the moon!), scroll down!`;
            var element = document.getElementById("myDiv");
            element.classList.remove("disabled");
        }
        
    }

    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {
          question: "Do you love the moon?",
          answers: {
            a: "Yes",
            b: "No",
            c: "Maybe",
          },
          correctAnswer: "a",
        },
        {
          question: "What effect does moon have on you?",
          answers: {
            a: "It feels super boring when i see the moon",
            b: "The moon makes me happy!",
            c: "I dont know",
          },
          correctAnswer: "b",
        },
        {
          question: "Are you sure you can handle moon photos?",
          answers: {
            a: "Yes",
            b: "No",
            c: "Definetely!",
          },
          correctAnswer: "c",
        },
      ];

    // Kick things off
    buildQuiz();

    // Event listeners
    submitButton.addEventListener('click', showResults);
})();
