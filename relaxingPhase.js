let messages = [
  { text: "Welcome! I'm so glad you're here.\nYou can press the spacebar to continue our little chat!", size: 22 },
  { text: "You must be tired. College life can be overwhelming, can't it?", size: 22 },
  { text: "But don't worry. This is a safe space for you to unwind, breathe, and find calmness.", size: 20 },
  { text: "Here's what we're going to do: we'll go through beautiful, peaceful nature scenes.", size: 20 },
  { text: "For each scene, we'll breathe together. Inhale for 3 seconds… hold it for 3 seconds… and exhale for 3 seconds.", size: 22 },
  { text: "When you're ready, press the spacebar to move to the next scene and repeat the breathing exercise.", size: 20 },
  { text: "Take it slow. Breathe in the calmness of each scene. There's no rush.", size: 22 },
  { text: "Let's begin. Ready?", size: 24 },
];


function handleBreathingAnimation() {
  phaseTimer++;
  fill(0);
  //handling the enlarging and shrinking of the flower phase during the relaxing breathing exercise
  if (breathingPhase === "inhale") {
    flowerImage = flowerImages["inhale"];
    currentScale = lerp(currentScale, flowerMaxScale, 0.02);
    updateFlowerSize();

    displayText("Inhale...");
    if (phaseTimer > 180) {
      breathingPhase = "hold";
      phaseTimer = 0;
    }
  } else if (breathingPhase === "hold") {
    flowerImage = flowerImages["hold"];
    displayText("Hold your breath...");
    if (phaseTimer > 180) {
      breathingPhase = "exhale";
      phaseTimer = 0;
    }
  } else if (breathingPhase === "exhale") {
    flowerImage = flowerImages["exhale"];
    currentScale = lerp(currentScale, flowerMinScale, 0.02);
    updateFlowerSize();
    displayText("Exhale...");
    if (phaseTimer > 180) {
      breathingPhase = "idle";
      phaseTimer = 0;
    }
  } else if (breathingPhase === "idle") {
    flowerImage = flowerImages["idle"];
    displayText("Press space to continue...");
  }
}

//function for displaying text during the breathing exercise phase
function displayText(input) {
  textSize(32);
  textAlign(CENTER, CENTER);
  fill("#F77A32");
  text(input, width / 2, height / 10);
}

function displayStartScreen() {
  image(startScreen, 0, 0, width, height);

  //positions of the start button
  let buttonX = width / 2 - startButton.width / 2;
  let buttonY = height / 2;

  //detects if the mouse is hovering over the start button
  let isHovering =
    mouseX > buttonX &&
    mouseX < buttonX + startButton.width &&
    mouseY > buttonY &&
    mouseY < buttonY + startButton.height;

  //if the mouse is hovering over the start button, darken the start button image
  if (isHovering) {
    push();
    tint(150);
    image(startButton, buttonX, buttonY);
    pop();
  } else { //otherwise, display it as normal
    image(startButton, buttonX, buttonY);
  }

  //if the start button is clicked start the first coversation phase
  if (isHovering && mouseIsPressed) {
    gamePhase = "conversation";
    initializeTypewriter(messages[currentMessageIndex].text);
    isTalking = true;
  }
}

function displayConversation() {
  image(wildflowersBackground, 0, 0, width, height);

  //for the bobbing effect of the flower sprite
  flowerYOffset = sin(frameCount * 0.05) * 10;

  let flowerWidth = flowerSprite.width * 0.3;
  let flowerHeight = flowerSprite.height * 0.3;

  //use the speaking gif if the conversation is being typed
  if (isTalking) {
    image(
      flowerTalking,
      width / 2 - flowerWidth / 2,
      flowerY + flowerYOffset,
      flowerWidth,
      flowerHeight
    );
  } else { //otherwise use the idle flower sprite image
    image(
      flowerSprite,
      width / 2 - flowerWidth / 2,
      flowerY + flowerYOffset,
      flowerWidth,
      flowerHeight
    );
  }

  //displaying the speech bubble
  let speechBubbleWidth = speechBubble.width;
  let speechBubbleHeight = speechBubble.height;
  let bubbleX = width / 2 - speechBubbleWidth / 2;
  let bubbleY = height - 275;
  image(speechBubble, bubbleX, bubbleY);

  //setting the isTalking boolean to false if the conversation text has finished typing
  if (isTypewriterFinished()) {
    isTalking = false;
  }

  //displaying the conversation text with a typewriter effect
  displayTypewriterText(
    bubbleX,
    bubbleY,
    speechBubbleWidth,
    speechBubbleHeight,
    messages[currentMessageIndex].size,
    "#34027C"
  );
}

//function that shrinks/enlarges the flower sprite
function updateFlowerSize() {
  flowerWidth = flowerOriginalWidth * currentScale;
  flowerHeight = flowerOriginalHeight * currentScale;
}

//displaying the nature scene along with the semi-transparent flower sprite
function displayNatureScene() {
  image(natureScenes[currentSceneIndex], 0, 0, width, height);

  tint(255, 200);
  image(
    flowerImage,
    width / 2 - flowerWidth / 2,
    height / 2 - flowerHeight / 2,
    flowerWidth,
    flowerHeight
  );
  noTint();
}