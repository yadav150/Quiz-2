const applicantForm = document.getElementById('applicant-form');
const applicantPage = document.getElementById('applicant-page');
const guidelinesPage = document.getElementById('guidelines-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');
const finalScoreText = document.getElementById('final-score');
const downloadBtn = document.getElementById('download-certificate');

const questionText = document.getElementById('question-text');
const options = document.querySelectorAll('.option-btn');
const submitBtn = document.getElementById('submit-btn');
const skipBtn = document.getElementById('skip-btn');
const timerText = document.getElementById('timer');
const questionNumberText = document.getElementById('question-number');

let timer;
let timeLeft = 60;
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let skippedQuestions = [];
let applicantData = {};

// ----------------- 60 Questions -----------------
const questions = [
  // First 30 questions
  { q: "What is the capital city of France?", options: ["Paris","Berlin","Madrid","Rome"], answer: 0 },
  { q: "In which country is the Great Wall located?", options: ["China","India","Egypt","Italy"], answer: 0 },
  { q: "The Taj Mahal is located in which city in India?", options: ["Agra","Delhi","Mumbai","Jaipur"], answer: 0 },
  { q: "What is the capital city of Japan?", options: ["Tokyo","Seoul","Beijing","Bangkok"], answer: 0 },
  { q: "In which country can you find the ancient site of Machu Picchu?", options: ["Peru","Chile","Brazil","Mexico"], answer: 0 },
  { q: "What is the capital city of Australia?", options: ["Canberra","Sydney","Melbourne","Brisbane"], answer: 0 },
  { q: "The famous statue Christ the Redeemer is located in which country?", options: ["Brazil","Portugal","Spain","Italy"], answer: 0 },
  { q: "What is the capital city of Canada?", options: ["Ottawa","Toronto","Vancouver","Montreal"], answer: 0 },
  { q: "The Pyramids of Giza are located in which country?", options: ["Egypt","Sudan","Morocco","Libya"], answer: 0 },
  { q: "What is the capital city of India?", options: ["New Delhi","Mumbai","Kolkata","Chennai"], answer: 0 },
  { q: "The archaeological site of Petra is located in which country?", options: ["Jordan","Egypt","Saudi Arabia","Lebanon"], answer: 0 },
  { q: "What is the capital city of Germany?", options: ["Berlin","Munich","Frankfurt","Hamburg"], answer: 0 },
  { q: "Which river flows through London?", options: ["Thames","Seine","Danube","Rhine"], answer: 0 },
  { q: "In which country is the Colosseum located?", options: ["Italy","Greece","Spain","France"], answer: 0 },
  { q: "Which is the largest desert in the world?", options: ["Sahara","Gobi","Kalahari","Mojave"], answer: 0 },
  { q: "What is the capital of Norway?", options: ["Oslo","Stockholm","Helsinki","Copenhagen"], answer: 0 },
  { q: "Which city is known as the City of Canals?", options: ["Venice","Amsterdam","Bangkok","Bruges"], answer: 0 },
  { q: "Mount Kilimanjaro is located in which country?", options: ["Tanzania","Kenya","Uganda","Ethiopia"], answer: 0 },
  { q: "What is the capital of Saudi Arabia?", options: ["Riyadh","Jeddah","Mecca","Medina"], answer: 0 },
  { q: "Which ocean is the largest in the world?", options: ["Pacific","Atlantic","Indian","Arctic"], answer: 0 },
  { q: "In which country is the city of Petra?", options: ["Jordan","Egypt","Israel","Lebanon"], answer: 0 },
  { q: "The Kremlin is located in which city?", options: ["Moscow","Saint Petersburg","Kazan","Novosibirsk"], answer: 0 },
  { q: "Which country has the largest population?", options: ["China","India","USA","Russia"], answer: 0 },
  { q: "What is the capital of Indonesia?", options: ["Jakarta","Bali","Bandung","Surabaya"], answer: 0 },
  { q: "The statue of Liberty is located in which country?", options: ["USA","Canada","France","UK"], answer: 0 },
  { q: "Which city is known as the Big Apple?", options: ["New York","Chicago","Los Angeles","San Francisco"], answer: 0 },
  { q: "What is the capital city of Pakistan?", options: ["Islamabad","Karachi","Lahore","Peshawar"], answer: 0 },
  { q: "The Louvre Museum is located in which city?", options: ["Paris","London","Rome","Berlin"], answer: 0 },
  { q: "Which river flows through Egypt?", options: ["Nile","Amazon","Yangtze","Danube"], answer: 0 },
  { q: "What is the capital of Finland?", options: ["Helsinki","Stockholm","Oslo","Copenhagen"], answer: 0 },

  // Questions 31–60
  { q: "Which city is famous for its canals and gondolas in Italy?", options: ["Venice","Rome","Milan","Florence"], answer: 0 },
  { q: "Mount Everest, the highest mountain in the world, is located in which country?", options: ["Nepal","India","China","Bhutan"], answer: 0 },
  { q: "What is the capital city of China?", options: ["Beijing","Shanghai","Hong Kong","Shenzhen"], answer: 0 },
  { q: "The Great Barrier Reef is located off the coast of which country?", options: ["Australia","USA","Philippines","Indonesia"], answer: 0 },
  { q: "Which river is the longest in South America?", options: ["Amazon","Parana","Orinoco","Magdalena"], answer: 0 },
  { q: "The ancient city of Athens is located in which country?", options: ["Greece","Italy","Turkey","Egypt"], answer: 0 },
  { q: "What is the capital city of Spain?", options: ["Madrid","Barcelona","Seville","Valencia"], answer: 0 },
  { q: "Which waterfall is considered the largest in the world by volume?", options: ["Inga Falls","Niagara Falls","Victoria Falls","Iguazu Falls"], answer: 0 },
  { q: "What is the capital city of South Africa?", options: ["Pretoria","Cape Town","Johannesburg","Durban"], answer: 0 },
  { q: "Which country is home to the city of Reykjavik?", options: ["Iceland","Norway","Sweden","Finland"], answer: 0 },
  { q: "What is the capital city of New Zealand?", options: ["Wellington","Auckland","Christchurch","Hamilton"], answer: 0 },
  { q: "Which city is known as the City of Light?", options: ["Paris","Rome","London","Berlin"], answer: 0 },
  { q: "The Sahara Desert is primarily located on which continent?", options: ["Africa","Asia","Australia","South America"], answer: 0 },
  { q: "What is the capital city of Argentina?", options: ["Buenos Aires","Cordoba","Rosario","Mendoza"], answer: 0 },
  { q: "Which river flows through Baghdad?", options: ["Tigris","Euphrates","Nile","Jordan"], answer: 0 },
  { q: "The historical site of Timbuktu is located in which country?", options: ["Mali","Nigeria","Senegal","Ghana"], answer: 0 },
  { q: "What is the capital city of Norway?", options: ["Oslo","Stockholm","Helsinki","Copenhagen"], answer: 0 },
  { q: "Which mountain range is located in northern India and Nepal?", options: ["Himalayas","Andes","Rockies","Alps"], answer: 0 },
  { q: "What is the capital city of Turkey?", options: ["Ankara","Istanbul","Izmir","Antalya"], answer: 0 },
  { q: "The Panama Canal connects which two oceans?", options: ["Atlantic and Pacific","Pacific and Indian","Atlantic and Indian","Arctic and Atlantic"], answer: 0 },
  { q: "Which city is famous for the historical site of the Acropolis?", options: ["Athens","Rome","Istanbul","Cairo"], answer: 0 },
  { q: "What is the capital city of Portugal?", options: ["Lisbon","Porto","Madrid","Barcelona"], answer: 0 },
  { q: "Which country is known as the Land of the Rising Sun?", options: ["Japan","China","Thailand","South Korea"], answer: 0 },
  { q: "The Victoria Falls is located on the border of which two countries?", options: ["Zambia & Zimbabwe","South Africa & Botswana","Namibia & Angola","Tanzania & Kenya"], answer: 0 },
  { q: "What is the capital city of Pakistan?", options: ["Islamabad","Karachi","Lahore","Peshawar"], answer: 0 },
  { q: "Which city is known as the Big Apple?", options: ["New York","Chicago","Los Angeles","San Francisco"], answer: 0 },
  { q: "The Louvre Museum is located in which city?", options: ["Paris","London","Rome","Berlin"], answer: 0 },
  { q: "Mount Kilimanjaro is located in which country?", options: ["Tanzania","Kenya","Uganda","Ethiopia"], answer: 0 },
  { q: "The Burj Khalifa is located in which city?", options: ["Dubai","Abu Dhabi","Riyadh","Doha"], answer: 0 }
];

