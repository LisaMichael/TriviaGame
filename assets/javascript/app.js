
  
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


    // when page loads display only start button 

    //click start button to start game 

    // timer displays  AND //question display 


    // question must be answered before timer reaches zero

    // if question is answered correctly , dispplay giphy 


    //else  display WRONG !!! 

    // Once all questions are answered, display score results 

    // display button to play again



// start page with clock running =false
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
    }
    else { !clockRunning }



    function count() {

if (time >0) {

        // DONE: increment time by 1, remember we cant use "this" here.
        time--;

        // DONE: Get the current time, pass that into the timeConverter function,
        //       and save the result in a variable.
        // const converted = timeConverter(time);
        console.log(time);

        // DONE: Use the variable we just created to show the converted time in the "display" div.
        $("#timerPart2").html(time + " seconds");
    }
    else { !clockRunning}
    }




    //create an object to store my questions and answers

    let qNa = {
        question: "what is my first question",
        answer: 'my answer is an array element',

        // place users possible guesses in an array 
        userGuess: [option1, option2, option3, option4, answerId, answerText],
        giphy: "https://giv"
    }


    
    function startButton() {
        alert("startbutton");
        count();

        // unhide start button
        $("#gameTimer").css("display", "inline-block");
    }

    function playGame() {
        alert("playGame");
    }

    startButton();
    // playGame();


})
// end of $(document).ready
