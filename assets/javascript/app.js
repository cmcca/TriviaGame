var triviaQuestions = [{
	question: "During his embarrassing Dundie award presentation, Michael covers a number of popular songs. To whom is Michael presenting a Dundie award when he sings along to 'You Sexy Thing?' ",
	answerList: ["Pam", "Ryan", "Dwight", "Phyllis"],
	answer: 1
},
{
	question: "In the episode 'Diversity Day', workers in the office undergo a training program on diversity. What is the reason for this needing to happen?",
	answerList: ["Standard Company Policy", "Stanley had a heart attack", "Michael's impersonation of Chris Rock", "Michael created an offensive character"],
	answer: 2
},
{
	question: "How much money does Michael accedentally donate per mile to Oscar's nephew's charity run?",
	answerList: ["$25", "$30", "$5", "$40"],
	answer: 0
},
{
	question: "What is Michael Scott's middle name?",
	answerList: ["Jessie", "Eric", "Gary", "Mark"],
	answer: 2
},
{
	question: "Who does Jim date right before Pam?",
	answerList: ["Angela", "Kelly", "Katy", "Karen"],
	answer: 3
},
{
	question: "Who gets fired on Halloween?",
	answerList: ["Devon", "Rick", "George", "Toby"],
	answer: 0
},
{
	question: "Which is NOT a name of one of Michael's girlfriends?",
	answerList: ["Carol", "Grace", "Holly", "Jan"],
	answer: 1
},
{
	question: "What is the web address of Creed's blog?",
	answerList: ["www.creedscorner.org", "www.crazyoldman.edu/creed", "www.creedthoughts.gov.www/creedthoughts", "www.creedb.com/bthoughts"],
	answer: 2
},
{
	question: "What is the exclusive club that Pam, Oscar, and Toby establish?",
	answerList: ["Classy Club", "Fancy Friends", "The Fine Club", "Finer Things Club"],
	answer: 3
},
{
	question: "What is Jim's favorite desert to hide office supplies in?",
	answerList: ["Pie", "Pudding", "Cake", "Jello"],
	answer: 3
},
{
	question: "What does Michael burn his foot on?",
	answerList: ["A fire Walk", "A George Forman Grill", "An iron", "Bacon"],
	answer: 1
},
{
	question: "What does Dright grow at Schrute Farms?",
	answerList: ["Carrots", "Beets", "Broccoli", "Celery"],
	answer: 1
},
{
	question: "How many rules do Schrute boys need to learn before the age of 5?",
	answerList: ["100", "50", "40", "10"],
	answer: 2
},
{
	question: "What game does the Stamford branch use as 'team building'?",
	answerList: ["Call of Duty", "Settlers of Catan", "Halo", "Borderlands"],
	answer: 0
},
{
	question: "Where did Michael get his'World's best boss' mug?",
	answerList: ["An old employee", "His Mom", "Spencer's Gifts", "Your Mom"],
	answer: 2
}];

var gifArray = [
    "question1", 
    "question2", 
    "question3", 
    "question4", 
    "question5", 
    "question6", 
    "question7", 
    "question8", 
    "question9", 
    "question10", 
    "question11", 
    "question12", 
    "question13",
    "question14",
    "question15"
];

var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Yep!",
	incorrect: "Nope",
	endTime: "Times up",
	finished: "How'd ya do?"
}

$("#startBtn").on("click", function(){
	$(this).hide();
	newGame();
});

$("#startOverBtn").on("click", function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$("#finalMessage").empty();
	$("#correctAnswers").empty();
	$("#incorrectAnswers").empty();
	$("#unanswered").empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();
	answered = true;
	
	
	$("#currentQuestion").html("Question #"+(currentQuestion+1)+" of "+triviaQuestions.length);
	$(".question").html("<h2>" + triviaQuestions[currentQuestion].question + "</h2>");
	for(var i = 0; i < 4; i++){
		var choices = $("<div>");
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({"data-index": i });
		choices.addClass("thisChoice");
		$(".answerList").append(choices);
	}
	countdown();
	
	$(".thisChoice").on("click",function(){
		userSelect = $(this).data("index");
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	answered = true;
	
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$("#currentQuestion").empty();
	$(".thisChoice").empty(); 
	$(".question").empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$("#gif").html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');

	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$("#message").html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$("#message").html(messages.incorrect);
		$("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
	} else{
		unanswered++;
		$("#message").html(messages.endTime);
		$("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
    } 
    else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$("#timeLeft").empty();
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();

	$("#finalMessage").html(messages.finished);
	$("#correctAnswers").html("Correct Answers: " + correctAnswer);
	$("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
	$("#unanswered").html("Unanswered: " + unanswered);
	$("#startOverBtn").addClass("reset");
	$("#startOverBtn").show();
	$("#startOverBtn").html("Start Over?");
}