var intervalId;
var time;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;
var questionCounter = 0;
var correctAnswer;
var correctImage;
var quiz = [{
		question: "What did Bee grab ice for?",
		choices: ["Bruise", "Ankle", "Crotch", "Headache"],
		answer: "Crotch",
		image: "assets/images/ice.gif"
	},
	{
	  question: "Who does Bee have a crush on?",
	  choices: ["Deckard", "Cardamon", "Puppycat", "Wallace"],
	  answer: "Deckard",
	  image: "assets/images/deckard.gif"
	},
	{
	  question: "What is Deckard's sister's name?",
	  choices: ["Lily", "Ann", "Opal", "Cass"],
	  answer: "Cass",
	  image: "assets/images/cass.gif"
	},
	{
	  question: "What animal annoyed Puppycat for a full episode?",
	  choices: ["Hedgehog", "Crab", "Squirrel", "Dog"],
	  answer: "Crab",
	  image: "assets/images/puppycat.gif"
	},
	{
	  question: "What did Cardamon use to fix the toilet?",
	  choices: ["Plunger", "Wrench", "Pipe", "Hammer"],
	  answer: "Hammer",
	  image: "assets/images/cardamon.gif"
	},
	{
	  question: "What is Bee and Puppycat's favorite show?",
	  choices: ["Cute Catie", "Diggin' Doug", "Pretty Patrick", "Raving Robin"],
	  answer: "Pretty Patrick",
	  image: "assets/images/patrick.gif"
	},
	{
	  question: "What was the turtle in the Temp Agency eating?",
	  choices: ["Sushi", "Candy", "Pellets", "Dirt"],
	  answer: "Sushi",
	  image: "assets/images/turtle.gif"
  },
	{
	  question: "Who was loved by humanoid cats while in a cat suit?",
	  choices: ["TempBot", "Bee", "Puppycat", "Deckard"],
	  answer: "Bee",
	  image: "assets/images/cats-one.gif"
	}             
];

window.onload = function() {
	$("#start").on("click", quizGame);
};

function quizGame() {
	time = 15;
	correctCounter = 0;
	incorrectCounter = 0;
	unansweredCounter = 0;
	questionCounter = 0;
	$("#start").hide();
	$("#choices").html("");
	$("#timer").html("<p id='timeText'> Time Remaining: " + time + "</p>");
	clearInterval(intervalId);
	intervalId = setInterval(decrement, 1000);
	quizQuestions(questionCounter);
}

function quizQuestions(number) {
	var question = quiz[number].question;
	$("#question").html("<p id='questionText'>" + question + "</p>");
	var options = quiz[number].choices;
	for (var opt in options) {
		$("#choices").append("<button class='btnChoices'>" + options[opt] + "</button>" + "<br>");
	}
	correctAnswer = quiz[number].answer;
	correctImage = quiz[number].image;
	checkAnswer(correctAnswer);
}

function checkAnswer(answer) {
	$(".btnChoices").on("click", function() {
		var userText = $(this).text();
		if (answer === userText) {
			correctCounter++;
			$("#question").hide();
			$("#choices").html("<p>Wow, you got it!</p>");
			$("#choices").append("<img id='imgCorrect' src=" + correctImage + " />");
			stop();
		} else {
			incorrectCounter++;
			$("#choices").html("<p>That's the wrong answer...</p>");
			wrongAnswer();
		}
		questionCounter++;
		setTimeout(resetQuestion, 1000 * 5);
	});
}

function decrement() {
	time--;
	$("#timer").html("<p id='timeText'> Time Remaining: " + time + "</p>");
	if (time === 0) {
		unansweredCounter++;
		$("#choices").html("<p>Out of time!</p>");
		wrongAnswer();
		questionCounter++;
		setTimeout(resetQuestion, 1000 * 5);
	}
}

function stop() {
	clearInterval(intervalId);
}

function resetQuestion() {
	if (questionCounter == quiz.length) {
		$("#question").show();
		$("#question").html("<p>All done, here's how you did!</p>");
		$("#choices").html("<img id='endingImg' src='assets/images/ending.gif'/>");
		$("#choices").append("<p id='results'> Correct Answers: " + correctCounter + "<br>" + "Incorrect Answers: " + incorrectCounter + "<br>" + "Unanswered: " + unansweredCounter + "</p>");
		$("#start").show();
		$("#start").html("Start Over?");
	} else {
		time = 15;
		$("#timer").html("<p id='timeText'> Time Remaining: " + time + "</p>");
		$("#question").show();
		$("#choices").html("");
		clearInterval(intervalId);
		intervalId = setInterval(decrement, 1000);
		quizQuestions(questionCounter);
	}
}

function wrongAnswer() {
	$("#question").hide();
	$("#choices").append("<p>The correct answer was: " + correctAnswer + "</p>");
	$("#choices").append("<img id='imgWrong' src=" + correctImage + " />");
	stop();
}