
// Collections of questions 
const Questions = [{
    id: 0,
    q: "What is capital of India?",
    a: [{ text: "gandhinagar", isCorrect: false },
        { text: "Surat", isCorrect: false },
        { text: "Delhi", isCorrect: true },
        { text: "mumbai", isCorrect: false }
    ]

},
{
    id: 1,
    q: "What is the capital of Thailand?",
    a: [{ text: "Lampang", isCorrect: false, isSelected: false },
        { text: "phuket", isCorrect: false },
        { text: "Ayutthaya", isCorrect: false },
        { text: "Bangkok", isCorrect: true }
    ]

},
{
    id: 2,
    q: "What is the capital of Gujarat",
    a: [{ text: "surat", isCorrect: false },
        { text: "vadodara", isCorrect: false },
        { text: "gandhinagar", isCorrect: true },
        { text: "rajkot", isCorrect: false }
    ]

}

]
//HTML Querying Elements
var timerElement = document.getElementById("timer-count");
var finalScore = document.getElementById("final-score");
var leaderBoardScore = document.getElementById("lbscore");
var userInitials = document.getElementById ("initials");

var resultsEl =document.getElementById("rcontainer");
var questionsEl = document.getElementById("qcontainer");
var leaderBoardEl = document.getElementById ("high-scores-container");
var preQuizEl = document.getElementById ("pqcontainer");
var leaderDisplay = document.getElementById("leader-board");

var startButton = document.getElementById("startQuizButton");
var goBackButton = document.getElementById ("goBackButton");
var submitButton = document.getElementById("submit");
var clearButton = document.getElementById ("clear-button");
var viewResultsEl = document.getElementById("vwresults");

//Initialing the start variable to true
var start = true;
var id = 0;
var score = 0;
var timerCount = 0;
var timer;


function init () {
    preQuizEl.style.display = 'block';
    questionsEl.style.display = 'none';
    resultsEl.style.display = 'none';
    leaderBoardEl.style.display = 'none';
}

function startQuiz() {
    console.log('started');
    if (start) {
        timerCount = 20;
        id = 0;
        score =0;
        startTimer();
        renderQuestions(0);
    }
}

function startTimer() {
//sets timer
timer = setInterval(function() {
    timerElement.textContent = timerCount;
    timerCount--;
    if (timerCount <= 0) {
        clearInterval(timer);
        displayResults(); 
    }
},1000);
}

// reduce time function declaration that will called when answers are wrong!
function reduceTime() {
    timer = setInterval(function() {
        timerCount = timerCount - 2;
        timerElement.textContent = timerCount;
        if (timerCount <= 0) {
            clearInterval(timer);
            displayResults(); 
        }
    },1000);
}


//declaring and defining the function to loop through questions

function renderQuestions(increment){
  
    id = id + increment;
    console.log('index:' + id);

    if (id > Questions.length - 1 ) {
        displayResults();
        return;
    }

    preQuizEl.style.display = "none";
    questionsEl.style.display = 'block';
    resultsEl.style.display = 'none';
    leaderBoardEl.style.display = 'none';

    //populating the question in the quiz
    const question = document.getElementById('question');
    question.textContent = Questions[id].q;


    //population the options in the quiz
    console.log (Questions[id].a[0].text);
    const op1 = document.getElementById('op1');
    op1.textContent = Questions[id].a[0].text;

    const op2 = document.getElementById("op2");
    op2.innerText = Questions[id].a[1].text;

    const op3 = document.getElementById("op3");
    op3.innerText = Questions[id].a[2].text;

    const op4 = document.getElementById("op4");
    op4.innerText = Questions[id].a[3].text;
}

// Validate if the answer is correct 
function evaluateAnswer(event){
    event.stopPropagation();
    event.preventDefault();
    let selected = event.target.id;
    let isSelectedCorrect;
    console.log ("selected: " + selected);
    if (selected == "op1") {
        isSelectedCorrect = Questions[id].a[0].isCorrect;
        console.log (' Option 1');
    } else if (selected == "op2") {
        isSelectedCorrect = Questions[id].a[1].isCorrect;
    } else if (selected == "op3") {
        isSelectedCorrect = Questions[id].a[2].isCorrect;
    } else {
        isSelectedCorrect = Questions[id].a[3].isCorrect;
    };

    if (isSelectedCorrect) {
        score += 1;
    } else {
    // reduce time by 2 seconds when answer is incorrect
        reduceTime();
    }
}

// Upon selection of answer forwarding to next question 
function nextQuestion(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log ('id in next ' + id)
    if (id <= Questions.length - 1) {
    renderQuestions(1);
    } else {
            displayResults();
    }
}

// Display results at the end of the quiz or when timer is done
function displayResults() {
    timerCount = 0;
        timerElement.textContent = timerCount;
        if (timerCount === 0) {
            clearInterval(timer);}
    console.log(resultsEl)
    leaderBoardEl.style.display = 'none';
    questionsEl.style.display = 'none';
    preQuizEl.style.display = "none";
    resultsEl.style.display = 'block';
    finalScore.textContent = score;
}


//display user and score pulling from local Storage
function viewResults(event) {
    event.preventDefault();
    leaderBoardScore.textContent = localStorage.getItem("userScore");
    userInitials.textContent = localStorage.getItem("userInitials"); 
    questionsEl.style.display = 'none';
    preQuizEl.style.display = "none";
    resultsEl.style.display = 'none';
    leaderBoardEl.style.display = 'block';
    leaderDisplay.style.display ='block';
}

//Clearing leader board score
function clearResults(event) {
    event.preventDefault();
    questionsEl.style.display = 'none';
    preQuizEl.style.display = "none";
    resultsEl.style.display = 'none';
    leaderBoardEl.style.display = 'block';
    leaderDisplay.style.display = 'none';
}


//Initial pageload 
init ();



// Start button
startButton.addEventListener ("click", startQuiz, false);
goBackButton.addEventListener ("click", init, false);

// Capturing user actions!
op1.addEventListener("click",evaluateAnswer,false);
op1.addEventListener("click",nextQuestion,false);

op2.addEventListener("click",evaluateAnswer,false);
op2.addEventListener("click",nextQuestion,false);

op3.addEventListener("click",evaluateAnswer,false);
op3.addEventListener("click",nextQuestion,false);

op4.addEventListener("click",evaluateAnswer,false);
op4.addEventListener("click",nextQuestion,false);

// Capturing initials and final score in localStorage 
submitButton.addEventListener("click", function(event){
    event.preventDefault();
    event.stopPropagation();
    const userIpInitials = document.getElementById("intials-entered").value;
    if (userIpInitials) {
        userInputInitials = document.getElementById("intials-entered").value;}
    else {
        userInputInitials = 'Player unidentified';
    }
    localStorage.setItem("userInitials", userInputInitials);
    localStorage.setItem("userScore", score);
  
}, false);

// Display view results when SubmitButton is clicked
submitButton.addEventListener("click", viewResults, false); 

// Display leader when clicking view results in the header
viewResultsEl.addEventListener("click", viewResults, false); 

//Clear button empties the component from the page
clearButton.addEventListener("click", clearResults, false)