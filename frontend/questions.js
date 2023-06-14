//import {input, subject} from './index.js'
//console.log(input)
let subject='geography'
let input='Joshua'
let highScore=0

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
const questions= await fetch(`http://localhost:3000/geography`)   
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
    // const resetCountDown =() =>{
    //   clearInterval(countDown);
    //   timeSecond =30;
    //   timeElement.innerHTML = timeSecond;
    // }
  })
  
  setNextQuestion(data)

}
function timer(timeSecond) {
const countDown = setInterval(() => {
  timeSecond--;
  timeElement.innerHTML = timeSecond + " seconds left"
  if (timeSecond<= 0 || timeSecond <1||beenClicked) {
    clearInterval(countDown)
    // answerButtonsElement.children.forEach((element)=>{
    //     element.removeEventListener("click",selectAnswer)
    //   } ) 
    timeElement.textContent ="Time up!";
    nextButton.classList.remove('hide')

  }
  

},1000)}

function setNextQuestion(data) {
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
    score+=10
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

    


