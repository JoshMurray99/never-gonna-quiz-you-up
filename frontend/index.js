let input = localStorage.getItem('input')

function createUser() {
  input = document.getElementById("userInput").value
  localStorage.setItem('input', input)
  document.querySelector('.user').innerHTML = input;
  console.log(input)
}




let subject = 'Geography'

function questionSelection() {
     subject = 'History'
}
console.log(subject)
module.exports = {input, subject}


