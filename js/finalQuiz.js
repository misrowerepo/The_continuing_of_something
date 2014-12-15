 var quiztitle = "Your Learning Quiz";


 var quiz = [
        {
            "question" : "Q1: What color is this triangle??",
            "image" : "http://www.officialpsds.com/images/thumbs/ORANGE-TRIANGLE-psd74081.png",
            "choices" : [
                                    "Red",
                                    "Purple",
                                    "Orange",
                                    "Blue"
                                ],
            "correct" : "Orange",
            "explanation" : "Orange is the right answer! You're still awesome! Let's keep going!.",
        },
        {
            "question" : "Q2: How many apples are there?",
            "image" : "http://www.shashca.com/wp-content/uploads/2012/07/Two-Apples.jpg",
            "choices" : [
                                    "12",
                                    "22",
                                    "3",
                                    "2"
                                ],
            "correct" : "2",
            "explanation" : "Two is the right answer. LET'S GO!!",
        },
        {
            "question" : "Q3: How many cats have paws outside of the fence?",
            "image" : "http://afcatn.org/img/3cats.jpg",
            "choices" : [
                                    "1 of the three",
                                    "2 of the three",
                                    "3 of the three",
                                    "0 of the three"
                                ],
            "correct" : "1 of the three",
            "explanation" : "There's only 1 of the three and he is at the right of the picture.",
        },
     

    ];


 var currentquestion = 0,
     score = 0,
     submt = true,
     picked;

     $(document).ready(function(){
       $("#submitbutton").hide();

     function htmlEncode(value) {
         return $(document.createElement('div')).text(value).html();
     }


     function addChoices(choices) {
         if (typeof choices !== "undefined" && $.type(choices) == "array") {
             $('#choice-block').empty();
             for (var i = 0; i < choices.length; i++) {
                 $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
             }
         }
     }

     function nextQuestion() {
         submt = true;
         alert("nQ");
         $('#explanation').empty();
         $('#question').text(quiz[currentquestion]['question']);
         $('#pager').text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
         if (quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != "") {
             if ($('#question-image').length == 0) {
                 $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
             } else {
                 $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
             }
         } else {
             $('#question-image').remove();
         }
         addChoices(quiz[currentquestion]['choices']);
         setupButtons();


     }


     function processQuestion(choice) {
         alert(choice);
         currentquestion++;
          alert(currentquestion);
         $("#submitbutton").hide();
   
             if (currentquestion == quiz.length) {
                 endQuiz();
             } else {
               
                 nextQuestion();
             }
        
     }


     function setupButtons() {
         $('.choice').on('mouseover', function () {
             $(this).css({
                 'background-color': '#e1e1e1'
             });
         });
         $('.choice').on('mouseout', function () {
             $(this).css({
                 'background-color': '#fff'
             });
         })
         $('.choice').on('click', function () {
             alert("");
             choice = $(this).attr('data-index');
             $('.choice').removeAttr('style').off('mouseout mouseover');
             $(this).css({
                 'border-color': '#222',
                 'font-weight': 700,
                 'background-color': '#c1c1c1'
             });
             if (quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']) {
             $('.choice').eq(choice).css({
                 'background-color': '#50D943'
             });
             $('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
             score++;
         } else {
             $('.choice').eq(choice).css({
                 'background-color': '#D92623'
             });
             $('#explanation').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
         }
                $("#submitbutton").show();
             if (submt) {
                 alert("submit");
                 submt = false;
                 $('#submitbutton').css({
                     'color': '#000'

                 });
                 $("#submitbutton").click(function(){
                   alert("click");
                      $('.choice').off('click');
                     $(this).off('click');
                     processQuestion(choice);
                 });
             }
         })
     }


     function endQuiz() {
         $('#explanation').empty();
         $('#question').empty();
         $('#choice-block').empty();
         $('#submitbutton').remove();
         $('#question').text("You got " + score + " out of " + quiz.length + " correct. Great job!");
         $(document.createElement('h2')).css({
             'text-align': 'center',
             'font-size': '4em'
         }).text(Math.round(score / quiz.length * 100) + '%').insertAfter('#question');
     }


     function init() {
         //add title
         if (typeof quiztitle !== "undefined" && $.type(quiztitle) === "string") {
             $(document.createElement('h1')).text(quiztitle).appendTo('#frame');
         } else {
             $(document.createElement('h1')).text("Quiz").appendTo('#frame');
         }

         //add pager and questions
         if (typeof quiz !== "undefined" && $.type(quiz) === "array") {
             //add pager
             $(document.createElement('p')).addClass('pager').attr('id', 'pager').text('Question 1 of ' + quiz.length).appendTo('#frame');
             //add first question
             $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
             //add image if present
             if (quiz[0].hasOwnProperty('image') && quiz[0]['image'] != "") {
                 $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
             }
             $(document.createElement('p')).addClass('explanation').attr('id', 'explanation').html('&nbsp;').appendTo('#frame');

             //questions holder
             $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');

             //add choices
             addChoices(quiz[0]['choices']);

             //add submit button
             $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Check Answer').css({
                 'font-weight': 700,
                 'color': '#222',
                 'padding': '30px 0',
              }).appendTo('#frame');


           $("#submitbutton").hide();
             setupButtons();
         }
     }

     init();
 });