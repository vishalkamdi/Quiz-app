const questions =[

    {
        question: "which is largest animal in world",
        answers: [

            {text: "Shark", correct:false},
            {text: "blue-whale",  correct:true},
            {text: "Elephant", correct:false},
            {text: "giraffe", correct:false},

          ]
    },

    {
        question: "What does “www” stand for in a website browser?",
        answers:[
            {text: "World Wide Web",correct:true},
            {text: "word wide",correct:false},
            {text: "web web wb",correct:false},
            {text: "giraffe",correct:false},

        ]
    },

    {
        question: "How long is an Olympic swimming pool (in meters)?",
        answers:[
            {text: "100M", correct:false},
            {text: "50M",  correct:true},
            {text: "10M", correct:false},
            {text: "40M", correct:false},

        ]
    },

    {
        question: "How many languages are written from right to left",
        answers:[
            {text: "10",correct:false},
            {text: "11",correct:false},
            {text: "13",correct:false},
            {text: "12",correct:true},

        ]
    }
];

const questionElement =document.getElementById("question");
const answeButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionIndex =0;
    score=0;
    nextButton.innerHTML="Next"
    showQuestion();
}
function showQuestion(){
     resetState();
    let currentQuestion =questions[currentQuestionIndex];
    let questionNo =currentQuestionIndex + 1;
    questionElement.innerHTML =questionNo+ ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
     const button =document.createElement("button");
     button.innerHTML = answer.text;
     button.classList.add("btn");
     answeButtons.appendChild(button);
     if(answer.correct){
        button.dataset.correct =answer.correct;
     }

     button.addEventListener("click",selectAnswer);

    });
}
function resetState(){
    nextButton.style.display ="none";
    while(answeButtons.firstChild){
        answeButtons.removeChild(answeButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        console.log(isCorrect);
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answeButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";

}
 function showScore(){
    resetState();
    questionElement.innerHTML =` your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display="block"
 }

 function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
 }


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

 