// ----------------- Registration -> Guidelines -----------------
applicantForm.addEventListener('submit', function(e){
  e.preventDefault();
  applicantData = {
    name: document.getElementById('name').value,
    fname: document.getElementById('fname').value,
    mname: document.getElementById('mname').value,
    class: document.getElementById('class').value,
    college: document.getElementById('college').value
  };
  applicantPage.classList.add('hidden');
  guidelinesPage.classList.remove('hidden');
});

// ----------------- Start Quiz Button -----------------
document.getElementById('Q').addEventListener('click', () => {
  guidelinesPage.classList.add('hidden');
  quizPage.classList.remove('hidden');
  loadQuestion();
  startTimer();
});

// ----------------- Load Question with fade effect -----------------
function loadQuestion() {
  questionText.style.opacity = 0;
  setTimeout(() => {
    let q = questions[currentQuestion];
    questionText.textContent = q.q;
    options.forEach((btn, i) => {
      btn.textContent = q.options[i];
      btn.dataset.index = i; // make sure dataset is set
    });
    questionNumberText.textContent = `Question ${currentQuestion+1}/${questions.length}`;
    questionText.style.opacity = 1;
  }, 300);
}

// ----------------- Timer -----------------
function startTimer() {
  clearInterval(timer);
  timeLeft = 60;
  timerText.textContent = `01:00`;
  timerText.style.color = 'black'; // default color
  timer = setInterval(() => {
    timeLeft--;
    let min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    let sec = String(timeLeft % 60).padStart(2, '0');
    timerText.textContent = `${min}:${sec}`;

    // Change color if time < 20 seconds
    if(timeLeft < 20){
      timerText.style.color = 'red'; // danger color
    } else {
      timerText.style.color = 'black'; // normal color
    }

    if(timeLeft <= 0) skipQuestion();
  }, 1000);
}

