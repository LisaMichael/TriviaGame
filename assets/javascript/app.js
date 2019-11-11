

$(document).ready(function () {


    // declare my variables 
    let wins = 0;
    let losses = 0;
    let unanswered = 0;
    // let question = 0;
    // let answerText = "";
    let clockRunning = false;

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
            answer: "Dogbert",
            userGuess: ["DogPile", "Blog the Dog", "Dogbert", "FiFo"],
            giphy: "./assets/images/question3.gif",
        },
        {
            //question4
            answerId: 2,
            question: "First couple to be televised tv in bed together ?",
            answer: "Fred & Wilma Flintstone",
            userGuess: ["George & Jane Jetson", "Pebbles & Bam Bam", "Fred & Wilma Flintstone", "Mickey Mouse & Minnie Mouse"],
            giphy: "./assets/images/question4.gif",
        },
        {
            //question5 
            answerId: 0,
            question: "What year was the Jetsons set in?",
            answer: "2062",
            userGuess: ["2062", "2099", "2100", "2222"],
            giphy: "./assets/images/question5.gif"
        }
    ];



    // when page loads display only start button 
    //click start button to start game which
    // timer displays  AND display question

    startButton();



    //display question and possible answers. 
    // placed in function

    function displayQuestion() {

        // hide the previous giphy
        $('#imageCorrect').empty();
        
        // unhide gametime button
        $("#displayCorrect").css("display", "none");

        // empty the previous image 
        
        // Once all questions are answered, display score results 
        if (questionSet > questionArray.length) {
            console.log("line 93 ... i need the scoreboard");
            // timerIsRunning();
            scoreboard();
        }
        else {

            //if the question # is less than the length of array
            if (questionSet < questionArray.length) {
                time = 30;
                console.log("line 99: questionSet <questionArray.length")
                //created a div to display question property in questionArray[]
                let questionToAnswer = $("<div>");
                questionToAnswer.addClass("questionCSS");
                questionToAnswer.html(questionArray[questionSet].question);
                $("#questions").append(questionToAnswer);

                // created for loop to display the 4 possible answers

                const questionlist = $('#possibleAnswers');

                // usedhttps://www.javatpoint.com/jquery-addclass to assist  
                // also wk 6 customer-object exercise assisted me with the array

                //create a div for each current question called questionCurrent
                for (i = 0; i < 4; i++) {
                    const currentQuestion = $('<div>' + questionArray[questionSet].userGuess[i] + '</div>');

                    // need to add class to take advantage of bootstrap

                    currentQuestion.addClass("questionCurrent");
                    currentQuestion.addClass("hoverdiv");
                    // referenced for attr info  https://www.w3schools.com/jquery/html_attr.asp
                    currentQuestion.attr("data-index", i);
                    questionlist.append(currentQuestion);

                } //end of for loop

                // code for on click when all 4 choices are displayed

                $('.questionCurrent').on("click", function () {
                    if (time < 0) {
                        console.log("times up")
                        $('#imageCorrect').empty();
                        $('#imageCorrect').append('<img src ="./assets/images/question5.gif">');
                        emptyQA();
                        // questionSet++;
                        clearInterval(intervalId);
                        displayQuestion();
                        scoreboard();
                    }
                    else {

                        // working on this part of the code now
                        //extract the value from the div i clicked on
                        console.log("text inside line 141 ");
                        indexValue = ($(this).attr("data-index"));

                        // select answerID based upon what index value is
                        // if the values are the same, the answer is correct 

                        if (indexValue == (questionArray[questionSet].answerId)) {
                            console.log("indexValue on line 148: " + indexValue);

                            correct();

                        }

                        // if the answers are not the same, then the answer is incorrect

                        else {
                            indexValue != (questionArray[questionSet].answerId)
                            console.log("this is line 174 - wrong answer");
                            wrong();
                        }

                    }
                });

            }
        }
       

    } //end of displayQuestion function

    function scoreboard() {
    
console.log("I am in the scoreboard function");

 $('#imageCorrect').empty();
        emptyQA();
        let tally = $("<div>");
        tally.html("<p>Here's how you did:</p>")
        $("#possibleAnswers").append(tally);
       
        clearInterval(intervalId);


        let scoreLosses = $('<div>');
        scoreLosses.html('<h3>Losses: ' + losses + '</h3>');

        let scoreWin = $('<div>');
        scoreWin.html('<h3>Wins: ' + wins + '</h3>');


        $("#possibleAnswers").append(scoreLosses);
        $("#possibleAnswers").append(scoreWin);
        playAgain();
        // }

    } // end of scoreboard function

    function correct() {

        let urCorrect = $("<div>");
        urCorrect.text("you are absolutely correct")
        $("#possibleAnswers").append(urCorrect);
        console.log("you are absolutely correct");
        emptyQA();
        // if question is answered correctly , display correct giphy 
        //add image for correct answer: 
        correctImage();

        // clearInterval(intervalId);
        clockRunning = false;
        time = 5;
        // questionSet++;
        console.log("The question set is now: in the correct() :" + questionSet);
       
        // displayQuestion();

        // count();
        wins++;
        console.log("wins++: " + wins); 
        //     if (questionSet > questionArray.length) {
        //         scoreboard();
        //     }

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
            console.log("test text0");
            $('#imageCorrect').empty();
 $('#imageCorrect').append('<img src="./assets/images/question0.gif" height="200px" width="200px">');
        } if (questionSet == 1) {
            console.log("test text1");
            $('#imageCorrect').empty();
            $('#imageCorrect').append('<img src ="./assets/images/question1.gif"height="200px" width="200px">');
        }
        if (questionSet == 2) {
            console.log("test text2");
            $('#imageCorrect').empty();
            $('#imageCorrect').append('<img src ="./assets/images/question2.gif">');
        } if (questionSet == 3) {
            console.log("test text3");
            $('#imageCorrect').empty();
            $('#imageCorrect').append('<img src ="./assets/images/question3.gif">');
        }
        if (questionSet == 4) {
            console.log("test text4");
            $('#imageCorrect').empty();
            $('#imageCorrect').append('<img src ="./assets/images/question4.gif">');
        }
        if (questionSet == 5) {
            console.log("test text5");
            $('#imageCorrect').empty();
            $('#imageCorrect').append('<img src ="./assets/images/question5.gif">');
        }
    }

 function incorrectImage() {


        if (questionSet === 0) {
            console.log("test incorrect0");
            $('#imageCorrect').empty();
            $('#imageCorrect').append('<img src="./assets/images/question0.gif" height="200px" width="200px">');
        } if (questionSet == 1) {
            console.log("test incorrect1");
            $('#imageCorrect').empty();
            $('#imageCorrect').append('<img src ="./assets/images/question0.gif">');
        }
        if (questionSet == 2) {
            console.log("test incorrect2");
            $('#imageCorrect').empty();
            $('#imageCorrect').append('<img src ="./assets/images/question1.gif">');
        } if (questionSet == 3) {
            console.log("test incorrect3");
            $('#imageCorrect').empty();
            $('#imageCorrect').append('<img src ="./assets/images/question2.gif">');
        }
        if (questionSet == 4) {
            console.log("test incorrect4");
            $('#imageCorrect').empty();
            $('#imageCorrect').append('<img src ="./assets/images/question3.gif">');
        }
        if (questionSet == 5) {
            console.log("test incorrect5");
            $('#imageCorrect').empty();
            $('#imageCorrect').append('<img src ="./assets/images/question4.gif">');
        }
    }


    function wrong() {
        console.log("wrong answer");

        // empty previous questions
        emptyQA();
        losses++;
		console.log("losses: " + losses);
        // count();
        time = 5;


        // displayQuestion();

        console.log("line 332. This is the question set " + questionSet);
        //if the questionSet Variable is more than the length of the questionArray
        // we should go to the scoreboard (we are at the last question)
        if (questionSet >= questionArray.length) {
			console.log("this is code in the wrong code. am i hitting this?");
            scoreboard();
            console.log("if (questionSet > questionArray.length) part of code")
            console.log("line 337. This is the question set " + questionSet);
            losses++
			console.log("losses in if questionSet >= questionArray.length statement: " + losses);
            // clearInterval(intervalId);
            // time = 0;
            
        } else {
            
            // display the correct answer if wrong answer selected


            // displays the correct answer 
            let correctDisplay = questionArray[questionSet].answer;
            // displayQuestion();
            // count();
            console.log("The correct answer is: " + correctDisplay);
            console.log("The question set in displayQuestion() is: " + questionSet)


            // unhide displayCorrect
            $("#displayCorrect").css("display", "inline-block");

            //  Used the span to "combine" id gamertimer defined in html.
            $("#displayQues").html(correctDisplay);
            time = 5;
            // questionSet++;

            // $("#possibleAnswers").html("<h3>The correct answer is: " + correctDisplay + "</h3>");

            // display correct gif
            correctImage();

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
        // if (questionSet > questionArray.length) {
        //     console.log("am i hitting this code? ")
        //     scoreboard();
        // }


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

            console.log(time);

            //  Used the span to "combine" id gamertimer defined in html.
            $("#timerPart2").html(time + " seconds");

            // Decrement time by 1, remember we cant use "this" here.
            time--;

        }

        //length of array is 4 , this code is less than the length of array 

        // if (time < 0 && questionSet === questionArray.length){
        //     console.log("questionSet = questionArray.length");
        //     clearInterval(intervalId);
        //     scoreboard();
        // }

        if (time < 0 && questionSet <= questionArray.length) {
            console.log("question set = " + questionSet);
            //increment question set to move onto the next question
            // questionSet++;
            console.log("question set NOW in counter() function = " + questionSet);
            questionSet++;
        
            console.log("question set is: " + questionSet + " wins: " + wins + " losses " + losses );

            
            // $('#imageCorrect').empty();
            // empty existing question and possible answers
            // $("#questions").empty();
            // $("#possibleAnswers").empty();
           // wrong();
            emptyQA();

            //display next question
            displayQuestion();
           

            // time = 30;
        }
        if(questionSet> questionArray.length){
            clearInterval(intervalId);
            scoreboard();
        }
        // else{
        //     clearInterval(intervalId); 
        //     scoreboard();
        // }
        
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
        // alert("playGame");
        $("#playMore").empty();
        // clearInterval(intervalId);
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
            time = 30;
            questionSet = 0;
            clockRunning = false;
            timerIsRunning();
            count();
            emptyQA();

            wins = 0;
            losses = 0;
            // clearInterval(intervalId);
            displayQuestion();
        })
    }


    // playGame();


})
// end of $(document).ready
