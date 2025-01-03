let evilLosingMessages = [
  { text: "Did you think you'd get a second chance? How adorable.", size: 24 },
  { text: "This isn't some kids game. There is no restarting here.", size: 26 },
];

function displayLosingConversation() {
  image(evilBackground, 0, 0, width, height);
  
  //for the bobbing effect of the flower sprite
  flowerYOffset = sin(frameCount * 0.05) * 10;
  
  let flowerWidth = evilSprites["idle"].width * 0.3;
  let flowerHeight = evilSprites["idle"].height * 0.3;

  //use the speaking gif if the conversation is being typed
  if (isTalking) {
    image(
      evilSprites["talking"],
      width / 2 - flowerWidth / 2,
      flowerY + flowerYOffset,
      flowerWidth,
      flowerHeight
    );
  } else { //otherwise use the idle flower sprite image
    image(
      evilSprites["idle"],
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
  image(darkSpeechBubble, bubbleX, bubbleY);

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
    evilLosingMessages[currentMessageIndex].size,
    "#FF0000"
  );
}

