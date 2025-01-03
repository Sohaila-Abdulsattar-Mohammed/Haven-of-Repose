let evilMessages = [
  { text: "Wait... did you actually think you could relax as a student?", size: 24 },
  { text: "I mean, come on. Relaxation? That's not in the student handbook.", size: 22 },
  { text: "You've got deadlines. Exams. Grades. Internship applications. Social obligations.\n And you're here, wasting time..?", size: 20 },
  { text: "You should be working harder... doing better.", size: 24 },
  { text: "Let's see how well you can *really* focus.", size: 24 },
  { text: "Here's the deal: you will type the following words as fast as you can. No questions.", size: 22 },
  { text: "You will have three seconds per word. If you really want to prove your worth, you better not run out of time.", size: 22 },
  { text: "At least you'll be doing something more useful than wasting time like this.", size: 22},
  { text: "Ready or not, we're starting.", size: 24 },
];

function displayEvilConversation() {
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
    evilMessages[currentMessageIndex].size,
    "#FF0000"
  );
}

