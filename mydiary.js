const textarea = document.querySelector('textarea');
const diaryBody = document.querySelector('.diary-body');
const mic = document.querySelector('.mic');
const message = document.querySelector('.msg');
const form = document.querySelector('form');
const langUS = document.querySelector('.usa-flag');
const langIndia = document.querySelector('.india-flag');

let speechMsg = '';
let hindi = 'hi-IN';
let en = 'en-US';
const actual = document.querySelector('.actual-lang');


const recognition = new window.webkitSpeechRecognition() || window.webkitSpeechRecognition;
recognition.continuous = false;

recognition.lang = en;
recognition.interimResults = false;
recognition.maxAlternatives = 1;
actual.innerHTML = recognition.lang;

recognition.onresult = e =>{
  if(typeof(e.results) === 'undefined'){
    recognition.onend = null;
    recognition.stop();
    return;
  }
  else{
    //  console.log(e)
    speechMsg = e.results[0][0].transcript;
    let confidenceValue = e.results[0][0].confidence;
    if(speechMsg === 'spazio' || speechMsg === 'space'){
       speechMsg = ''
    }
    if(speechMsg === 'a capo' || speechMsg === 'wrap text'){
      speechMsg = '\n'
    }

    // Adding text
    textarea.value += speechMsg + ' ';
  }
}

// END 

recognition.onnomatch = e =>{
  recognition.stop();
  messageInfo('Stop listening');
}

mic.onclick = () => {
  recognition.start();
}

recognition.onstart = () => {
  messageInfo('Start listening')
}

recognition.onsoundend = () => {
  recognition.stop();
  messageInfo('Stop listening');
}

const messageInfo = (stringText) => {
  message.innerHTML = `<span>${stringText}</span>`;
  setTimeout(() =>{
    message.innerHTML = `<span></span>`;

  }, 5000)
}


// SUBMISSION AND SAVING

const addZero = (num) => {
  return (parseInt(num, 10) < 10 ? '0' : null) + num;
}

const setDate = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dd = date.getDate();
  let hh = date.getHours();
  let minutes = date.getMinutes();
  let sec = date.getSeconds();

  let newDate = addZero(dd) + '/' + addZero(month) + '/' + year + ' ' + addZero(hh) + ':' + addZero(minutes) + ':' + addZero(sec);
  return newDate;
}

form.onsubmit = e => {
  e.preventDefault();

  // new entry
  let diaryNewPage = document.createElement('div');
  diaryNewPage.className = 'diary-page';

  let stringVal = '✍' + textarea.value.charAt(0).toUpperCase() + textarea.value.slice(1);
  //creation of string

  let note = {note: `<div>${stringVal}</div> <button class = "del-btn" onclick = 'deleteFunction(${Date.now()})'><img src="./images/del.svg"></button><small>${setDate()}</small>` , id: Date.now()
  };

  diaryNewPage.innerHTML = note.note;
  diaryBody.prepend(diaryNewPage);

  notes.push(note);

  // Saving in Local Storage
  let storageRetrieve = JSON.parse(localStorage.getItem('diaryBody'));

  if(storageRetrieve != null) {
    // push
    storageRetrieve.push(note);
    // saving in
    localStorage.setItem('diaryBody' , JSON.stringify(storageRetrieve));
  }
  else{
    localStorage.setItem('diary' , JSON.stringify(notes));
  }
  // take out storage saved items
  // let storedNotes = JSON.parse(localStorage.getItem('diaryBody));

  form.reset();
}

langUS.onclick = () =>{
  messageInfo(`<span>Language is set to ${en}</span>`);
  recognition.lang = en;
  actual.innerHTML = en;
}

langIndia.onclick = () =>{
  messageInfo(`<span>Language is set to ${hindi}</span>`);
  recognition.lang = hindi;
  actual.innerHTML = hindi;
}

// Loading Data

const dataLoad = () =>{
   let storageRetrieve = JSON.parse(localStorage.getItem('diaryBody'));
   if(storageRetrieve != null){
     storageRetrieve.forEach(note => {
        let diaryNewPage = document.createElement('div');
        diaryNewPage.className = 'diary-page';
      //  Modify
      diaryNewPage.innerHTML = note.note;
      diaryBody.prepend(diaryNewPage);
     });
   }
}

// Rnning dataLoad

dataLoad();

const deleteFunction = (id) => {
  //  let storageRetrieve = JSON.parse(localStorage.getItem('diaryBody'));
  //  let newDataEntry = storageRetrieve.filter(n => n.id !== id);
  //  console.log(newDataEntry)
  //  localStorage.setItem('diaryBody' , JSON.stringify(newDataEntry));
   window.location.reload();
}