import {input, subject} from './index.js'

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let currentQuestionIndex=0

startButton.addEventListener('click', () => startGame(subject));



async function startGame(subject) {
const questions= await fetch(`http://localhost:3000/${subject}`)
    
const data=await questions.json()

  startButton.classList.add('hide')
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  answerButtonsElement.classList.remove('hide')
  questionElement.classList.remove('hide')
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion(data)
  })
  setNextQuestion(data)
}

function setNextQuestion(data) {
  resetState()
  displayQuestion(data)
}

//async function chooseSubject (subject) {
  //  const questions= await fetch(`http://localhost:3000/${subject}`)
  //  if(questions.ok){
  //      return startGame()
   // }
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
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
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

    


