
// Collections of questions 
const Questions = [{
    q: "Why so JavaScript and Java have similar name?",
    a: [{ text: "JavaScript is a stripped-down version of Java", isCorrect: false },
        { text: "JavaScript's syntax is loosely based on Java's", isCorrect: true },
        { text: "They both originated on the island of Java", isCorrect: false },
        { text: "None of the above", isCorrect: false }
    ]

},
{
    q: "When a user views a page containing a JavaScript program, which machine actually executes the script?",
    a: [{ text: "The User's machine running a Web browser", isCorrect: true },
        { text: "The Web server", isCorrect: false },
        { text: "A central machine deep within Netscape's corporate offices", isCorrect: false },
        { text: "None of the above", isCorrect: false }
    ]

},
{
    q: "______ JavaScript is also called client-side JavaScript",
    a: [{ text: "Microsoft", isCorrect: false },
        { text: "Navigator", isCorrect: true },
        { text: "LiveWire", isCorrect: false },
        { text: "Native", isCorrect: false }
    ]

},

{
    q: "__________ JavaScript is also called server-side JavaScript",
    a: [{ text: "Microsoft", isCorrect: false },
        { text: "Navigator", isCorrect: false },
        { text: "LiveWire", isCorrect: true },
        { text: "Native", isCorrect: false }
    ]

},

{
    q: "_____ JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation",
    a: [{ text: "Client-side", isCorrect: true },
        { text: "Server-side", isCorrect: false },
        { text: "Local", isCorrect: false },
        { text: "Native", isCorrect: false }
    ]

},

{
    q: "What are variables used for in JavaScript Programs?",
    a: [{ text: "Storing numbers, dates, or other values", isCorrect: true },
        { text: "Varying randomly", isCorrect: false },
        { text: "Causing high-school algebra flashbacks", isCorrect: false },
        { text: "None of the above", isCorrect: false }
    ]

},

{
    q: "Which of the following can't be done with client-side JavaScript?",
    a: [{ text: "Validating a form", isCorrect: false },
        { text: "Sending a form's contents by email", isCorrect: false },
        { text: "Storing the form's contents to a database file on the server", isCorrect: true },
        { text: "None of the above", isCorrect: false }
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
var leaderBoardEl = document.getElementById ("scontainer");
var preQuizEl = document.getElementById ("pqcontainer");
var leaderDisplay = document.getElementById("leader-board");

var startButton = document.getElementById("startQuizButton");
var goBackButton = document.getElementById ("goBackButton");
var submitButton = document.getElementById("submit");
var clearButton = document.getElementById ("clear-button");
var viewResultsEl = document.getElementById("vwresults");
var showRight = document.getElementById ("accuracy");
var partition = document. getElementById ("partition");

//Initialing the start variable to true
let id = 0;
let score = 0;
let timerCount = 0;
let timer;
let timer_reduce;
let lastQuestion = false;

// Init function that loads the first page
function init () {
    preQuizEl.style.display = 'block';
    questionsEl.style.display = 'none';
    resultsEl.style.display = 'none';
    leaderBoardEl.style.display = 'none';
}

//starts the quiz
function startQuiz() {
    console.log('started');
        timerCount = 120;
        id = 0;
        score = 0;
        lastQuestion = false;
        startTimer();
        renderQuestions(0);
}

// Function that starts start timer 
function startTimer() {
timer = setInterval(function() {
    timerElement.textContent = timerCount;
    timerCount--;
    console.log ('timer count in start timer' + timerCount);
    if (timerCount <= 0) {
       clearInterval(timer);
       displayResults();
    }
},1000);
}


//declaring and defining the function to loop through questions

function renderQuestions(increment){
  
    // Setting the index to retrieve the next question
    id = id + increment;
    console.log('index:' + id);
    if (id == Questions.length - 1) {
       lastQuestion = true;
    }

    preQuizEl.style.display = "none";
    questionsEl.style.display = 'block';
    resultsEl.style.display = 'none';
    leaderBoardEl.style.display = 'none';


    //populating the question in the quiz
    const question = document.getElementById('question');
    question.textContent = Questions[id].q;

    //population the options in the quiz
    //  console.log (Questions[id].a[0].text);
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

    //console.log ("selected: " + selected);
    if (selected == "op1") {
        isSelectedCorrect = Questions[id].a[0].isCorrect;
       // console.log (' Option 1');
    } else if (selected == "op2") {
        isSelectedCorrect = Questions[id].a[1].isCorrect;
    } else if (selected == "op3") {
        isSelectedCorrect = Questions[id].a[2].isCorrect;
    } else {
        isSelectedCorrect = Questions[id].a[3].isCorrect;
    };

    if (isSelectedCorrect) {
        score += 1;
        partition.innerText = '----------------------------------------';
        showRight.innerText = 'Correct!!';
        showRight.style.fontStyle = "italic";
    } else {
        // reduce time by 2 seconds when answer is incorrect
        partition.innerText = '----------------------------------------';
        showRight.innerText = 'Wrong!!';
        showRight.style.fontStyle = "italic";
        if (timerCount > 1) {
            timerCount -= 2;
        } else {
            displayResults();
        }
    }
}

// Upon selection of answer forwarding to next question 
function nextQuestion(event) {
    event.preventDefault();
    event.stopPropagation();

    //console.log ('id in next ' + id)
    if (id <= Questions.length - 1 && !lastQuestion)  {
    renderQuestions(1);
    } else {
            displayResults();
    }
}

// Display results at the end of the quiz or when timer is done
function displayResults() {
        timerCount = 0;
        timerElement.textContent = timerCount;
       if (timerCount <= 0) {
            clearInterval(timer);
            timer = null;
        }
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
    event.stopPropagation();
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
    event.stopPropagation();
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