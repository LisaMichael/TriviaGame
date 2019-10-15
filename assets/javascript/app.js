

$(document).ready(function () {


    // declare my variables 
    let wins = 0;
    let losses = 0;
    let unanswered = 0;
    let option1 = "";
    let option2 = "";
    let option3 = "";
    let option4 = "";
    let answerId = 0;
    let answerText = "";
    let clockRunning = false;
    let time = 30;
    let intervalId;

    //create an object to store my questions and answers

    let qNa = {
         answerId:0, 
        question: "what is my first question",
        answer: 'my answer is an array element',

        // place users possible guesses in an array 
        userGuess: [option1, option2, option3, option4, answerId, answerText],
        giphy: "https://media.giphy.com/media/l4KibK3JwaVo0CjDO/giphy.gif"
    }


    let question1 = {
        answerId: 1,
        question: "What is Peter Griffin's wife's name", 
        answer: "Lois",
        userGuess: ["Marge", "Peggy", "Wilma" , "Lois" ],
        giphy: "https://media.giphy.com/media/26ufdkz27PfQJ7NEQ/giphy.gif"
    }

    let question2 = {
        answerId: 2,
        question: "What cartoon character was Walt Disney's favorite?",
        answer: "Goofy",
        userGuess: ["Minnie", "Jiminey Crickett", "Goofy", "Daisey"],
        giphy: "https://media.giphy.com/media/4ADaU1Q10Wh0I/giphy.gif"
    }



    // when page loads display only start button 
    startButton();
    //click start button to start game which

    // timer displays  AND //question display 



    // question must be answered before timer reaches zero

    // if question is answered correctly , display giphy 


    //else  display WRONG !!! 

    // Once all questions are answered, display score results 

    // display button to play again


function timerIsRunning() {
    // start page with clock running =false
    if (!clockRunning) {

        //set intervalId = 1 sec
        intervalId = setInterval(count, 1000);
        clockRunning = true;
    }
    // else { clockRunning =false; }

}


    function count() {

        if (time > 0) {

            // DONE: increment time by 1, remember we cant use "this" here.
            time--;

            // DONE: Get the current time, pass that into the timeConverter function,
            //       and save the result in a variable.
            // const converted = timeConverter(time);
            console.log(time);

            // DONE: Used the span to "combine" id gamertimer defined in html.
            $("#timerPart2").html(time + " seconds");
        }
        else { clockRunning = false; }
        // $("#gameTimer").css("display", "none");
    }




    



    function startButton() {
    // alert for testing 
    // alert("start button");



        let startButton = $("<button>");

        // added class buttonProperties to button
        startButton.addClass("buttonProperties");
        startButton.addClass("btn btn-primary btn-lg");

        //labled the button START GAME
        startButton.html('<p> START GAME </p>');

        // added button to start-button div
        $("#start-button").append(startButton);

        // adding css properties to button 
        $(".buttonProperties").css("background-color", "pink");
        $(".buttonProperties").css("margin-left", "400px");

        // $("#start-button").css("background-color", "pink");
        $(".buttonProperties").on("click", function () {
clockRunning=false;
timerIsRunning();
            count();

            // unhide gametime button
            $("#gameTimer").css("display", "inline-block");

            // hide the button after you click on it
            $(".buttonProperties").css("display", "none");
        })
    }

    function playGame() {
        alert("playGame");
    }


    // playGame();


})
// end of $(document).ready
