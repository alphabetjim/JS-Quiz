// const questions = [["What was the title of the George Orwell's dystopian novel featuring the phrase 'doublethink'?", "1984"], ["What is the name given to the Friday before Easter?", "Good Friday"]];
var questionNo = 1;
var score = 0;
const API_URL = "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple";
const API_URL_ROOT = "https://opentdb.com/api.php?amount=10&category=";
const API_URL_TAIL = "&difficulty=medium&type=multiple";
let questionData = [];
const categories=[['Musicals', 13], ['Mythology',20], ['Geography',22]];

async function getQuestions() {
    let categorySelected=0;
    let API_Code = 20;
    for (let i =1; i<4; i++){
        if (document.getElementById(`quizCat${i}`).checked){
            API_Code = categories[i-1][1];
        }
    }
    document.getElementsByClassName('quiz-select-div')[0].style.display = 'none';
    const response = await fetch(`${API_URL_ROOT}${API_Code}${API_URL_TAIL}`);
    console.log(response);
    var data = await response.json();
    if (response.ok) {
        questionData = data.results;
        setup();
        document.getElementsByClassName('quiz-div')[0].style.display = 'block';
    } else {
        console.error('API error');
        throw new Error(data.error);
    }
}

function clickButton() {
    check();
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
        // let newBtnString = `<button class="btn btn-primary btn-block" onclick="${getQuestions()}">Restart</button>`;
        // document.getElementsByClassName("box")[0].innerHTML += newBtnString;
    }
    
}

function check() {
    let correctIndex = 0;
    for(let i=1; i<5; i++){
        document.getElementById(`radio${i}Label`).style.backgroundColor = 'red';
        document.getElementById(`radio${i}Label`).style.borderColor = 'red';
        if (document.getElementById(`radio${i}Label`).innerHTML == questionData[0].correct_answer){
            correctIndex = i;
            document.getElementById(`radio${i}Label`).style.backgroundColor = 'green';
            document.getElementById(`radio${i}Label`).style.borderColor = 'green';
        }
    }
    if(document.getElementById(`radio${correctIndex}`).checked){
        document.getElementById('feedback').innerHTML = "Correct!"
        document.getElementById('feedback').style.color = 'green';
        score++;
    } else {
        document.getElementById('feedback').innerHTML = "Incorrect"
        document.getElementById('feedback').style.color = 'red';
    }
    document.getElementById('feedbackBox').style.display = 'block';
    if (questionData.length==1){
        document.getElementById("btnNxt").value = "Finish";
    }
}

function nextQuestion() {
    for(let i=1; i<5; i++){
        document.getElementById(`radio${i}`).checked = false;
        document.getElementById(`radio${i}Label`).style.backgroundColor = '';
        document.getElementById(`radio${i}Label`).style.borderColor = '';
        document.getElementById('feedbackBox').style.display = 'none';
    }
    questionData.shift();
    questionNo++;
    setup();
}
