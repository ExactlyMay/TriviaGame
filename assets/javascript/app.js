

window.onload = function() {
  $("#start").on("click", quizGame);
};

var intervalId;
var time = 30;


// var xml = "assets/xml/Quiz.xml",
// xmlDoc = xml,
// $xml = $( xmlDoc ),
// $question = $xml.find( "Question" );
// $choices = $xml.find( "Choices" );




function quizGame() {
  $("#start").hide();
  $("#timer").html("<h2> Time Remaining: " + time + "</h2>");
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);

  $.ajax({
    type: "GET",
    url: "assets/xml/Quiz.xml",
    dataType: "xml",
    success: function(xml) {
     //remainder of the code
     var $xml = $(xml);
    
    var $questions = $xml.find("questions");
    
    $questions.each(function(){
        
        var question = $(this).find('question').text(),
            choices = $(this).find('choices').text();
        
        $("#question" ).append('<li>' +question+ ' - ' +choices+ '</li>');
        
    });
    }
    });

  // $( "#question" ).append( $question.text() );
  // $( "#choices" ).append( $choices.text() );    
}


function decrement() {
  time--;
  $("#timer").html("<h2> Time Remaining: " + time + "</h2>");
  if (time === 0) {
    stop();
  }
}

function stop() {
  clearInterval(intervalId);
}


 
