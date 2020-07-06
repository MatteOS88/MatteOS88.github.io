const translateWord = ['embed', 'plumber', 'velocity', 'disgrace', 'barely', 'capable', 'awe', 'withdraw', 'former', 'insult', 'stubborn', 'semicolon'];
const polishWord = ['osadzać', 'hydraulik', 'prędkość', 'hańba', 'ledwo', 'zdolny', 'groza', 'wycofać', 'były', 'zniewaga', 'uparty', 'średnik'];

const sectionFirst = document.querySelector('section.first')
const sectionCounter = document.querySelector('section.counter')
const btnRandom = document.querySelector('.randomButton');
const inputWord = document.querySelector('input.inputWord');
const inputTryToTranslate = document.querySelector('input.tryToTranslate');
const divResult = document.querySelector('div.result');
const btnTry = document.querySelector('.try');

const inputPolish = document.querySelector("input.inputPolish");
const inputEnglish = document.querySelector("input.inputEnglish");
const addWord = document.querySelector("button.addWord");
const resetAll = document.querySelector("button.resetAll");

const pocket = document.querySelector('i.fa-plus-square');
const question = document.querySelector('i.fa-question-circle');
const aside = document.querySelector('aside');

let index = 0; // odpowiedni index słowa angielskiego = słowo polskie

let countNumber = 0;
let positiveAnswer = 0;
let percent = 0;
let time = 0;
let intervalId;

let active = true;


const spanCountNumber = document.querySelector('span.countNumber');
spanCountNumber.textContent = countNumber;

const spanPositiveAnswer = document.querySelector('span.positiveAnswer');
spanPositiveAnswer.textContent = positiveAnswer;

const spanPercent = document.querySelector('span.percent');
spanPercent.textContent = percent;

const spanDuration = document.querySelector('span.duration');
spanDuration.textContent = time;

const timer = () => {
    time++;
    spanDuration.style.color = "black";
    spanDuration.textContent = (time / 100).toFixed(2) + " s";

    if (time > 3000) { // po 30 sekundach zmiana liczb na informację
        clearInterval(intervalId);
        time = 0;
        spanDuration.textContent = "It's to long!";
        spanDuration.style.color = "red";
    }
}


const random = () => {
    if (active == true) {
        event.preventDefault();
        index = Math.floor(Math.random() * polishWord.length);
        inputWord.value = polishWord[index];
        divResult.textContent = '';
        inputTryToTranslate.value = '';
        time = 0;
        intervalId = setInterval(timer, 10);
        active = false;
    }
}

btnRandom.addEventListener('click', random);


function translate() {
    if (active == false) {

        countNumber++;
        spanCountNumber.textContent = countNumber;
        active = true;
        clearInterval(intervalId);

        if (inputTryToTranslate.value === translateWord[index]) {
            divResult.textContent = 'Well done!';
            divResult.style.color = 'green';
            positiveAnswer++;
            spanPositiveAnswer.textContent = positiveAnswer;
            percent = (positiveAnswer / countNumber) * 100;
            spanPercent.textContent = Math.floor(percent) + " %";
        } else {
            divResult.textContent = 'Wrong!';
            divResult.style.color = 'red';
            divResult.style.fontSize = '30px';
            percent = (positiveAnswer / countNumber) * 100;
            spanPercent.textContent = Math.floor(percent) + " %";
            inputTryToTranslate.value = translateWord[index];

        }
        if (percent > 80) {
            spanPercent.style.color = "green";
        } else if (percent > 50) {
            spanPercent.style.color = "yellow";
        } else if (percent > 30) {
            spanPercent.style.color = "orange";
        } else {
            spanPercent.style.color = "red";
        }
    }
}

btnTry.addEventListener('click', translate);


/* Panel wysuwany*/

addWord.addEventListener('click', function () {
    event.preventDefault();
    if (inputPolish.value && inputEnglish.value) {
        polishWord.push(inputPolish.value);
        translateWord.push(inputEnglish.value);
        inputPolish.value = '';
        inputEnglish.value = '';
    }

})

resetAll.addEventListener('click', function () {
    if (confirm("Uwaga wykasujesz wszystkie zapisane słowa!")) {
        polishWord.length = 0;
        translateWord.length = 0;
    }
})

/*Ikony plusa i znak zapytania*/

pocket.addEventListener('click', function () {
    aside.classList.toggle('active');
    pocket.classList.toggle('activeIcon');
    sectionFirst.classList.toggle('blur');
    sectionCounter.classList.toggle('blur');
})

question.addEventListener('click', function () {
    alert("You can choose: " + translateWord);

})