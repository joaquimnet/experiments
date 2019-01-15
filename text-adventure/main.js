/***************
 *   VARIABLES *
 *             *
 ***************/

// DOM Selectors
const inputField = document.querySelector('.input');
let input = inputField.value;
const inputOptionsContainer = document.querySelector('.options__container');

// Internal Variables
let waitingForInput = false; // Input Handler Variable
let hasInputed = false; // Input Handler Variable
let inputOptions = []; // Input Handler Variable
let chosenInput = ''; // Input Handler Variable
let isDisplaying = false; // Display variable: used to avoid multiple recursive calls
let stack = []; // Display variable: used to show the messages in order
let lastOutputColor = false; // Helper variable: used to alternate text color between light and dark

// Game Data
let gameData = {
  flow: 0,
  isBrave: false,
  hasBow: false
}

// Helper functions
const getOutputColor = () => {
  lastOutputColor = !lastOutputColor;
  return lastOutputColor === true ? '#373737' : '#919191';
}

/**
 * Display available options to the screen
 * @param  {boolean} newState Wheter to show or hide the options
 * @return {void}
 */
const showInputOptions = (newState) => {
  if (newState !== undefined && newState === false) {
    // clear
    inputOptionsContainer.innerHTML = "";
  } else if (newState !== undefined && newState === true) {
    // show
    inputOptions.forEach((item) => {
      const button = document.createElement('BUTTON');
      let text = document.createTextNode(item);
      button.appendChild(text);
      button.classList.add("options__button");
      inputOptionsContainer.appendChild(button);
    });
  }
}

/**
 * Writes something to the game window
 * @param  {string} text Text to display
 * @param  {number} delay Delay until this message show up
 * @param  {boolean} inline Whether to write this text inline or not
 * @return {void}
 */
const write = (text, delay = 0, inline = false) => {
  const id = Date.now();
  const newStack = {
    message: text,
    delay: delay,
    id: id,
    inline: inline
  }
  stack.push(newStack);
  display(id);
}

/**
 * DO NOT USE (This is a recursive function meant to be used by the write() function)
 * @param  {number} id         Timestamp of when the message was pushed into the stack
 * @param  {boolean} fromInside To check if its a recursive call
 * @return {void}
 */
const display = (id, fromInside) => {
  if (isDisplaying && !fromInside) {
    return;
  }
  isDisplaying = true;

  let messageIndex = stack.findIndex((item) => item.id === id);
  messageIndex = messageIndex === -1 ? 0 : messageIndex;
  let message = stack[messageIndex].message;
  let delay = stack[messageIndex].delay;
  let inline = stack[messageIndex].inline;

  setTimeout(() => {
    if (isDisplaying) {
      messageIndex = 0;
      message = stack[0].message;
      delay = stack[0].delay;
      inline = stack[0].inline;
    }
    const outputElement = document.querySelector('p');
    const textNode = document.createTextNode(message);
    const span = document.createElement('span');
    if (!inline) {
      const br = document.createElement('br');
      outputElement.insertBefore(br, outputElement.firstChild);
      span.style.color = getOutputColor();
    }
    span.appendChild(textNode);
    outputElement.insertBefore(span, outputElement.firstChild);
    stack.splice(messageIndex, 1);
    if (isDisplaying) {
      if (stack.length < 1) {
        isDisplaying = false;
        // FINISHED DISPLAYING, NO MORE TEXT TO DISPLAY
        if (waitingForInput && !hasInputed) {
          showInputOptions(true);
        } else if (waitingForInput && hasInputed) {
          showInputOptions(false);
        }
      } else {
        display(0, true);
      }
    }
  }, delay)
}

/*****************************
 *      GAME CONTROLLER      *
 *  (FLOW AND STATE CONTROL) *
 *****************************/

/**
 * Event handler to handle player input
 * @param  {InputEvent} event DOM event
 * @return {void}
 */
