$(document).ready(function() {

    // Gererate Random Number
    var answer = Math.floor((Math.random() * 100) + 1);
    // $('div#rnum').text(answer);

    // Assign Vars
    var oldGuess = 0;
    var changeOldGuess = true;
    var messageText = "message";
    var count = 0;


    // Start a new game
    function newGame() {

        $(".new").click(function() {
            // alert("newclicked")

            location.reload();

        })
    };

    newGame();



    /*--- Display information modal box ---*/
    $(".what").click(function() {
        $(".overlay").fadeIn(1000);
    });
    /*--- Hide information modal box ---*/
    $("a.close").click(function() {
        $(".overlay").fadeOut(1000);
    });

    function submitGuess(newGuess) {

        // Calculate the user's guess from the answer
        var guessDiffNew = Math.abs(answer - newGuess);
        var guessDiffOld = Math.abs(answer - oldGuess);

        // List numbers that user guesses if it's not empty
        if (newGuess !== '' && !isNaN(newGuess)) {
            $('#guessList').append("<li>" + newGuess + "</li>")
                // Count the number of guesses
            $('#count').html(function(i, val) {
                return +val + 1
            });
        }


        // Check to see is the input is nto a number
        if (isNaN(newGuess)) {
            changeOldGuess = false;
            return "This is not a number.";
        } else if ((newGuess < 1) || (newGuess > 100)) {
            changeOldGuess = false;
            return "Pick a number between 1 and 100.";
        }

        function checkAbs() {
            // Return if user is getting closer
            if (guessDiffNew > 30) {
                $('h2#feedback').text("Very Cold");
                return "You are frozen";
            } else if (guessDiffNew > 20) {
                $('h2#feedback').text("cold");
                return "You are cold";
            } else if (guessDiffNew > 10) {
                return "You are warm";
                $('h2#feedback').text("Warm");
            } else {
                return "You are hot";
                $('h2#feedback').text("hot");
            }
        }

        function checkDiff() {
            if (oldGuess == 0) {
                return ".";
            } else if (guessDiffNew > guessDiffOld) {
                return " and you are getting colder.";
            } else if (guessDiffNew < guessDiffOld) {
                return " and you are getting warmer.";
            } else {
                return ".";
            }
        }

        return (checkAbs() + checkDiff());

    }

    $("#guessButton").click(submit);
    $("#userGuess").keyup(function(event) {
        if (event.keyCode == 13) {
            //$("#guessButton").click();
        }
    });

    function submit() {

        var newGuess = $('#userGuess').val();
        if (newGuess == answer) {

            $('#feedback').attr('class', 'hot');
            $('#feedback').html("You are correct! Click on New game to try again.");
            answer = Math.floor((Math.random() * 100) + 1);
            oldGuess = 0;
            return;
        }

        $('#feedback').html(submitGuess(newGuess));
        console.log("old guess is " + oldGuess + " and the answer is " + answer);
        if (changeOldGuess) {
            oldGuess = newGuess;
        } else {
            changeOldGuess = true;
        }

    }

    /* Prevent click on guess submit button from refrshing DOM */
    $('form').on('click', '#guessButton', function(e) {
        e.preventDefault();
    });

// Other


});
