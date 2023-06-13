const questionElement = document.querySelector("#question")
const answer1Element = document.querySelector("#answer1")
const answer2Element = document.querySelector("#answer2")
const answer3Element = document.querySelector("#answer3")
const answer4Element = document.querySelector("#answer4")

async function displayQuestions(subject) {
    const response = await fetch(`http://localhost:3000/${subject}`)
    return questionElement.textContent = response.content, answer1Element.textContent = response.answersList[0],answer1Element.textContent = response.answersList[1],answer1Element.textContent = response.answersList[2],answer1Element.textContent = response.answersList[3]
}