const onInputHandler = (event) => {
  if (isDisplaying) {
    event.preventDefault();
    inputField.value = '';
    return;
  }
  const input = event.target.value;
  if (waitingForInput) {
    inputOptions.forEach((item) => {
      if (item === input.toUpperCase()) {
        hasInputed = true;
        chosenInput = input.toUpperCase();
        inputField.value = '';
        inputOptionsContainer.innerHTML = '';
        gameController();
        return;
      }
    });
  }
}

const gameController = () => {
  // 0: Introduction #1
  if (gameData.flow === 0) {
    if (!waitingForInput) {
      write(" ", 50);
      write("Welcome!", 1000);
      write("Would you like to go in a adventure?", 1000);
      inputOptions = ['YES', 'NO'];
      waitingForInput = true;
    } else {
      if (hasInputed) {
        if (chosenInput === 'YES') {
          gameData.flow = 1;
        } else if (chosenInput === 'NO') {
          gameData.flow = 1;
        }
        hasInputed = false;
        waitingForInput = false;
      }
    }
  }

  // 0: Introduction #2
  if (gameData.flow === 1) {
    if (!waitingForInput) {
      write('> ' + chosenInput);
      if (chosenInput === "YES") {
        write("Well then. Let's begin!", 1000);
      } else if (chosenInput === "NO") {
        write("I'm sorry, we are already starting!", 1000);
      }
      write("Tell me...", 1000);
      write("Are you a brave person?", 2000);
      inputOptions = ['YES', 'NO'];
      waitingForInput = true;
    } else {
      if (hasInputed) {
        if (chosenInput === 'YES') {
          gameData.isBrave = true;
          gameData.flow = 10;
        } else if (chosenInput === 'NO') {
          gameData.isBrave = false;
          gameData.flow = 10;
        }
        hasInputed = false;
        waitingForInput = false;
      }
    }
  }

  // 1: Wake up #1
  if (gameData.flow === 10) {
    if (!waitingForInput) {
      write('> ' + chosenInput);
      write("...", 1000);
      write("You wake up.", 1000);
      write("Someone is yelling.", 2000);
      write("The village chief has been looking for you.", 2000);
      write("He asked you to slay an evil monster that has threatened your village.", 2000);
      write("\"Go through the bridge of the endless fall\", the Chief said.", 2000);
      write("\"You will find the monster on the other side\"", 2000);
      if (gameData.isBrave) {
        write("You are a fierce warrior but this may be your biggest challenge so far.", 2000);
      } else {
        write("Even though you are not a warrior you have been trusted with this task.", 2000);
      }
      write("It is not sure whether you can do this or not.", 2000);
      write(".", 1000, false);
      write(".", 1000, true);
      write(".", 1000, true);
      write("But you know that the chief is the wisest among all.", 1000);
      write("You get your favorite weapon and head to the bridge.", 1000);
      write("Which of these is your favorite weapon?", 2000);
      inputOptions = ['SWORD', 'BOW'];
      waitingForInput = true;
    } else {
      if (hasInputed) {
        if (chosenInput === 'SWORD') {
          gameData.hasBow = false;
          gameData.flow = 20;
        } else if (chosenInput === 'BOW') {
          gameData.hasBow = true;
          gameData.flow = 20;
        }
        hasInputed = false;
        waitingForInput = false;
      }
    }
  }

  // 2: Beggining of the adventure #1
  if (gameData.flow === 20) {
    if (!waitingForInput) {
      write('> ' + chosenInput);
      write("You arrive at the bridge.", 1000);
      write("It's an old looking bridge.", 1000);
      write("Doesn't look like anyone has been here in a while.", 1000);
      // write(".", 1000, false);
      // write(".", 1000, true);
      // write(".", 1000, true);
      write("What will you do?", 2000)
      inputOptions = ['CROSS', 'STAY'];
      waitingForInput = true;
    } else {
      if (hasInputed) {
        if (chosenInput === 'CROSS') {
          gameData.flow = 30;
        } else if (chosenInput === 'STAY') {
          gameData.flow = 22;
        }
        hasInputed = false;
        waitingForInput = false;
      }
    }
  }

  // 2: Beggining of the adventure #2
  if (gameData.flow === 22) {
    if (!waitingForInput) {
      write('> ' + chosenInput);
      write("There is no reason to stay.", 1000);
      write("You decide to cross anyway.", 1000);
      gameData.flow = 30;
    }
  }

  // 3: Encounter #1
  if (gameData.flow === 30) {
    if (!waitingForInput) {
      if (chosenInput === "CROSS") {
        write('> ' + chosenInput, 50);
      }
      write(".", 1000, false);
      write(".", 1000, true);
      write(".", 1000, true);
      write("You get to the other side.", 1000);
      write("You don't see anything at first.", 1000);
      write("But then-", 1000);
      write(".", 500, false);
      write(".", 500, true);
      write(".", 500, true);
      write("It's a dragon!", 1000);
      write("And it's coming towards you.", 1000);
      write("What will you do?", 1000);
      inputOptions = [];
      gameData.hasBow === true ? inputOptions.push('USE BOW') : inputOptions.push('USE SWORD');
      inputOptions.push('RUN')
      waitingForInput = true;
    } else {
      if (hasInputed) {
        if (chosenInput === 'USE SWORD') {
          gameData.isBrave === true ? gameData.flow = 40 : gameData.flow = 43;
        } else if (chosenInput === 'USE BOW') {
          gameData.isBrave === true ? gameData.flow = 41 : gameData.flow = 43;
        } else if (chosenInput === 'RUN') {
          gameData.isBrave === true ? gameData.flow = 42 : gameData.flow = 43;
        }
        hasInputed = false;
        waitingForInput = false;
      }
    }
  }

  // 4: Engage dragon #1 - Brave sword
  if (gameData.flow === 40) {
    if (!waitingForInput) {
      write('> ' + chosenInput);
      write("As the dragon notices you readying your sword it start moving faster.", 1000);
      write("It charges at you at an incredible speed!", 1000);
      write(".", 1000, false);
      write(".", 1000, true);
      write(".", 1000, true);
      write("You manage to barely avoid it.", 1000);
      write("Exploiting the opening the dragon left after that attack you thrust your sword at the dragon's neck with all your might.", 1000)
      write("It's a critical hit! You defeated the dragon.", 3000);
      write(".", 1000, false);
      write(".", 1000, true);
      write(".", 1000, true);
      gameData.flow = 50;
    }
  }

  // 4: Engage dragon #2 - Brave bow
  if (gameData.flow === 41) {
    if (!waitingForInput) {
      write('> ' + chosenInput);
      write("As the dragon notices you readying your bow it start moving faster.", 1000);
      write("It charges at you at an incredible speed!", 1000);
      write("But it's too late, you already shoot an arrow.", 1000);
      write(".", 1000, false);
      write(".", 1000, true);
      write(".", 1000, true);
      write("You hit the dragon's eye.", 2000);
      write("It falls to the ground.", 1000);
      write("You hit the staggered dragon with a few more arrows.", 1000)
      write("The dragon is dead.", 2000);
      write(".", 1000, false);
      write(".", 1000, true);
      write(".", 1000, true);
      gameData.flow = 50;
    }
  }

  // 4: Engage dragon #3 - Brave run
  if (gameData.flow === 42) {
    if (!waitingForInput) {
      write('> ' + chosenInput);
      write("You sprint back the bridge.", 1000);
      write("As the dragon noticed your intentions it started going after you.", 1000)
      write("You cross it swiftly as the dragon pursues you.", 1000);
      write("As you make it to the other side.", 1000);
      write("When the dragon gets to the middle of the bridge it collapses.", 1000);
      write("For whatever reason it doesn't fly back up.", 2000);
      write("The dragon disappears into the abyss.", 2000);
      write(".", 1000, false);
      write(".", 1000, true);
      write(".", 1000, true);
      gameData.flow = 51;
    }
  }

  // 4: Engage dragon #4 - Coward
  if (gameData.flow === 43) {
    if (!waitingForInput) {
      write('> ' + chosenInput);
      write("You can't do that.", 1000);
      write("You are too afraid to move.", 1000);
      write("You close your eyes and await your fate.", 1000);
      write(".", 1000, false);
      write(".", 1000, true);
      write(".", 1000, true);
      write("As the dragon notices your pathetic figure it stops.", 1000);
      write("\"What has become of me if they have to send someone like you to end me...\" *sigh*", 2000);
      write("It catches you by surprise.", 3000);
      write("You didn't know dragons could speak.", 1000);
      write("\"Hey, human. Won't you do me a favor, will ya?\", said the dragon in a playful tone.", 1000);
      write("The dragon points to his back.", 3000);
      write("You see a dagger thrust into the dragon all the way to the guard.", 1000);
      write("Still trembling you approach the dragon.", 3000);
      write("You slowly remove the dagger.", 2000);
      write("This dagger glows in a strange way.", 3000);
      write("\"Aha! Thank you human!\"", 2000);
      write("You put the dagger in your bag.", 1000);
      write(".", 1000, false);
      write(".", 1000, true);
      write(".", 1000, true);
      gameData.flow = 52;
    }
  }

  // 5: Conclusion #1 - Brave success
  if (gameData.flow === 50) {
    if (!waitingForInput) {
      write("You went back to the village with one of the dragon's teeth and a scale.", 1000);
      write("You told the village people you defeated the monster.", 2000);
      write("They celebrate you as a hero.", 2000);
      write("The feast the village had that day will be remembered for a long time.", 1000);
      write("A few years after that, after the chief died of old age, you became the new village chief.", 2000);
      gameData.flow = 60;
    }
  }

  // 5: Conclusion #2 - Brave fail
  if (gameData.flow === 51) {
    if (!waitingForInput) {
      write("You went back to the village with unanswered questions and empty handed.", 1000);
      write("You told the village people you defeated the monster.", 2000);
      write("But with no proof of your deeds you are not sure if they believe you.", 2000);
      write("But knowing you defeated the dragon you go back home with a clear conscience.", 2000);
      gameData.flow = 60;
    }
  }

  // 5: Conclusion #3 - Coward
  if (gameData.flow === 52) {
    if (!waitingForInput) {
      write("The dragon explained what happened.", 1000);
      write("He explained that the dagger was cursed.", 2000);
      write("And he also explained how a shady looking figure put it in there.", 2000);
      write("Somehow you became friends with the dragon and made him promise he would never bring harm to the village.", 3000);
      write("You went back to the village with one of the dragon's scale the he willingly gave you.", 4000);
      write("You told the village people you defeated the monster showing the scale as proof.", 3000);
      write("They celebrate you as a hero.", 3000);
      write("The feast the village had that day will be remembered for a long time.", 1000);
      write("A few years after that, after the chief died of old age, you became the new village chief.", 3000);
      gameData.flow = 60;
    }
  }

  // 6: Play again?
  if (gameData.flow === 60) {
    if (!waitingForInput) {
      // FIXME: Implement same-line-ending in display()
      write("The end", 2000);
      write("?", 3000, false);
      write(".", 1000, true);
      write(".", 1000, true);
      write(".", 1000, true);
      write(" ", 500);
      write(" ", 500);
      write("Whew! That was quite the adventure.", 2000);
      write("I hope you liked it.", 1000);
      write("Want to play again?", 1000);
      inputOptions = ['PLAY AGAIN'];
      waitingForInput = true;
    } else {
      if (hasInputed) {
        if (chosenInput === 'PLAY AGAIN') {
          restart();
        }
      }
    }
  }
}

const restart = () => {
  waitingForInput = false; // Input Handler Variable
  hasInputed = false; // Input Handler Variable
  inputOptions = []; // Input Handler Variable
  chosenInput = ''; // Input Handler Variable
  isDisplaying = false; // Display variable: used to avoid multiple recursive calls
  stack = []; // Display variable: used to show the messages in order
  lastOutputColor = false; // Helper variable: used to alternate text color between light and dark
  gameData = {
    flow: 0,
    isBrave: false,
    hasBow: false
  }
  gameController();
}

// Game initialization
inputField.oninput = (event) => onInputHandler(event);
inputField.focus();
gameController();