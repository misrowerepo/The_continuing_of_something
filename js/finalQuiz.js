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
       {
            "question" : "Q4: If you and either mommy or daddy are doing the quiz, how many people are doing the quiz?",
            "image" : "http://i120.photobucket.com/albums/o173/snowdenranya/MySpace%20Pics/ROYAL%20TALK%20Publications/MOMwithwalkingchild1_zps5cee772f.jpg",
            "choices" : [
                                    "2 people",
                                    "1 person",
                                    "3  people (because rex is in the room)",
                                    "0 people"
                                ],
            "correct" : "2 people",
            "explanation" : "We are not being mean, but if we don't count Rex there should be just 2 of you!.",
        },
        {
            "question" : "Q5: If you have 2 oranges and Tux has 2 oranges, if Tux gives you his two oranges you will have multiplied your oranges twice! How many total organges do you have now?",
            "image" : "http://gardenworldimages.co.uk/ImageThumbs/FP_CS3104/1/FP_CS3104_CITRUS_SINENSIS_ORANGE.jpg",
            "choices" : [
                                    "2 Oranges",
                                    "5 Oranges",
                                    "4 Oranges",
                                    "6 Oranges"
                                ],
            "correct" : "4 Oranges",
            "explanation" : "When you multiply, you are saying that you have a certain amount of things so many times. So you have 2 oranges 2 times which makes 4 Oranges! ",
        }

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
         currentquestion++;
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
                 submt = false;
                 $('#submitbutton').css({
                     'color': '#000'

                 });
                 $("#submitbutton").click(function(){
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
             $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Next Question').css({
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