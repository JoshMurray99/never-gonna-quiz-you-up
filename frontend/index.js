//let input = localStorage.getItem('input')
let input;
async function createUser(e) {
  //localStorage.setItem('input', input)
  e.preventDefault()
  input = document.getElementById("userInput").value
  const displayUser= document.getElementById('user')
  displayUser.innerText = input;

  const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
    //body: JSON.stringify(input)
    }
  const response=await fetch(`http://localhost:3000/intermediary-name/${input}`, options)
  console.log(response)
}

//const displayUser= document.getElementById('user')
const submit=document.querySelector('button')
submit.addEventListener('click', createUser)


let subject;
async function selectSubject(subject) {
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response= await fetch(`http://localhost:3000/intermediary-subject/${subject}`, options)
    console.log(response)
}

const geographyButton=document.querySelector('.subject.geography')
const historyButton=document.querySelector('.subject.history')
geographyButton.addEventListener('click', () => {
    selectSubject('geography')
    const link = geographyButton.querySelector('a.subject__title')
    window.location.href = link.href;})
historyButton.addEventListener('click', () => {
    selectSubject('history')
    const link = historyButton.querySelector('a.subject__title')
    window.location.href = link.href;})



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
