/*PLEASE CLICK ON THE CANVAS THEN PRESS "f" TO ENTER FULLSCREEN*/

let startScreen, startButton;
let flowerSprite, flowerTalking, speechBubble, font, wildflowersBackground;
let flowerY, flowerYOffset;
let gamePhase = "startScreen";
let isTalking = false;
let startTime;
let timerExpired = false;

let currentMessageIndex = 0;
let natureScenes = [];
let currentSceneIndex = 0;
let flowerImages = {};
let flowerImage;
let flowerWidth, flowerHeight;
let flowerOriginalWidth = 300;
let flowerOriginalHeight = 400;
let flowerMaxScale = 1.5;
let flowerMinScale = 1;
let currentScale = 1;
let breathingPhase = "inhale";
let phaseTimer = 0;
let natureSounds;

//for fade-in effect
let fadeAlpha = 255;
let isFadingIn = false;

let darkSpeechBubble;
let scaryNatureSounds, evilBackground;
let evilSprites = {};
let losing1_bg;
let losing2_bg;
let loseSound;

let speedTypingBackground;

let restarting = false;
let pressedR = false;

function preload() {
  startScreen = loadImage("backgrounds/start_screen.png");
  startButton = loadImage("assets/start_button.png");
  flowerSprite = loadImage("flower_sprite/1.png");
  flowerTalking = loadImage("flower_sprite/flower_talking.gif");
  speechBubble = loadImage("assets/orange_speech_box.png");
  font = loadFont("assets/PressStart2P-Regular.ttf");
  wildflowersBackground = loadImage("backgrounds/wildflowers_meadow.png");
  natureSounds = loadSound("assets/nature_sounds.mp3");

  natureScenes.push(loadImage("backgrounds/lush_forest.png"));
  natureScenes.push(loadImage("backgrounds/snowy_mountains.png"));
  natureScenes.push(loadImage("backgrounds/tropical_beach.png"));

  flowerImages["inhale"] = loadImage("flower_sprite/2.png");
  flowerImages["hold"] = loadImage("flower_sprite/1.png");
  flowerImages["exhale"] = loadImage("flower_sprite/4-1.png");
  flowerImages["idle"] = loadImage("flower_sprite/1.png");

  evilBackground = loadImage("backgrounds/dark_scary_forest.png");
  scaryNatureSounds = loadSound("assets/thunderous_night.mp3");
  evilSprites["idle"] = loadImage("flower_sprite/4.png");
  evilSprites["talking"] = loadImage("flower_sprite/flower_evil_talking.gif");
  darkSpeechBubble = loadImage("assets/dark_speech_box.png");

  glitchVideo = createVideo("assets/glitch_effect.mp4");
  glitchVideo.hide();

  losing1_bg = loadImage("backgrounds/losing1.png");
  losing2_bg = loadImage("backgrounds/losing2.png");

  speedTypingBackground = loadImage("backgrounds/dark_scary_forest.png");

  loseSound = loadSound("assets/wind_sound.mp3");
}

function setup() {
  createCanvas(1280, 720);
  textFont(font);
  flowerY = height / 12;
  flowerYOffset = 0;
  flowerImage = flowerImages["idle"];
  flowerOriginalWidth = flowerImage.width * 0.3;
  flowerOriginalHeight = flowerImage.height * 0.3;

  natureSounds.loop();
}

function draw() {
  background(0);

  if (gamePhase === "startScreen") {
    displayStartScreen();
  } else if (gamePhase === "conversation") {
    displayConversation();
  } else if (gamePhase === "natureScenes") {
    displayNatureScene();
    handleBreathingAnimation();
  } else if (gamePhase === "glitchEffect") {
    image(glitchVideo, 0, 0, width, height); //display the glitch video
  } else if (gamePhase === "evilConversation") {
    displayEvilConversation();
  } else if (gamePhase === "speedTyping") {
    displaySpeedTyping();
  } else if (gamePhase === "lose") {
    displayLosingConversation();
  } else if (gamePhase === "done") {
    image(losing2_bg, 0, 0, width, height);
  }

  //handle fade-in effect
  if (isFadingIn) {
    // console.log("drawing fade-in effect with alpha:", fadeAlpha);
    fill(0, fadeAlpha); //black rectangle with alpha
    rect(0, 0, width, height);

    fadeAlpha -= 5; //reduce alpha for the "fade-in" effect
    if (fadeAlpha <= 0) {
      fadeAlpha = 0;
      isFadingIn = false; //stop fading
    }
  }
}