// ----------------- Track selected option -----------------
options.forEach(btn => {
  btn.addEventListener('click', ()=> {
    userAnswers[currentQuestion] = parseInt(btn.dataset.index);
  });
});

// ----------------- Submit & Next -----------------
submitBtn.addEventListener('click', () => {
  checkAnswer();
  nextQuestion();
});

// ----------------- Skip -----------------
skipBtn.addEventListener('click', skipQuestion);

// ----------------- Check Answer -----------------
function checkAnswer() {
  if(userAnswers[currentQuestion] === questions[currentQuestion].answer) score++;
}

// ----------------- Next Question -----------------
function nextQuestion() {
  currentQuestion++;
  if(currentQuestion >= questions.length){
    finishQuiz();
  } else {
    loadQuestion();
    startTimer();
  }
}

// ----------------- Skip Question -----------------
function skipQuestion() {
  skippedQuestions.push(currentQuestion);
  userAnswers[currentQuestion] = null;
  nextQuestion();
}

// ----------------- Finish Quiz -----------------
function finishQuiz() {
  quizPage.classList.add('hidden');
  resultPage.classList.remove('hidden');
  finalScoreText.textContent = `Your Score: ${score}/${questions.length}`;
}

// ----------------- PDF Certificate -----------------
downloadBtn.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.setTextColor(0,102,204);
  doc.text("Certificate of Participation", 105, 40, {align: "center"});
  
  doc.setFontSize(16);
  doc.setTextColor(0,0,0);
  doc.text(`This certifies that ${applicantData.name}`, 105, 70, {align: "center"});
  doc.text(`Father's Name: ${applicantData.fname}`, 105, 80, {align: "center"});
  doc.text(`Mother's Name: ${applicantData.mname}`, 105, 90, {align: "center"});
  doc.text(`Class: ${applicantData.class}`, 105, 100, {align: "center"});
  doc.text(`College/University: ${applicantData.college}`, 105, 110, {align: "center"});
  doc.text(`has participated in the World Quiz.`, 105, 130, {align: "center"});
  doc.text(`Score: ${score}/${questions.length}`, 105, 150, {align: "center"});

  doc.setDrawColor(0,102,204);
  doc.setLineWidth(1);
  doc.line(60, 160, 150, 160); // signature line
  doc.text("Authorized Signature", 105, 168, {align:"center"});

  doc.save(`${applicantData.name}_certificate.pdf`);
});