

$(document).ready(function () {


    // declare my variables 
    let wins = 0;
    let losses = 0;
    let unanswered = 0;
    // let question = 0;
    // let answerId = 0;
    // let answerText = "";
    let clockRunning = false;
    // let time = 30;

    // set timer =5 for testing
    let time =3;
    let intervalId;

    //will use questionSet to scroll through questions objects when time = 0
    let questionSet = 0;

    //create an object to store my questions and answers
    // let questionList = [
    let question0 = {
        answerId: 0,
        question: "this is my first question",
        answer: 'my answer is an array element',

        // place users possible guesses in an array 
        userGuess: ["option1", "option2", "option3", "option4"],
        giphy: "https://media.giphy.com/media/l4KibK3JwaVo0CjDO/giphy.gif"
    }


    let question1 = {
        answerId: 1,
        question: "What is Peter Griffin's wife's name?",
        answer: "Lois",
        userGuess: ["Marge", "Peggy", "Wilma", "Lois"],
        giphy: "https://media.giphy.com/media/26ufdkz27PfQJ7NEQ/giphy.gif"
    }

    let question2 = {
        answerId: 2,
        question: "What cartoon character was Walt Disney's favorite?",
        answer: "Goofy",

        // recommendation made from jim 
        // userGuess: [{ answerText: "Minnie", answerId: 1 }, "Jiminey Crickett", "Goofy", "Daisey"],
        userGuess: ["Minie", "Jimminy Crickett", "Goofy", "Daisy"],
        giphy: "https://media.giphy.com/media/4ADaU1Q10Wh0I/giphy.gif"
    };

    // placed questions objects created above into an array
    let questionArray = [question0, question1, question2];

    // when page loads display only start button 
    startButton();

    //click start button to start game which
    // timer displays  AND display question



    //display question and possible answers. 
    // placed in function

    function displayQuestion() {

        let questionToAnswer = $("<div>");
        questionToAnswer.html(questionArray[questionSet].question);
        $("#questions").append(questionToAnswer);

        // created for loop to display the 4 possible answers

        const questionlist = $('#possibleAnswers');


        // usedhttps://www.javatpoint.com/jquery-addclass to assist  

        for (i = 0; i < 4; i++) {
            const currentQuestion = $('<div>' + questionArray[questionSet].userGuess[i] + '</div>');

            // need to add class to take advantage of bootstrap
            // currentQuestion.addClass('data-mask flex-center', i);

            questionlist.append(currentQuestion);
        }

    } //end of displayQuestion function


    // question must be answered before timer reaches zero

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
        // else { 
           
            // clockRunning = false;
            // questionSet++;
        //  }
        // questionArray.length = -questionArray.length;

        if(time< 0 && time > -3 ){
            questionSet++;
            $("#questions").empty();
            $("#possibleAnswers").empty();
            // currentQuestion.empty();
            displayQuestion();
            time=3;
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
