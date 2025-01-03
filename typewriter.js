//typewriter effect for text animation
//inspired by https://gist.github.com/mjvo/2dce29799eb75b7ee1a571380f12ef1b and https://stackoverflow.com/questions/63282120/how-to-create-typewriter-effect

let typewriterState = {
  message: "",
  currentText: "",
  index: 0,
  finished: false,
};

function initializeTypewriter(message, delay = 50) {
  typewriterState.message = message;
  typewriterState.currentText = "";
  typewriterState.index = 0;
  typewriterState.finished = false;

  //start the typing process
  typewriterLogic(delay);
}

//typing logic using setTimeout
function typewriterLogic(delay) {
  if (typewriterState.index < typewriterState.message.length) {
    setTimeout(() => {
      typewriterState.currentText += typewriterState.message[typewriterState.index];
      typewriterState.index++;
      typewriterLogic(delay); //continue with the next character
    }, delay);
  } else {
    typewriterState.finished = true;
  }
}

//display the typewriter text in the speech bubble
function displayTypewriterText(
  bubbleX, //x position of the speech bubble
  bubbleY, //y position of the speech bubble
  bubbleWidth, //width of the speech bubble
  bubbleHeight, //height of the speech bubble
  fontSize, //font size for the text
  fontColor //color of the text
) {
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  fill(fontColor);

  //display the current text inside the speech bubble with padding
  text(
    typewriterState.currentText,
    bubbleX + 30,
    bubbleY + 20,
    bubbleWidth - 90,
    bubbleHeight - 40
  );
}

//check if the typewriter has finished
function isTypewriterFinished() {
  return typewriterState.finished;
}
