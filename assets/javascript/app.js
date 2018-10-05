//Create an ivent listener that waits until the DOM is loaded:
$(document).ready(function () {
    //Create an array of objects to store your data:
    var triviaData = [
        {
            question: "Which historic highway starts in Chicago?",
            options: [
                "Highway 12",
                "Route 66",
                "Great River Road",
                "Blue Ridge Parkway"
            ],
            optionIndex: 1,
            answer: "The 'Historic Route 66' begins in downtown Chicago and goes all the way to California.",
            image: "assets/images/answer1.jpg"
        },
        {
            question: "How many states can you see from the top of the Willis Tower?",
            options: [
                "One",
                "Two",
                "Three",
                "Four"
            ],
            optionIndex: 3,
            answer: "From the second tallest building in the U.S., you can see four states: Illinois, Indiana, Wisconsin and Michigan.",
            image: "assets/images/answer2.jpg"
        },
        {
            question: "Outside of the Louvre in Paris, the Art Institute of Chicago holds the largest collection of what type of art?",
            options: [
                "Expressionism",
                "Impressionism",
                "Modernism",
                "Surrealism"
            ],
            optionIndex: 1,
            answer: "The Art Institue holds the largest collections of Impressionist and Post-Impressionist art in the World.",
            image: "assets/images/answer3.jpg"
        },
        {
            question: "Approximately how many visitors come to Chicago every year?",
            options: [
                "10 million",
                "4 million",
                "40 million",
                "400 thousand"
            ],
            optionIndex: 2,
            answer: "40 million people a year visit Chicago to experience shopping, dinning, arts and sports.",
            image: "assets/images/answer4.jpg"
        },
        {
            question: "Which of these 1920's factories is the oldest Chicago factory that is still in operation today?",
            options: [
                "Florsheim Shoe Factory (on Belmont and Pulaski)",
                "Brach's Candy Plant (on Kinzie and Cicero)",
                "Jays Potato Chip Factory (on 99th and Cottage Grove)",
                "Ford Assembly Plant (on Torrence and 126th)"
            ],
            optionIndex: 3,
            answer: "Ford Assembly Plant is the oldest working Ford factory and currently builds the Ford Taurus and Ford Explorer.",
            image: "assets/images/answer5.jpg"
        },
        {
            question: "What is unique about the Chicago River?",
            options: [
                "It is subject to drought and its level lowers greatly",
                "It flows into Lake Michigan",
                "It flows out of Lake Michigan",
                "It empties into an inland lake where it ends"
            ],
            optionIndex: 2,
            answer: "The Chicago River the only river in America that flows the opposite direction (man built).",
            image: "assets/images/answer6.jpg"
        },
        {
            question: "Chicago is an Indian word from which the name of the city is derived. What does the word mean?",
            options: [
                "Wild leek, or skunk cabbage",
                "Marshy place",
                "City by the lake",
                "The name of a Potawatomi Indian chief"
            ],
            optionIndex: 0,
            answer: "Shikaakwa means 'wild leek' or 'skunk cabbage' from the abundance of such plants which grew in the area.",
            image: "assets/images/answer7.jpg"
        },
    ];
    //Define variable in the global scope to access them anywhere in the script:
    var optionButton;
    var dataDiv = $(".trivia-data");
    var questionIndex;
    var showAnswer;
    var correctCount;
    var incorrectCount;
    var unansweredCount;
    var maxTime = 30;
    var intervalId;

    //Hide html elements:
    $("#timer").hide();
    $("#game-restar").hide();
    // Creat a start button to start the game:
    $("#game-start").on("click", function () {
        console.log("Start");
        questionIndex = 0;
        correctCount = 0;
        incorrectCount = 0;
        unansweredCount = 0;
        $("#correct-answers").empty();
        $("#incorrect-answers").empty();
        $("#unanswered").empty();
        $(".gif").hide();
        $("#game-start").hide();
        $("#timer").show();
        displayQuestion();
    });
    //Create a function to dispays the question:
    function displayQuestion() {
        $("#question").text(triviaData[questionIndex].question);
        timer();
        dataDiv.empty();
        //And four buttons:
        for (var i = 0; i < triviaData[questionIndex].options.length; i++) {
            optionButton = $("<button>");
            optionButton.addClass("btn btn-outline-dark btn-lg btn-block option");
            optionButton.text(triviaData[questionIndex].options[i]);
            optionButton.val(i);
            dataDiv.append(optionButton);
            //After a button is clicked show the answer:
            optionButton.on("click", function () {
                var clickedButton = $(this);
                dataDiv.empty();
                nextQuestion();
                //If a player answers correctly:
                if (+clickedButton.val() === triviaData[questionIndex].optionIndex) {
                    correctCount++;
                    clearInterval(intervalId);

                    var answerMessage = $("<h4>");
                    answerMessage.text("Correct!");
                    dataDiv.prepend(answerMessage);


                    console.log("Player choice index: ", +clickedButton.val());
                    console.log("Right answer index: ", triviaData[questionIndex].optionIndex);
                    console.log("Correct answer count: ", correctCount, " &  Incorrect answer count: ", incorrectCount);
                }
                //If player answers incorrectly:
                if (+clickedButton.val() !== triviaData[questionIndex].optionIndex) {
                    incorrectCount++;
                    clearInterval(intervalId);

                    var answerMessage = $("<h4>");
                    answerMessage.text("Incorrect!");
                    dataDiv.prepend(answerMessage);


                    console.log("Player choice index: ", +clickedButton.val());
                    console.log("Right answer index: ", triviaData[questionIndex].optionIndex);
                    console.log("Correct answer count: ", correctCount, " &  Incorrect answer count: ", incorrectCount);
                }
                questionIndex++;
            });
        };
    };
    //Set a timeout function that will clear the anwser and show the new set of buttons:
    function nextQuestion() {

        var rightAnswer = $("<p>");
        rightAnswer.text(triviaData[questionIndex].answer);
        dataDiv.append(rightAnswer);

        var image = $("<div>");
        image.addClass("gif-answer");
        image.html("<img src=" + triviaData[questionIndex].image + " alt='Moving on to the next!'>");
        dataDiv.append(image);

        showAnswer = setTimeout(displayQuestion, 5000);
        maxTime = 30;

        console.log("Question index: ", questionIndex);

        if (questionIndex === (triviaData.length - 1)) {
            clearTimeout(showAnswer);
            setTimeout(endTrivia, 5000);
        };
    };
    //Create a function that decrements time and displays it for the player:
    function timer() {
        $("#seconds").text(maxTime);
        intervalId = setInterval(function () {
            maxTime--
            //If player runs out of time:
            if (maxTime === 0) {
                clearInterval(intervalId);
                dataDiv.empty();
                nextQuestion();
                unansweredCount++;
                questionIndex++;

                var answerMessage = $("<h4>");
                answerMessage.text("Time out!");
                dataDiv.prepend(answerMessage);

                console.log("Number of unanswered questions: ", unansweredCount);
            }
            $("#seconds").text(maxTime);
        }, 1000);
    };
    //Creat a function that ends the game:
    function endTrivia() {
        questionIndex = 0;
        $("#question").text("You've completed the game! Here are the results:");
        $("#correct-answers").text("Number of correct answers: " + correctCount);
        $("#incorrect-answers").text("Number of incorrect answers: " + incorrectCount);
        $("#unanswered").text("Number of unanswered questions: " + unansweredCount);
        $("#timer").empty();
        dataDiv.empty();
        $("#game-start").show();
        $("#game-start").text("Click to restart the game!");
    };
});
