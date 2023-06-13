(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const questionElement = document.querySelector("#question")
const answer1Element = document.querySelector("#answer1")
const answer2Element = document.querySelector("#answer2")
const answer3Element = document.querySelector("#answer3")
const answer4Element = document.querySelector("#answer4")

async function displayQuestions(subject) {
    const response = await fetch(`http://localhost:3000/${subject}`)
    return questionElement.textContent = response.content, answer1Element.textContent = response.answersList[0],answer1Element.textContent = response.answersList[1],answer1Element.textContent = response.answersList[2],answer1Element.textContent = response.answersList[3]
}

},{}]},{},[1]);
