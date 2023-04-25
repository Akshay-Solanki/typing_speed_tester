let text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laboru numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiu optio, eaque rerum! Provident similique accusantium nemo autem. Veritati obcaecati tenetur iure eius earum ut molestias architecto voluptate aliqua nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusda recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxim doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantiu modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!";

const type = document.getElementById('type')
const typing = document.getElementById('typing');
const typed = document.getElementById('typed');
const speed = document.getElementById('speed');


type.textContent = text


/* timer logic */
let timerStarted = false;
let TIME_LIMIT = 60;
const timer = document.getElementById('timer')
function startTimer(){
  timerStarted = true;
  let inter = setInterval(function(){
    timer.textContent = parseInt(timer.textContent) + 1;
    if(parseInt(timer.textContent) === 60){
      clearInterval(inter)
      timer.textContent = 0
      timerStarted = false;
    }
  },1000)
}
/* timer logic */

let correctWord = 0;
let currentWord = [];
let runningWord = ''
;typing.addEventListener('keyup', function(e){
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
    if(currentWord.join('').trim() === runningWord){
      correctWord++;
      speed.textContent = correctWord
      spanclass = ''
    }
    typed.innerHTML +=  '<span class="'+spanclass+'">'+ currentWord.join('')+' </span>'
    if(type.textContent[0] === e.key){
      removeFirstChar(e)
    }else {
      removeWord()
    }
    runningWord = type.textContent.trim().split(' ')[0].trim();
    currentWord = []
  }


})

function removeWord(){  
  type.textContent = type.textContent.substr(type.textContent.indexOf(" ") + 1).trim();
}

function removeFirstChar(e){
  //if(e.key !== ' ') currentWord.push(e.key)
  
  if(runningWord.startsWith(currentWord.join(''))){
    type.textContent = type.textContent.slice(1)
  }
}

function addFirstChar(){
  if(runningWord.startsWith(currentWord.join(''))){
    type.textContent = currentWord.pop() + '' + type.textContent
  }else{
    currentWord.pop()
  }
}