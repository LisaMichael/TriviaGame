

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
            answerId: 0,
            question: "this is my first question",
            answer: 'my answer is my first answer ',

            // place users possible guesses in an array 
            userGuess: ["option1", "option2", "option3", "option4"],
            giphy: "https://media.giphy.com/media/l4KibK3JwaVo0CjDO/giphy.gif"
        },


        {
            //  question: 1,
            answerId: 3,
            question: "What is Peter Griffin's wife's name?",
            answer: "Lois",
            userGuess: ["Marge", "Peggy", "Wilma", "Lois"],
            giphy: "https://media.giphy.com/media/26ufdkz27PfQJ7NEQ/giphy.gif"
        },

        {
            //  question: 2,
            answerId: 2,
            question: "What cartoon character was Walt Disney's favorite?",
            answer: "Goofy",

            // recommendation made from jim 
            // userGuess: [{ answerText: "Minnie", answerId: 1 }, "Jiminey Crickett", "Goofy", "Daisey"],
            userGuess: ["Minie", "Jimminy Crickett", "Goofy", "Daisy"],
            giphy: "https://media.giphy.com/media/4ADaU1Q10Wh0I/giphy.gif"
        },

        {
            //   question: 3,
            answerId: 2,
            question: "What did Dilbert name his dog ? ",
            userGuess: ["DogPile", "Blog the Dog", "Dogbert", "FiFo"],
            giphy: "need to find one"
        },
        { 
            answerId: 3,
            question: "First couple to be televised tv in bed together ?",
            userGuess: ["George & Jane Jetson", "Pebbles & Bam Bam", "Fred & Wilma Flintstone", "Mickey Mouse & Minnie Mouse"] }
           
    ];



    // when page loads display only start button 
    //click start button to start game which
    // timer displays  AND display question

    startButton();

    //display question and possible answers. 
    // placed in function

    function displayQuestion() {

        //created a div to display question property in questionArray[]
        let questionToAnswer = $("<div>");
        questionToAnswer.addClass("questionCSS");
        questionToAnswer.html(questionArray[questionSet].question);
        $("#questions").append(questionToAnswer);
        // questionArray[questionSet] === questionArray.questionSet
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



        $('.questionCurrent').on("click", function () {
            if (time < 0) { console.log("times up") } else {

                // working on this part of the code now
                //extract the value from the div i clicked on
                console.log("text inside line 114 ");
                indexValue = ($(this).attr("data-index"));
                if (indexValue == parseInt((questionArray[questionSet].answerId))) {
                   correct();
                }
                else {
                   wrong();
                }

            }
        });


    } //end of displayQuestion function

    function correct() {
        console.log("ok");
        clearInterval(intervalId);
        clockRunning = false;
        time = 30;
        questionSet++;
        emptyQA();
        displayQuestion();
        timerIsRunning();
        count();
        wins++;
    }

function wrong() {
    console.log("wrong answer");
    emptyQA();
    time = 3;
    let incorrectimg = $("<img>");
    incorrectimg.addClass("incorrect-image");
    incorrectimg.attr("src", "./assets/images/wrong.gif");
    $('#possibleAnswers').append(incorrectimg);
    losses++;
}

    function test() {
        console.log("this is a test in a functionat global level")
    }


    // question must be answered before timer reaches zero

    // function userClick() {


    // }


    // if question is answered correctly , display correct giphy 


    //else  display WRONG giphy !!! 

    // Once all questions are answered, display score results 

    // display button to play again


    // function to start countdown timer 
    function timerIsRunning() {
        // start page with clock running =false
        if (!clockRunning) {

            //set intervalId = 1 sec
            intervalId = setInterval(count, 1000);
            clockRunning = true;

        }

        // else { clockRunning =false; }


    }

    function emptyQA() {
        // empty existing question and possible answers
        console.log('you are emptying questions and answers');
        $("#questions").empty();
        $("#possibleAnswers").empty();

    }
    // used Week 5, exercise 10, the stop watch exercise to assist me with writing up 
    // the timer portion of this
    function count() {

        if (time >= 0) {


            // const converted = timeConverter(time);
            console.log(time);

            //  Used the span to "combine" id gamertimer defined in html.
            $("#timerPart2").html(time + " seconds");

            // Decrement time by 1, remember we cant use "this" here.
            time--;

        }

        //length of array is 3 but i need a negative value to if statement
        //so we end the if statement at the end of the questionArray


        if (time < 0 && questionSet < questionArray.length - 1) {
            console.log("question set = " + questionSet);
            //increment question set to move onto the next question
            questionSet++;

            // empty existing question and possible answers
            // $("#questions").empty();
            // $("#possibleAnswers").empty();
            emptyQA();

            //display next question
            displayQuestion();

            time = 30;
        }
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


    function playGame() {
        alert("playGame");
    }


    // playGame();


})
// end of $(document).ready
