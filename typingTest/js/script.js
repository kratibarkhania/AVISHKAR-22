const typingText = document.querySelector(".typing-text p");
inpField = document.querySelector(".wrapper .input-field");
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span");
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");
tryAgainBtn = document.querySelector("button");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;


function randomParagraph(){
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click",() => inpField.focus());
}

function initTyping(){
    
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null){
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct","incorrect");
        }else{
            if(characters[charIndex].innerText === typedChar){
                characters[charIndex].classList.add("correct");
            }else{
                characters[charIndex].classList.add("incorrect");
                mistakes++;
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        var wpm = Math.round((((charIndex-mistakes)/5)/(maxTime - timeLeft))*60)
        wpm = wpm < 0 || !wpm || wpm ===Infinity ?0:wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
        m=wpm;
        
    }else{
        inpField.value = "";
        clearInterval(timer);
    }    
}

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    }else{
       
        clearInterval(timer);
        
    }
}

function resetGame(){
   // i++;
   randomParagraph();
    if(localStorage.getItem('tata')==null){
        localStorage.setItem('tata','[]');
        localStorage.setItem('data','[]');
        
    }
    var old_data = JSON.parse(localStorage.getItem('tata'));
    old_data.push(m);
    localStorage.setItem('tata',JSON.stringify(old_data));
    //console.log(old_data);
    i=JSON.parse(localStorage.getItem('tata')).length;
    var new_data = JSON.parse(localStorage.getItem('data'));

    new_data.push(i);
    localStorage.setItem('data',JSON.stringify(new_data));
    graph();
    
    
    
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    
}

    
/*function csvToSeries(old_data) {
	//const lifeExp = 'average_life_expectancy';
	let dataAsJson = JSC.csv2Json(old_data);
	let even = [];
	dataAsJson.forEach(function (row) {
		 //add either to male, female, or discard.
		console.log(row);
	});
}*/
function graph(){
    //let arr =tata;
    let points =  JSON.parse(localStorage.getItem('tata'));
    let mata =  JSON.parse(localStorage.getItem('data'));
    new Chart("myChart", {
        type: "line",
        data: {
          labels: mata,
          datasets: [{
            lineTension: 0,
            data: points
          }]
        },
        
      });

}

randomParagraph();

inpField.addEventListener("input",initTyping);

tryAgainBtn.addEventListener("click", resetGame);

