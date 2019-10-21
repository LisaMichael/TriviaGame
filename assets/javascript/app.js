

$(document).ready(function () {


    // declare my variables 
    let wins = 0;
    let losses = 0;
    let unanswered = 0;
    // let question = 0;
    // let answerId ;
    // let answerText = "";
    let clockRunning = false;
    // let time = 30;

    // set timer =5 for testing
    let time = 30;
    let intervalId;

    //will use questionSet to scroll through questions objects when time = 0
    let questionSet = 0;


    // placed questions objects created above into an array
    //create an object to store my questions and answers
    let questionArray = [
        {
            //  question: 0,
            answerId: 3,
            question: "Who did voices in Scooby Doo and family Guy?",
            answer: 'Adam West',

            // place users possible guesses in an array 
            userGuess: ["Shaun Cassidy", "Casey Casem", "Buddy Ebsen", "Adam West"],
            giphy: "./assets/images/question0.gif",
        },


        {
            //  question: 1,
            answerId: 3,
            question: "What is Peter Griffin's wife's name?",
            answer: "Lois",
            userGuess: ["Marge", "Peggy", "Wilma", "Lois"],
            giphy: "./assets/images/question1.gif",
        },

        {
            //  question: 2,
            answerId: 2,
            question: "What cartoon character was Walt Disney's favorite?",
            answer: "Goofy",
            userGuess: ["Minie", "Jimminy Crickett", "Goofy", "Daisy"],
            giphy: "./assets/images/question2.gif",
        },

        {
            //   question: 3,
            answerId: 2,
            question: "What did Dilbert name his dog ? ",
            userGuess: ["DogPile", "Blog the Dog", "Dogbert", "FiFo"],
            giphy: "./assets/images/question3.gif",
        },
        {
            //question4
            answerId: 3,
            question: "First couple to be televised tv in bed together ?",
            userGuess: ["George & Jane Jetson", "Pebbles & Bam Bam", "Fred & Wilma Flintstone", "Mickey Mouse & Minnie Mouse"],
            giphy: "./assets/images/question4.gif",
        }

    ];



    // when page loads display only start button 
    //click start button to start game which
    // timer displays  AND display question

    startButton();



    //display question and possible answers. 
    // placed in function

    function displayQuestion() {

        // unhide gametime button
        $("#displayCorrect").css("display", "none");

        // Once all questions are answered, display score results 
        if (questionSet > questionArray.length - 1) {
            console.log("line 90 ... i need the scoreboard");
            timerIsRunning();
            scoreboard();
        }
        else {
            if (questionSet < questionArray.length) {

                //created a div to display question property in questionArray[]
                let questionToAnswer = $("<div>");
                questionToAnswer.addClass("questionCSS");
                questionToAnswer.html(questionArray[questionSet].question);
                $("#questions").append(questionToAnswer);

                // created for loop to display the 4 possible answers

                const questionlist = $('#possibleAnswers');

                // usedhttps://www.javatpoint.com/jquery-addclass to assist  
                // also wk 6 customer-object exercise assisted me with the array

                for (i = 0; i < 4; i++) {
                    const currentQuestion = $('<div>' + questionArray[questionSet].userGuess[i] + '</div>');

                    // need to add class to take advantage of bootstrap
                    // currentQuestion.addClass('data-mask flex-center', i);
                    currentQuestion.addClass("questionCurrent");
                    currentQuestion.addClass("hoverdiv");
                    // referenced for attr info  https://www.w3schools.com/jquery/html_attr.asp
                    currentQuestion.attr("data-index", i);
                    questionlist.append(currentQuestion);

                }

                // code for on click when all 4 choices are displayed

                $('.questionCurrent').on("click", function () {
                    if (time < 0) {
                        console.log("times up")
                        emptyQA();
                        unanswered++;
                        questionSet++;
                        clearInterval(intervalId);
                        displayQuestion();
                    }
                    else {

                        // working on this part of the code now
                        //extract the value from the div i clicked on
                        console.log("text inside line 114 ");
                        indexValue = ($(this).attr("data-index"));

                        // select answerID based upon what index value is
                        // if the values are the same, the answer is correct 

                        if (indexValue == (questionArray[questionSet].answerId)) {

                            correct();
                        }

                        // if the answers are not the same, then the answer is incorrect
                        else {

                            console.log("this is line 143 - wrong answer");
                            wrong();
                        }

                    }
                });

            }
        }
        // else {
        //     scoreboard()
        // }

    } //end of displayQuestion function

    function scoreboard() {
        $('#imageCorrect').empty();
        emptyQA();
        alert("scoreboard window");
        playAgain();
        time = 3;
        clearInterval(intervalId);


        let scoreLosses = $('<div>');
        scoreLosses.html('<h3>Losses: ' + losses + '</h3>');

        let scoreWin = $('<div>');
        scoreWin.html('<h3>Wins: ' + wins + '</h3>');


        $("#possibleAnswers").append(scoreLosses);
        $("#possibleAnswers").append(scoreWin);
        // }

    }

    function correct() {

        let urCorrect = $('<div>');
        $("#possibleAnswers").html('<h3> You are absolutely CORRECT !</h3>');
        // if question is answered correctly , display correct giphy 
        //add image for correct answer: 
        correctImage();

        clearInterval(intervalId);
        clockRunning = false;
        time = 30;
        questionSet++;
        emptyQA();
        displayQuestion();


        count();
        wins++;


    }

    //else  wrong question should display correct  giphy !!! 
    // correct image function

    function correctImage() {

        // THIS WAS MY ATTEMPT TO USE JQUERY 
        // let correctimg = $("<img>");
        // correctimg.addClass("correct-image");
        // correctimg.attr("src", "./assets/images/question" + questionSet + ".gif");

        // // used syntax for img src :https://stackoverflow.com/questions/16432001/how-to-append-image-using-jquery-append


        if (questionSet === 0) {
            $('#imageCorrect').empty();
            $('#imageCorrect').append('<img src="./assets/images/question0.gif" height="200px" width="200px">');
        } if (questionSet == 1) {
            $('#imageCorrect').empty();
            $('#imageCorrect').append('<img src ="./assets/images/question1.gif">');
        }
        if (questionSet == 2) {
            $('#imageCorrect').empty();
            $('#imageCorrect').append('<img src ="./assets/images/question2.gif">');
        } if (questionSet == 3) {
            $('#imageCorrect').empty();
            $('#imageCorrect').append('<img src ="./assets/images/question3.gif">');
        }
    }

    function wrong() {
        console.log("wrong answer");
        emptyQA();
        losses++;
        // count();
        time = 30;

        clockRunning = false;
        timerIsRunning();

        displayQuestion();

        console.log("line 200 " + questionSet);

        //if the questionSet Variable is more than the length of the questionArray
        // we should go to the scoreboard
        if (questionSet >= questionArray.length) {
            scoreboard();
        } else {
            // display the correct answer if wrong answer selected
            let correctDisplay = questionArray[questionSet].answer;

            // count();

            // unhide displayCorrect
            $("#displayCorrect").css("display", "inline-block");

            //  Used the span to "combine" id gamertimer defined in html.
            $("#displayQues").html(correctDisplay);



            // console.log(correctDisplay);

            // $("#possibleAnswers").html("<h3>The correct answer is: " + correctDisplay + "</h3>");



            // display correct gif
            correctImage();

            // count();
        }
    }




    



    // function to start countdown timer 
    function timerIsRunning() {
        // start page with clock running =false
        if (!clockRunning) {

            //set intervalId = 1 sec
            intervalId = setInterval(count, 1000);
            clockRunning = true;

        }

        // Once all questions are answered, display score results 
        if (questionSet > questionArray.length) {

            console.log("am i hitting this code? ")
            scoreboard();
        }
    

    }

    function emptyQA() {
        // empty existing question and possible answers
        console.log('you are emptying questions and answers');
        $("#questions").empty();
        $("#possibleAnswers").empty();

    }
    // used Week 5, exercise 10, the stop watch exercise to assist me with writing up 
    // the timer portion of this

    // question must be answered before timer reaches zero
    function count() {

        if (time >= 0) {


            // const converted = timeConverter(time);
            console.log(time);

            //  Used the span to "combine" id gamertimer defined in html.
            $("#timerPart2").html(time + " seconds");

            // Decrement time by 1, remember we cant use "this" here.
            time--;

        }

        //length of array is 4 , this code is less than the length of array 
        


        if (time < 0 && questionSet < questionArray.length - 1) {
            console.log("question set = " + questionSet);
            //increment question set to move onto the next question
            questionSet++;
            console.log("question set NOW = " + questionSet);
            // empty existing question and possible answers
            // $("#questions").empty();
            // $("#possibleAnswers").empty();
            emptyQA();

            timerIsRunning();
            //display next question
            displayQuestion();

            time = 30;
        }
    }

// function to display start button

    function startButton() {


        let startButton = $("<button>");

        // added class buttonProperties to button
        startButton.addClass("buttonProperties");
        startButton.addClass("btn btn-primary btn-lg");

        //labled the button START GAME
        startButton.html('<p> START GAME </p>');

        // added button to start-button div
        $("#start-button").append(startButton);


        // moved css properties to style.css and now styling works properly 
        // lesson learned, css defined in .js over rides style.css 
        //this was my attempt to add css directly to js.
        // attempt to add css properties to button (now in style.css)
        // $(".buttonProperties").css("background-color", "pink");
        // $(".buttonProperties").css("margin-left", "350px");


        $(".buttonProperties").on("click", function () {
            clockRunning = false;
            timerIsRunning();
            count();

            // unhide gametime button
            $("#gameTimer").css("display", "inline-block");



            // hide the button after you click on it
            $(".buttonProperties").css("display", "none");
            displayQuestion();

        })
    } // end of startButton function


    // display button to play again

    function playAgain() {
        alert("playGame");

        let playButton = $("<button>");


        // add classes to playagain Properties to button
        playButton.addClass("playProperties");
        // playButton.addClass("btn btn-primary btn-lg");

        // hide the button after you click on it
        playButton.css("display", "inline-block");

        //labled the button START GAME
        playButton.html('<p> Play Again </p>');

        // added button to start-button div
        $("#playMore").append(playButton);

        $(".playProperties").on("click", function () {


            // unhide gametime button
            $("#gameTimer").css("display", "inline-block");
            // hide the button after you click on it
            $(".playProperties").css("display", "none");

            clockRunning = false;
            timerIsRunning();
            count();
            emptyQA();
            questionSet = 0;
            wins = 0;
            losses = 0;
            clearInterval(intervalId);
            displayQuestion();
        })
    }


    // playGame();


})
// end of $(document).ready
