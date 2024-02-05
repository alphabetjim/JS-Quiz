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
    console.log(data);
    console.log(data.results[0]);
    console.log(data.results[0].question);
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
        console.log(options);
        // shuffle the options using sort() method
        // options.sort(() => Math.random() - 0.5);
        // console.log(options);
        for (let i=0; i<4; i++){
            document.getElementById(`radio${i+1}Label`).innerHTML = options[i];
        }
    } else {
        document.getElementById("questionNo").innerHTML = "Finished!";
        document.getElementById("question").innerHTML = `Your score is ${score}`;
        document.getElementById("text-field").remove();
        document.getElementById("button").remove();
    }
    
}

function check() {
    console.log()
    if(document.getElementById(`radio1`).checked){
        console.log("correct");
        score++;
        document.getElementById(`radio1`).checked = false;
    }
}
