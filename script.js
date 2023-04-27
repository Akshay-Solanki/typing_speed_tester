
const type = document.getElementById('type')
const typing = document.getElementById('typing');
const typed = document.getElementById('typed');
const speed = document.getElementById('speed');
const accuracy = document.getElementById('accuracy');
const timer = document.getElementById('timer')


let correctWord = 0;
let currentWord = [];
let runningWord = '';
let totalWord = 0;
let timerStarted = false;

initiateTest()

function initiateTest(){
  timer.textContent = 0
  speed.textContent = 0
  accuracy.textContent = 0
  typed.textContent = ''
  timerStarted = false;
  correctWord = 0;
  currentWord = [];
  runningWord = '';
  totalWord = 0;
  getRandomSentence()
}

/* timer logic */
let TIME_LIMIT = 60;
function startTimer(){
  timerStarted = true;
  let inter = setInterval(function(){
    timer.textContent = parseInt(timer.textContent) + 1;
    if(parseInt(timer.textContent) === 60){
      typing.blur();
      clearInterval(inter)

      alert('Speed: '+speed.textContent+'wpm \n Accuracy: '+accuracy.textContent+'%')
      initiateTest()
    }
  },1000)
}
/* timer logic */


typing.addEventListener('keyup', function(e){
  if(e.key === 'Backspace' && currentWord.length > 0){
    addFirstChar()
  }
})
typing.addEventListener('keypress', function(e){
  if(!timerStarted) startTimer();

  if(runningWord == ''){
    runningWord = type.textContent.split(' ')[0]
  }

  if(e.key.length === 1 && e.key !== ' '){
    currentWord.push(e.key)
    removeFirstChar(e)    
  }else if(e.key === ' '){
    
    typing.textContent = ''
    let spanclass = 'strike';
    totalWord++;
    if(currentWord.join('').trim() === runningWord){
      correctWord++;
      speed.textContent = correctWord
      spanclass = ''
    }
    typed.innerHTML +=  '<span class="'+spanclass+'">'+ currentWord.join('')+' </span>'

    // calculate accuracy
    accuracy.innerHTML = Math.ceil(correctWord * 100 / totalWord);

    if(type.textContent[0] === e.key){
      removeFirstChar(e)
    }else {
      removeWord()
    }
    runningWord = type.textContent.trim().split(' ')[0].trim();
    currentWord = []
  }


})

// remove word 
function removeWord(){  
  type.textContent = type.textContent.substr(type.textContent.indexOf(" ") + 1).trim();
}

// remove first character in primary text
function removeFirstChar(){
  if(runningWord.startsWith(currentWord.join(''))){
    type.textContent = type.textContent.slice(1)
  }
}
// add first character in primary text
function addFirstChar(){
  if(runningWord.startsWith(currentWord.join(''))){
    type.textContent = currentWord.pop() + '' + type.textContent
  }else{
    currentWord.pop()
  }
}
// get random sentences
function getRandomSentence(){
  const shuffled = sentences.sort(() => 0.5 - Math.random());

  let selected = shuffled.slice(0, 5);
  
  type.textContent = selected.map(i => i.sentence).join(' ')
}