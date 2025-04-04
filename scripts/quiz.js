// // Wedding Quiz Functionality

// document.addEventListener('DOMContentLoaded', function() {
//     initQuiz();
// });

// function initQuiz() {
//     const quizContainer = document.getElementById('quiz-container');
    
//     if (!quizContainer) return;
    
//     // Sample quiz questions
//     const quizQuestions = [
//         {
//             question: "Where did Emma and James first meet?",
//             options: [
//                 "At a coffee shop",
//                 "Through mutual friends",
//                 "At a concert",
//                 "In college"
//             ],
//             correctAnswer: 2,
//             funFact: "They met at a Taylor Swift concert in 2018 when they were both dragged there by friends!"
//         },
//         {
//             question: "What was their first date?",
//             options: [
//                 "Dinner and a movie",
//                 "Hiking",
//                 "A cooking class",
//                 "Mini golf"
//             ],
//             correctAnswer: 3,
//             funFact: "James picked mini golf to show off his skills, but Emma beat him by 5 strokes!"
//         },
//         {
//             question: "Which city did they get engaged in?",
//             options: [
//                 "Paris",
//                 "New York",
//                 "Rome",
//                 "London"
//             ],
//             correctAnswer: 0,
//             funFact: "James proposed at sunset near the Eiffel Tower after they both got soaked in an unexpected rainstorm."
//         },
//         {
//             question: "What is Emma's favorite food that James learned to cook for her?",
//             options: [
//                 "Lasagna",
//                 "Butter chicken",
//                 "Sushi",
//                 "Chocolate soufflé"
//             ],
//             correctAnswer: 1,
//             funFact: "It took James 7 attempts to perfect his butter chicken recipe!"
//         },
//         {
//             question: "What is their shared hobby?",
//             options: [
//                 "Rock climbing",
//                 "Salsa dancing",
//                 "Gardening",
//                 "Board games"
//             ],
//             correctAnswer: 1,
//             funFact: "They've been taking salsa lessons every Friday night for the past 3 years."
//         },
//         {
//             question: "What pet do Emma and James have?",
//             options: [
//                 "A cat named Luna",
//                 "A dog named Max",
//                 "A parrot named Rio",
//                 "A turtle named Sheldon"
//             ],
//             correctAnswer: 0,
//             funFact: "Luna was a stray kitten they found in their backyard and immediately fell in love with."
//         },
//         {
//             question: "Where are they going for their honeymoon?",
//             options: [
//                 "Maldives",
//                 "Japan",
//                 "New Zealand",
//                 "It's a surprise!"
//             ],
//             correctAnswer: 3,
//             funFact: "James is planning the honeymoon as a surprise for Emma. Even she doesn't know the answer to this one!"
//         }
//     ];
    
//     let currentQuestion = 0;
//     let score = 0;
//     let answeredQuestions = 0;
    
//     // Create quiz elements
//     const quizHeader = document.createElement('div');
//     quizHeader.className = 'quiz-header';
//     quizHeader.innerHTML = `
//         <h2>How Well Do You Know the Couple?</h2>
//         <p>Test your knowledge about Emma and James with this fun quiz!</p>
//         <div class="quiz-progress">
//             <div class="progress-text">Question <span id="current-question">1</span>/<span id="total-questions">${quizQuestions.length}</span></div>
//             <div class="progress-bar">
//                 <div class="progress" id="quiz-progress-bar" style="width: ${100 / quizQuestions.length}%"></div>
//             </div>
//         </div>
//     `;
//     quizContainer.appendChild(quizHeader);
    
//     const quizContent = document.createElement('div');
//     quizContent.className = 'quiz-content';
//     quizContainer.appendChild(quizContent);
    
//     function displayQuestion() {
//         const question = quizQuestions[currentQuestion];
        
//         // Update progress indicators
//         document.getElementById('current-question').textContent = currentQuestion + 1;
//         document.getElementById('quiz-progress-bar').style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;
        
//         // Create question element
//         quizContent.innerHTML = `
//             <div class="question">
//                 <h3>${question.question}</h3>
//                 <div class="options">
//                     ${question.options.map((option, index) => `
//                         <div class="option" data-index="${index}">
//                             <span class="option-letter">${String.fromCharCode(65 + index)}</span>
//                             <span class="option-text">${option}</span>
//                         </div>
//                     `).join('')}
//                 </div>
//             </div>
//         `;
        
//         // Add click event to options
//         const options = quizContent.querySelectorAll('.option');
//         options.forEach(option => {
//             option.addEventListener('click', function() {
//                 const selectedIndex = parseInt(this.dataset.index);
//                 checkAnswer(selectedIndex);
//             });
//         });
//     }
    
//     function checkAnswer(selectedIndex) {
//         const question = quizQuestions[currentQuestion];
//         const options = quizContent.querySelectorAll('.option');
        
//         // Disable all options after selection
//         options.forEach(option => {
//             option.style.pointerEvents = 'none';
//         });
        
//         // Get correct option
//         const correctOption = options[question.correctAnswer];
//         correctOption.classList.add('correct');
        
//         // If selected option is not correct
//         if (selectedIndex !== question.correctAnswer) {
//             options[selectedIndex].classList.add('incorrect');
//         } else {
//             score++;
//         }
        
//         answeredQuestions++;
        
//         // Show fun fact
//         const funFactElement = document.createElement('div');
//         funFactElement.className = 'fun-fact fade-in';
//         funFactElement.innerHTML = `
//             <div class="fun-fact-content">
//                 <h4><i class="fas fa-lightbulb"></i> Fun Fact</h4>
//                 <p>${question.funFact}</p>
//             </div>
//         `;
//         quizContent.appendChild(funFactElement);
        
//         // Show next button
//         const nextButton = document.createElement('button');
//         nextButton.className = 'btn next-question';
//         nextButton.textContent = currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results';
//         nextButton.addEventListener('click', function() {
//             if (currentQuestion < quizQuestions.length - 1) {
//                 currentQuestion++;
//                 displayQuestion();
//             } else {
//                 showResults();
//             }
//         });
//         quizContent.appendChild(nextButton);
//     }
    
//     function showResults() {
//         let resultMessage, resultClass;
//         const percentage = (score / quizQuestions.length) * 100;
        
//         if (percentage >= 85) {
//             resultMessage = "Amazing! You really know Emma and James well!";
//             resultClass = "excellent";
//         } else if (percentage >= 70) {
//             resultMessage = "Great job! You know quite a bit about the couple!";
//             resultClass = "great";
//         } else if (percentage >= 50) {
//             resultMessage = "Not bad! You know some things about Emma and James.";
//             resultClass = "good";
//         } else {
//             resultMessage = "Looks like you're just getting to know Emma and James. That's okay!";
//             resultClass = "fair";
//         }
        
//         quizContent.innerHTML = `
//             <div class="quiz-results ${resultClass}">
//                 <h3>Your Score: ${score}/${quizQuestions.length}</h3>
//                 <div class="result-meter">
//                     <div class="result-progress" style="width: ${percentage}%"></div>
//                 </div>
//                 <p class="result-message">${resultMessage}</p>
//                 <div class="result-actions">
//                     <button class="btn retry-quiz">Try Again</button>
//                     <button class="btn share-results">Share Results</button>
//                 </div>
//             </div>
//         `;
        
//         // Retry quiz button
//         quizContent.querySelector('.retry-quiz').addEventListener('click', function() {
//             currentQuestion = 0;
//             score = 0;
//             answeredQuestions = 0;
//             displayQuestion();
//         });
        
//         // Share results button
//         quizContent.querySelector('.share-results').addEventListener('click', function() {
//             const