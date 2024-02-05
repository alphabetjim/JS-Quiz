// const questions = [["What was the title of the George Orwell's dystopian novel featuring the phrase 'doublethink'?", "1984"], ["What is the name given to the Friday before Easter?", "Good Friday"]];
var questionNo = 1;
var score = 0;
const API_URL = "https://opentdb.com/api.php?amount=10&category=13&difficulty=medium&type=multiple";
let questionData = [];

async function getQuestions() {
    const response = await fetch(API_URL);
    console.log(response);
    var data = await response.json();
    if (response.ok) {
        questionData = data.results;
        setup();
    } else {
        console.error('API error');
        throw new Error(data.error);
    }
}

function clickButton() {
    check();
    questionData.shift();
    questionNo++;
    setup();
}

function setup() {
    if (questionData.length != 0)
    {
        document.getElementById("question").innerHTML = questionData[0].question;
        document.getElementById("questionNo").innerHTML = questionNo;
        let options = [questionData[0].correct_answer, ...questionData[0].incorrect_answers];
        // shuffle the options using sort() method
        options.sort(() => Math.random() - 0.5);
        for (let i=0; i<4; i++){
            document.getElementById(`radio${i+1}Label`).innerHTML = options[i];
        }
    } else {
        document.getElementById("questionNo").innerHTML = "Finished!";
        document.getElementById("question").innerHTML = `Your score is ${score}`;
        document.getElementById("button").remove();
        for (let i=1; i<5; i++){
            document.getElementById(`radio${i}`).remove();
            document.getElementById(`radio${i}Label`).remove();
        }
    }
    
}

function check() {
    let correctIndex = 0;
    for(let i=1; i<5; i++){
        if (document.getElementById(`radio${i}Label`).innerHTML == questionData[0].correct_answer){
            correctIndex = i;
        }
    }
    if(document.getElementById(`radio${correctIndex}`).checked){
        console.log("correct");
        score++;
    }
    for(let i=1; i<5; i++){
        document.getElementById(`radio${i}`).checked = false;
    }
}