function keyPressed() {
  //f key is to enter fullscreen mode
  if (key === "f") {
    fullscreen(true);
  }

  //pressing spacebar in the conversation phase advances the conversation
  if (gamePhase === "conversation" && key === " ") {
    if (isTypewriterFinished()) {
      currentMessageIndex++;
      //once we reach the end of the conversation, we move on to the nature scenes breathing exercise phase
      if (currentMessageIndex >= messages.length) {
        gamePhase = "natureScenes";
        currentMessageIndex = 0;
        breathingPhase = "inhale";
        phaseTimer = 0;
        currentScale = flowerMinScale;
        updateFlowerSize();
      } else {
        initializeTypewriter(messages[currentMessageIndex].text);
        isTalking = true;
      }
    }
  }
  //pressing the spacebar in the breathing exercise phase advances to the next nature scene
  else if (
    gamePhase === "natureScenes" &&
    key === " " &&
    breathingPhase === "idle"
  ) {
    currentSceneIndex++;
    //if we have finished all the nature scenes, we abruptly switch through the glitch
    if (currentSceneIndex >= natureScenes.length) {
      natureSounds.stop();
      gamePhase = "glitchEffect";
      glitchVideo.play(); //play the glitch effect video
      //once the video ends, transition with fade-in into the evil conversation phase
      glitchVideo.onended(() => {
        isFadingIn = true; //start the fade-in effect
        fadeAlpha = 255;
        gamePhase = "evilConversation";
        scaryNatureSounds.loop();
        currentMessageIndex = 0;
        initializeTypewriter(evilMessages[currentMessageIndex].text, 40);
        isTalking = true;
      });
    } else {
      breathingPhase = "inhale";
      phaseTimer = 0;
      currentScale = flowerMinScale;
      updateFlowerSize();
    }
  }
  //pressing spacebar in the evil conversation phase advances the conversation
  else if (gamePhase === "evilConversation" && key === " ") {
    if (isTypewriterFinished()) {
      currentMessageIndex++;
      //once we reach the end of the conversation, we move on to the speed typing phase
      if (currentMessageIndex >= evilMessages.length) {
        gamePhase = "speedTyping";
        startSpeedTypingGame();
      } else {
        initializeTypewriter(evilMessages[currentMessageIndex].text, 40);
        isTalking = true;
      }
    }
  }
  //if we are in the speedtyping phase, we handle the word typing logic
  else if (gamePhase === "speedTyping" && !restarting) {
    //check if the pressed key matches the current letter
    if (key === currentWord[correctLetters]) {
      correctLetters++;
      //if the entire word is typed correctly
      if (correctLetters === currentWord.length) {
        //console.log(`Word "${currentWord}" completed!`);
        wordIndex++; //move on to next word
        //if all the words have been written
        if (wordIndex >= typingWords.length) {
          wordIndex = 0; //restart the list
        }

        //move to the next word and reset the timer
        currentWord = typingWords[wordIndex];
        correctLetters = 0;
        startTime = millis();
      }
    }
  }
  //if the player pressed on "rp" for restarting
  else if (restarting) {
    if (!pressedR && key === "r") {
      pressedR = true; //mark 'r' as pressed
      // console.log("key r is pressed");
    } else if (pressedR && key === "p") {
      // console.log("key p is pressed");
      //both 'r' and 'p' have been pressed
      pressedR = false;
      restarting = false;
      isFadingIn = true; //start the fade-in effect
      fadeAlpha = 255;
      gamePhase = "lose"; //game phase is now lose to start the losing conversation
      currentMessageIndex = 0;
        initializeTypewriter(evilLosingMessages[currentMessageIndex].text, 40);
      isTalking = true;
    }
    }
  //pressing spacebar in the losing conversation phase advances the conversation
  else if (gamePhase === "lose" && key === " ") {
    if (isTypewriterFinished()) {
      currentMessageIndex++;
      //once we reach the end of the conversation, we move on to the last phase
      if (currentMessageIndex >= evilLosingMessages.length) {
        gamePhase = "done";
        isFadingIn = true; //start the fade-in effect
        fadeAlpha = 255;
      } else {
        initializeTypewriter(evilLosingMessages[currentMessageIndex].text, 40);
        isTalking = true;
      }
    }
  }
}
