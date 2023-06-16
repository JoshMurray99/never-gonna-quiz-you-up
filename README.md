------------------------------------
***Never Gonna Quiz You Up Quiz Project***
------------------------------------

------------------------------------
***Project Description***
------------------------------------
Our app is a quiz app where the user can enter their name and choose a subject between geography and history and answer questions on these subjects. For each question the player has 10 seconds to answer. The quicker the player chooses the correct answer, the more points that player will be awarded. Both subject quizzes contain a random selection of 15 questions from a bank of questions. A leaderboard of the top three scores for each subject is displayed on the home screen.

***Major Challenges***
We faced many challenges with getting the home page (index.html) to link to the questions page (questions.html) as you cannot export a variable inside a function and you cannot return a value from an asynchronous function so we had to modify the backend of the project to write the user's name and subject choice into .json files via a POST request only to be retrieved via a GET request immediately once the user loaded the questions page.

Another big problem we encountered came from the Live Server extension of VSCode automatically reloading our page once a players score or details were written to one of the .json files causing access to the backend server being denied. This error was fixed by editing the liveServer extension settings to ignore changes to .json files.


------------------------------------
***How to Install and Run Project***
------------------------------------
Note - this quide assumes that you have VSCode and the Live Server extension installed.

1. Open the terminal on your computer.
2. "cd" into the directory that you would like the project folder to be created.
3. Type "git clone https://github.com/JoshMurray99/never-gonna-quiz-you-up.git" into the terminal.
4. "cd" into the project.
5. Type "npm install" in the terminal.
6. Type "npm start" in the terminal.
7. Type "code ." to open the code in VSCode.
7. Right click on the file called "index.html" inside the "frontend" directory and click "Open with Live Server".

***How to use the Project***
Enter your name in the top left and click submit so that your scores can be saved.
Choose the topic of the quiz, either geography or history.
Choose your answers as quickly as possible to achieve the best score.

To add a question to the current list of questions, navigate to the "questionsList" directory inside the "server" directory. Choose the requisute .json for either the history questions or geography questions. Add an object to the array with the following key-value pairs:
1. key: "question", value: write the question
2. key: "answersList", value: an array consisting of four elements each of which will be the options displayed in the quiz.
3. key: "answer:, value: the element in the array which is the correct answer.
e.g. {"question":"How many wives did King Henry VIII have?", "answersList":[1, 4, 8, 6], "answer":6}

------------------------------------
***Known Bugs***
------------------------------------



------------------------------------
***Potential Future Updates***
------------------------------------
1. Add the ability to add questions through the browser.
2. Add the ability to add more subjects.
3. Use databases to store leaderboard and question data.
