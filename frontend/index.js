//let input = localStorage.getItem('input')
let input;
function createUser() {
  //localStorage.setItem('input', input)
  input = document.getElementById("userInput").value
  const displayUser= document.getElementById('user')
  displayUser.innerText = input;
}

//const displayUser= document.getElementById('user')
const submit=document.querySelector('button')
submit.addEventListener('click', createUser)

let subject = 'geography'

function questionSelection() {
     subject = 'History'
}

export{input,subject}

const geoLeaderboard = document.querySelector("#geoLeaderboard");
const histLeaderboard = document.querySelector("#histLeaderboard");

fetchLeaderboardData('geography');
fetchLeaderboardData('history');



async function fetchLeaderboardData(subject) {
    try {
        const resp = await fetch(`http://localhost:3000/${subject}/leaderboard`);

        if (resp.ok) {
            const data = await resp.json();
            updateLeaderboard(data, subject);
        } else {
            throw "Error. Something has gone wrong with the API request."
        }
    } catch (error) {
        console.log(error);
    }
}

function updateLeaderboard(data, subject) {
    //console.log(geoLeaderboard.children[0].childNodes[1])
    if (subject === "geography") {
        geoLeaderboard.children[0].childNodes[1].textContent = `${data[0].name} - ${data[0].score}`;
        geoLeaderboard.children[0].childNodes[3].textContent = `${data[1].name} - ${data[1].score}`;
        geoLeaderboard.children[0].childNodes[5].textContent = `${data[2].name} - ${data[2].score}`;
    } else if(subject === "history") {
        histLeaderboard.children[0].childNodes[1].textContent = `${data[0].name} - ${data[0].score}`;
        histLeaderboard.children[0].childNodes[3].textContent = `${data[1].name} - ${data[1].score}`;
        histLeaderboard.children[0].childNodes[5].textContent = `${data[2].name} - ${data[2].score}`;
    }
}
