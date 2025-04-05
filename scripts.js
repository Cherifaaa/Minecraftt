const startBtn = document.querySelector('.start-btn');
const main = document.querySelector('.main');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const recommencerBtn = document.querySelector('.recommencer-btn');
const RetourMenu = document.querySelector('.Menu-btn');

startBtn.onclick = () => {
    quizSection.classList.add('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

recommencerBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNb = 1;
    ScoreJ = 0;
    showQuestions(questionCount);
    questionCounter(questionNb);

    headerScore();
}

RetourMenu.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNb = 1;
    ScoreJ = 0;
    showQuestions(questionCount);
    questionCounter(questionNb);
}

let questionCount = 0;
let questionNb = 1;
let ScoreJ = 0;

const nextBtn = document.querySelector('.next-btn');

 nextBtn.onclick = () => {
    if(questionCount < questions.length - 1 ) {
        questionCount++;
        showQuestions(questionCount);

        questionNb++;
        questionCounter(questionNb);

        nextBtn.classList.remove('active');
    }
    else {
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list');

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].nb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)')
    }
}

function optionSelected(reponse) {
    let repDonnee = reponse.textContent;
    let repCorrecte = questions[questionCount].reponse; 
    let toutesOptions = optionList.children.length;
    if (repDonnee == repCorrecte) {
        reponse.classList.add('correcte');
        ScoreJ += 1 ;
        headerScore();
    }
    else {
        reponse.classList.add('incorrecte');

        for (let i = 0; i < toutesOptions; i++) {
            if (optionList.children[i].textContent == repCorrecte) {
                optionList.children[i].setAttribute('class', 'option correcte');
            }
        }
    }

    for (let i = 0; i < toutesOptions; i++) {
        optionList.children[i].classList.add('désactivé');
    }
    
    nextBtn.classList.add('active');

}
 
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} sur ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreT = document.querySelector('.header-score');
    headerScoreT.textContent = `Score : ${ScoreJ} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Ton Score : ${ScoreJ} sur ${questions.length}`;

    const progression = document.querySelector('.progression');
    const valeur = document.querySelector('.valeur');
    let valeurStart = -1;
    let valeurEnd = (ScoreJ / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        valeurStart++;

        valeur.textContent = `${valeurStart}%`;
        progression.style.background = `conic-gradient(#00c43e ${valeurStart * 3.6}deg, rgba(255,255,255,.1) 0deg)`;

        if (valeurStart == valeurEnd) {
            clearInterval(progress);
        }
    },speed);
}









