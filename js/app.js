
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

//Problem need to create functionality of game
//Solution: code the game in java script so it works!

//Set random secret number between 1 - 100 function randomNumber()

	var randomNumber = Math.ceil(Math.random() * 100);
				 	   console.log(randomNumber)
	
	var lastGuess = 0;
	var changeOldGuess = true;
	var $guessButton = $("#guessButton");
	var $count = $("#count");
	var $guessList = $("#guessList");
	var $feedback = $('h2#feedback')

/*---- function newGame()  -- 
-------when page loads and when .new is clicked*/
	newGame = function () {
		$(".new").click(function() {
			location.reload();
		})
	};

	newGame();


	//Enter a number to guess between 1 and 100
	yourGuess = function(numGuessed) {

		var guessDiffNew = Math.abs(randomNumber - numGuessed);
        var guessDiffLast = Math.abs(randomNumber - lastGuess);

	//show number the user guessed append to ul #guessList
        if (numGuessed !== '' && !isNaN(numGuessed)) {
            $guessList.append("<li>" + numGuessed + "</li>")
    //count the number of guesses
            $count.html(function(i, val) {
                return + val + 1
            })
        }
    //ensure numeric input
        if (isNaN(numGuessed)) {
            changeOldGuess = false;
            return "This is not a number.";
        } else if ((numGuessed < 1) || (numGuessed > 100)) {
            changeOldGuess = false;
            return "Pick a number between 1 and 100.";
        }

	// function guessFeedback() warm warmer colder cold
	// 50    + ice cold
	// 30 - 50 cold
	// 20 - 30 warm
	// 10 - 20 hot
	//  1 - 10 very hot
	//   ===   You guessed the number!
	//message appears in #feedback
	    function guessFeedback() {
            // Return if user is getting closer
            if (guessDiffNew > 50) {
                $feedback.text("Ice Cold");
                return "You are frozen";
            } else if (guessDiffNew > 30) {
                $feedback.text("Cold");
                return "You are cold";
            } else if (guessDiffNew > 20) {
            	$feedback.text("Warm");
                return "You are Warm";
            } else if (guessDiffNew > 10) {
                $feedback.text("Hot");
                return "You are hot";
            }  else {
              	$feedback.text("Very Hot");
              	return "You are very hot";
            }
        }

        function checkDiff() {
            if (lastGuess == 0) {
                return ".";
            } else if (guessDiffNew > guessDiffLast) {
                return " and you are getting colder.";
            } else if (guessDiffNew < guessDiffLast) {
                return " and you are getting warmer.";
            } else {
                return ".";
            }
        }
		return (guessFeedback() + checkDiff());
	}


	//display total number of guesses in #count
    $guessButton.click(submit);
    $("#userGuess").keyup(function(event) {
        if (event.keyCode == 13) {
            //$("#guessButton").click();
        }
    });



    function submit() {
    	var numGuessed = $("#userGuess").val();
        if (numGuessed == randomNumber) {

            $feedback.attr('class', 'hot');
            $feedback.html("You are correct! Click on New game to try again.");
            randomNumber = Math.ceil(Math.random() * 100);
            lastGuess = 0;
            return;
        }

        $feedback.html(yourGuess(numGuessed));
        console.log("old guess is " + lastGuess + " and the answer is " + randomNumber);
        if (changeOldGuess) {
            lastGuess = numGuessed;
        } else {
            changeOldGuess = true;
        }

    };

    /* Prevent click on guess submit button from refrshing DOM */
    $('form').on('click', '#guessButton', function(e) {
        e.preventDefault();
    });

});













