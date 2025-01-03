let typingWords = ['college', 'pivotal', 'period', 'student', 'marked', 'rigorous', 'academic', 'challenges', 'personal', 'growth', 'transition', 'adulthood', 'While', 'these', 'experiences', 'enriching', 'introduce', 'significant', 'stress', 'often', 'compounded', 'tight', 'deadlines', 'social', 'pressures', 'pursuit', 'career', 'aspirations', 'whirlwind', 'ability', 'relax', 'luxury', 'necessity', 'Relaxation', 'vital', 'college', 'students', 'enhances', 'mental', 'health', 'fosters', 'academic', 'performance', 'cultivates', 'well-rounded', 'lifestyle', 'Stress', 'anxiety', 'prevalent', 'among', 'college', 'students', 'facing', 'mental', 'health', 'challenges', 'impact', 'their', 'quality', 'report', 'American', 'College', 'Health', 'Association', 'revealed', 'students', 'experienced', 'overwhelming', 'anxiety', 'during', 'academic', 'Relaxation', 'serves', 'counterbalance', 'these', 'pressures', 'reducing', 'cortisol', 'levels', 'hormone', 'responsible', 'stress', 'promoting', 'sense', 'Practices', 'meditation', 'taking', 'short', 'walks', 'students', 'decompress', 'enabling', 'approach', 'challenges', 'clearer', 'positive', 'mindset', 'Without', 'regular', 'opportunities', 'unwind', 'stress', 'accumulate', 'leading', 'burnout', 'depression', 'other', 'serious', 'mental', 'health', 'issues', 'Paradoxically', 'stepping', 'academic', 'tasks', 'enhance', 'student', 'ability', 'excel', 'Relaxation', 'improves', 'focus', 'memory', 'retention', 'creativity', 'which', 'essential', 'learning', 'Studies', 'brain', 'processes', 'consolidates', 'information', 'effectively', 'during', 'periods', 'which', 'breaks', 'during', 'study', 'sessions', 'crucial', 'Engaging', 'relaxing', 'activities', 'listening', 'music', 'pursuing', 'hobbies', 'refresh', 'allowing', 'students', 'return', 'their', 'renewed', 'energy', 'sharper', 'focus', 'Neglecting', 'relaxation', 'other', 'often', 'results', 'diminishing', 'returns', 'where', 'extended', 'study', 'hours', 'fatigue', 'decreased', 'productivity', 'Relaxation', 'essential', 'fostering', 'balanced', 'fulfilling', 'College', 'about', 'academics', 'about', 'forming', 'meaningful', 'relationships', 'exploring', 'interests', 'discovering', 'identity', 'Taking', 'relax', 'enables', 'students', 'connect', 'others', 'engage', 'extracurricular', 'activities', 'pursue', 'passions', 'outside', 'their', 'academic', 'responsibilities', 'These', 'experiences', 'crucial', 'personal', 'growth', 'significantly', 'enhance', 'college', 'journey', 'Moreover', 'cultivating', 'relaxation', 'habits', 'college', 'foundation', 'healthier', 'work-life', 'balance', 'adulthood', 'skill', 'becomes', 'increasingly', 'valuable', 'professional', 'environments', 'Chronic', 'stress', 'affects', 'mind', 'and', 'body', 'Prolonged', 'periods', 'stress', 'weaken', 'immune', 'system', 'increase', 'cardiovascular', 'issues', 'disrupt', 'sleep', 'patterns', 'Relaxation', 'techniques', 'breathing', 'progressive', 'muscle', 'relaxation', 'mitigate', 'these', 'risks', 'promoting', 'physical', 'recovery', 'Adequate', 'leisure', 'contribute', 'better', 'sleep', 'quality', 'improved', 'physical', 'health', 'greater', 'overall', 'resilience', 'healthy', 'supports', 'healthy', 'creating', 'positive', 'feedback', 'benefits', 'students', 'classroom', 'college', 'experience', 'while', 'enriching', 'overwhelming', 'without', 'intentional', 'efforts', 'relax', 'Prioritizing', 'relaxation', 'supports', 'mental', 'physical', 'health', 'enhances', 'academic', 'performance', 'personal', 'fulfillment', 'creating', 'space', 'leisure', 'students', 'equip', 'themselves', 'handle', 'challenges', 'greater', 'build', 'habits', 'serve', 'throughout', 'their', 'lives', 'world', 'often', 'glorifies', 'constant', 'productivity', 'ability', 'relax', 'powerful', 'cornerstone', 'success'];
let currentWord = typingWords[0];
let correctLetters = 0;
let wordIndex = 0;
let timerDuration = 3000; //3 seconds in milliseconds per word
let playedLoseSound = false;
let firstRound = true;

function startSpeedTypingGame() {
  wordIndex = 0; //reset word index
  correctLetters = 0; //reset correct letters
  currentWord = typingWords[wordIndex]; //set the first word
  startTime = millis(); //start the timer
}

function displaySpeedTyping() {
  //draw the typing game background
  image(speedTypingBackground, 0, 0, width, height);

  if (currentWord==="college"){
    timerDuration = 5000; //allow five seconds for the first word
  } else {
    timerDuration = 3000;
  }
  //timer logic for each word
  let elapsedTime = millis() - startTime;
  let remainingTime = max(0, timerDuration - elapsedTime);
  let timeInSeconds = (remainingTime / 1000).toFixed(2);

  //display the timer
  fill(255);
  textSize(32);
  textAlign(RIGHT, TOP);
  text(`Time: ${timeInSeconds}s`, width - 20, 20);

  //display the current word with correct letters highlighted
  let x = width / 2 - textWidth(currentWord) / 1.3;
  let y = height / 2;
  textAlign(LEFT, CENTER);
  for (let i = 0; i < currentWord.length; i++) {
    if (i < correctLetters) {
      fill(255); //highlight correct letters in white
    } else {
      fill(255, 0, 0); //default red color for untyped letters
    }
    textSize(45);
    text(currentWord[i], x + i * textWidth('W'), y); //consistently spacing out the letters of the word
  }
   //if the timer reaches 0, the player loses
  if (remainingTime <= 0) {
    timerExpired = true;
    image(losing1_bg, 0, 0,  width, height)
    scaryNatureSounds.stop();
    restarting = true; //waiting for player to press "rp"
    //start playing the wind sound (only once)
    if (!playedLoseSound){
        loseSound.loop()
        playedLoseSound = true;
    }
  }
}
