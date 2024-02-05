const questions = [["What was the title of the George Orwell's dystopian novel featuring the phrase 'doublethink'?", "1984"], ["What is the name given to the Friday before Easter?", "Good Friday"]];
var questionNo = 1;
var score = 0;

function clickButton() {
    check();
    questions.shift();
    questionNo++;
    setup();
}

function setup() {
    if (questions.length != 0)
    {
        document.getElementById("question").innerHTML = questions[0][0];
        document.getElementById("questionNo").innerHTML = questionNo;
    } else {
        document.getElementById("questionNo").innerHTML = "Finished!";
        document.getElementById("question").innerHTML = `Your score is ${score}`;
        document.getElementById("text-field").remove();
        document.getElementById("button").remove();
    }
    
}

function check() {
    if(document.getElementById("text-field").value == questions[0][1]){
        console.log("correct");
        score++;
        document.getElementById("text-field").value = "";
    }
}
