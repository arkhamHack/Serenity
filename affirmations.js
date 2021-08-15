let mentalHealthAffirmations = [
  " I am safe." , "To be positive is to be productive." , "I am grateful for another day to experience life." , "I am a warrior, not a worrier." , "Deep breathes ease the anxiety in my soul." ,  "I train my mind to see the good." , "Today is the day I will take one step forward." , "I have been given endless talents which I begin to utilize today." , "I feel grounded and centred." , "I have the strength to survive this." , "I am kind to myself." , "I am blessed with an incredible family and wonderful friends." , "What I feel is not who I am." , "My thoughts can change and so can I." , "Small things that make me happy are just as important as the bigger things." , "I am resilient." , "I respond to my emotions with love and kindness." , "Every day is a new day." , "I believe that I deserve happiness every day of my life." , "My life is a gift." , "I am here for a reason and there is a place for me here." , "I fill my mind with positive thoughts." , "Happiness is an emotion that I experience daily." ,  "It is okay for me to not feel okay." , "I am in control." , "I live in the present." , "I trust in myself." , "Right now, I am peaceful." , "I face anxiety with courage and strength." ,  "My anxiety does not control me." , "I have the final say in all of my emotions." , "Anxiety is not who I am." , "I am a calm and positive person." , "I release all of my worries." , "I have confidence in myself and my future." , "I feel calm and capable of handling anything that comes my way." , "I am strong, confident, and courageous." , "Every day, I become calmer, more positive, and more confident." , "There is more to me than anxiety." , "I am in control of my emotions." , "My anxiety will not control my life." , "I am calm and present." , "I Choose to Forgive and Let Go of Anger." , "I will always find a way and a way will always find me." , "Every day I am becoming a better version of myself" , "I lovingly do everything I can to assist my body in maintaining health." , "I create space in my head for dreams, not fears." , "I am in sync with life when I trust the process." , "My life is just beginning." , "Life is nothing but a series of endless opportunities" , "My potential to succeed is limitless." , "I release myself from the need to impress others." , "I attract calming situations and people into my life." , "I embrace stress, it steers me away from what drains me." , ""
]

  var affirmations= document.getElementById("affirmation");
  var affirmBtn = document.getElementById("affirm-btn");
  var count=0;

  if (affirmBtn){
    affirmBtn.addEventListener("click", displayAffirmations);
  }

  function displayAffirmations(){
   affirmations.innerHTML = mentalHealthAffirmations[count];
   count++;
   if (count == mentalHealthAffirmations.length){
     count=0;
   }
  }

let audioBox = { audio: true };
 navigator.mediaDevices.getUserMedia(audioBox)

.then(function (mediaStreamObj) {
  let audio = document.querySelector('audio');
  if ("srcObject" in audio) {
  audio.srcObject = mediaStreamObj;
}
else {   // Old version
    audio.src = window.URL
    .createObjectURL(mediaStreamObj);
}

 audio.onloadedmetadata = function (ev) {
    audio.play();
 };

//  recording begin
 let start = document.getElementById('start');
 let end = document.getElementById('stop');
 let play = document.getElementById('audioPlay');

 let mediaRecorder = new MediaRecorder(mediaStreamObj);
 start.addEventListener('click', function (ev) {
     mediaRecorder.start();
  })   

 end.addEventListener('click', function (ev) {
          mediaRecorder.stop();
          // console.log(mediaRecorder.state);
 });

mediaRecorder.ondataavailable = function (ev) {
          dataArray.push(ev.data);
 }
 let dataArray = [];
 mediaRecorder.onstop = function (ev) {

  let audioData = new Blob(dataArray, 
            { 'type': 'audio/mp3;' });
    
  dataArray = [];

  let audioSrc = window.URL
      .createObjectURL(audioData);
  play.src = audioSrc;
}
})

.catch(function (err) {
console.log(err.name, err.message);
});