(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//import {input, subject} from './index.js'
//console.log(input)


async function getInput (attempts=3) {
  try {
  const fetchy = await fetch(`http://localhost:3000/intermediary`)
  const data = await fetchy.json()
  let input = data[0].name
  let subject = data[1].subject
  
  let highScore = 0

  const scoreFetch = await fetch(`http://localhost:3000/${subject}/leaderboard`);
  const leaderboard = await scoreFetch.json()


  const userHighScores = leaderboard.filter(user => user.name == input);

  if (!userHighScores.length) {
    highScore = 0;
  } else {
    highScore = userHighScores[0].score;
  }
  
  thing(input, subject, highScore)
  } catch (error) {
    if (attempts <= 0) {
      console.error('Failed to fetch after multiple attempts');
      return;
    }
    // Retry the request with a delay of 1 second
    setTimeout(() => {
      getInput(attempts - 1);
    }, 1000);
  }
}
getInput()


function thing (input, subject, highScore){
  

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timeElement = document.querySelector('#countdown-number');
let beenClicked = false
let currentQuestionIndex=0

const userName=document.getElementById('userName')
const scoreElement=document.getElementById('score')
userName.classList.add('userName') 
userName.textContent=input  //input
scoreElement.textContent="High score: " + highScore
let score


startButton.addEventListener('click', () => startGame());




async function startGame() {
const questions= await fetch(`http://localhost:3000/${subject}`)   
const data=await questions.json()
  startButton.classList.add('hide')
  currentQuestionIndex = 0
  score = 0
  //add in username and score
  scoreElement.textContent="Score: " +score
  questionContainerElement.classList.remove('hide')
  answerButtonsElement.classList.remove('hide')
  questionElement.classList.remove('hide')
  nextButton.addEventListener('click', () => {

    currentQuestionIndex++

    setNextQuestion(data)
  })
  
  setNextQuestion(data)

}
function timer(timeSecond) {
const countDown = setInterval(() => {
  timeSecond--;
  timeElement.innerHTML = timeSecond + " seconds left"
  if (timeSecond<= 0 || timeSecond <1||beenClicked) {
    clearInterval(countDown)
    answerButtonsElement.childNodes.forEach((element)=>{
      if (timeSecond ==0)
       element.classList.add('incorrect')
       element.removeEventListener('click',selectAnswer)
       } ) 
    
    if (timeSecond < 1) {
      timeElement.textContent ="Time up!";
    }

    if(15 > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
    }
  }

},1000)
}

function setNextQuestion(data) {
  //set timer
  timer(10)
  resetState()
  displayQuestion(data)
}


function displayQuestion(data){
    

    let currentQuestion= data[currentQuestionIndex]
    questionElement.innerText=currentQuestion.question
    currentQuestion.answersList.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer
        button.classList.add('btn')
        
        if(answer==currentQuestion.answer){
            button.dataset.correct= true
            
        }
        button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
    })}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  beenClicked= false
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  beenClicked = true
  if(correct){
    score+= 500 + 50 * (Number(timeElement.textContent.split(" ")[0]));
    scoreElement.textContent="Score: " + score
  }

  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  //data.length wasn't working
  if(15 > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
} else {
  startButton.innerText = 'Restart'
  startButton.classList.remove('hide')
  if(score>highScore){
  document.getElementById('score').textContent="End of quiz, new high score!: " +score
  document.getElementById('highScore').textContent="Your high score is: "+score
  sendScores(input, score, subject);
  } else{
    document.getElementById('score').textContent="End of quiz, your score was: " +score
    document.getElementById('highScore').textContent="Your high score is: "+highScore
  }
  
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('incorrect')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

async function sendScores(name, score, subject) {
    const data = {"name":name, "score":score};
    const options = {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    }

    const resp = await fetch(`http://localhost:3000/${subject}`, options);
} 
}


},{}]},{},[1]);
