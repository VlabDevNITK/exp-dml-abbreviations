let simsubscreennum = 0;
let temp = 0;

function navNext() {
  for (temp = 0; temp < 2; temp++) {
    document.getElementById("canvas" + temp).style.display = "none";
  }

  simsubscreennum += 1;
  //
  document.getElementById("canvas" + simsubscreennum).style.display = "block";
  document.getElementById("nextButton").style.display = "none";
  // magic();
}

function animatearrow() {
  if (document.getElementById("arrow1").style.visibility == "hidden")
    document.getElementById("arrow1").style.visibility = "visible";
  else document.getElementById("arrow1").style.visibility = "hidden";
}

function myStopFunction() {
  clearInterval(myInt);
  document.getElementById("arrow1").style.visibility = "hidden";
}

function removeInvalidCharacters() {
  const input = document.getElementById('searchInput');
  input.value = input.value.replace(/[^a-zA-Z\s1234567890]/g, '');
}




// document.addEventListener("DOMContentLoaded", function () {
// });

function validateInput() {
  const inputField = document.getElementById("alphabetInput");
  const errorText = document.getElementById("errorText");
  const hintButton = document.getElementById("hintButton");
  const morseOutput = document.getElementById("morseOutput");
  const outputImg = document.querySelector(".outputImg");
  const playButton = document.getElementById("playButton");

  let alphabetInput = inputField.value.toUpperCase();
  alphabetInput = alphabetInput.replace(/[^A-Z]/g, "");
  inputField.value = alphabetInput;

  document.querySelector(".output").textContent = alphabetInput;
  document.querySelector(".out").textContent = alphabetInput;

  if (alphabetInput.length === 1) {
    errorText.textContent = "";
    hintButton.style.visibility = "visible";
    outputImg.style.visibility = "hidden";

    morseOutput.style.visibility = "hidden";
    updateMorseOutput(alphabetInput, true);
    playButton.disabled = false;
  } else {
    if (alphabetInput.length > 0) {
      errorText.textContent = "Please enter a single alphabet from A to Z.";
    } else {
      errorText.textContent = "";
    }
    hintButton.style.visibility = "hidden";
    outputImg.style.visibility = "hidden";
    morseOutput.style.visibility = "hidden";
    playButton.disabled = true;
  }
}

function handleInputChange() {
  const input = document.getElementById("alphabetInput");
  const hintButton = document.getElementById("hintButton");
  const isAlphabetic = /^[a-zA-Z]$/.test(input.value);

  if (isAlphabetic) {
    hintButton.style.display = "block";
  } else {
    hintButton.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("alphabetInput");
  const hintButton = document.getElementById("hintButton");
});

let isPlaying = false;
let context;
let oscillator;

function initializeAudio() {
  context = new (window.AudioContext || window.webkitAudioContext)();
}

function playSymbol(symbol, duration) {
  // Ensure the AudioContext is resumed before playing the sound
  if (context.state === "suspended") {
    context.resume().then(() => {
      oscillator = context.createOscillator();
      oscillator.frequency.value = 600;
      oscillator.connect(context.destination);
      oscillator.start();

      setTimeout(() => {
        oscillator.stop(); // Stop after the specified duration
      }, duration);
    });
  } else {
    oscillator = context.createOscillator();
    oscillator.frequency.value = 600;
    oscillator.connect(context.destination);
    oscillator.start();

    setTimeout(() => {
      oscillator.stop(); // Stop after the specified duration
    }, duration);
  }
}



function playMorseSequence() {
  if (isPlaying) return; // Prevent concurrent plays
  isPlaying = true;

  const inputField = document.getElementById("searchInput");
  const backBtn = document.getElementById("backButton");
  const playButton = document.getElementById("playButton");
  const morseOutput = document.getElementById("morseOutput");
  const userInput = inputField.value.toUpperCase();

  inputField.disabled = true;
  backBtn.disabled = true;
  playButton.disabled = true;

  let fullMorse = "";
  morseOutput.textContent = "";
  let currentCharIndex = 0;
  const intervalDuration = 800; // Duration between symbols (800ms)
  const initialDelay = 600; // 600ms delay before starting
  let isFirstSymbol = true;

  function animateMorseCode() {
    if (currentCharIndex < userInput.length) {
      const char = userInput[currentCharIndex];
      if (char in charToMorse) {
        const morseChar = charToMorse[char];
        let morseIndex = 0;

        function playNextSymbol() {
          if (morseIndex < morseChar.length) {
            const symbol = morseChar[morseIndex];
            const symbolDuration = symbol === "." ? 100 : 300; // Set duration based on dot or dash

            if (isFirstSymbol) {
              isFirstSymbol = false;
              // First symbol delay: 600ms
              setTimeout(() => {
                playSymbol(symbol, symbolDuration); // Play the first symbol after 600ms
                fullMorse += symbol;
                morseOutput.textContent = fullMorse;
                morseIndex++;
                setTimeout(playNextSymbol, intervalDuration); // Continue after regular interval
              }, initialDelay); // Delay only for the first symbol
            } else {
              // For subsequent symbols, no extra delay
              playSymbol(symbol, symbolDuration);
              fullMorse += symbol;
              morseOutput.textContent = fullMorse;
              morseIndex++;
              setTimeout(playNextSymbol, intervalDuration); // Regular interval for next symbol
            }
          } else {
            // End of character, move to next character after a space
            fullMorse += " ";
            morseOutput.textContent = fullMorse;
            currentCharIndex++;
            setTimeout(animateMorseCode, intervalDuration); // Move to the next character
          }
        }

        playNextSymbol(); // Start playing symbols for the current character
      } else {
        // Handle invalid character
        morseOutput.textContent += ` Invalid character: ${char} `;
        currentCharIndex++;
        setTimeout(animateMorseCode, intervalDuration);
      }
    } else {
      // Sequence finished, reset UI
      isPlaying = false;
      inputField.disabled = false;
      backBtn.disabled = false;
      playButton.disabled = false;
    }
  }

  animateMorseCode(); // Start the animation
}



// Event listener for DOM load
document.addEventListener("DOMContentLoaded", () => {
  initializeAudio();
  document
    .getElementById("playButton")
    .addEventListener("click", playMorseSequence);
});

function repeat() {
  console.log("clickedrepeat");

  simsubscreennum = 1;

  document.getElementById("canvas2").style.visibility = "hidden";

  document.getElementById("canvas1").style.visibility = "visible";
  document.getElementById("repeat").style.visibility = "hidden";

  const selectclear = document.getElementById("myselect");
  selectclear.selectedIndex = 0;
}
function repeat() {
  console.log("clickedrepeat");

  simsubscreennum = 1;

  document.getElementById("canvas2").style.visibility = "hidden";
  document.getElementById("canvas1").style.visibility = "visible";
  document.getElementById("repeat").style.visibility = "hidden";

  document.getElementById("morsedisplay").innerHTML = "";

  var morseImage = document.getElementById("morseImage");

  morseImage.style.visibility = "hidden";

  var numericInput = document.getElementById("numberInput");
  var rangeInput = document.getElementById("slider");

  numericInput.value = 0;

  numberMorse();
}

function updateMorseOutput(alphabet, reset = false) {
  const char = alphabet.toUpperCase();
  const morseCodeMapping = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
  };

  const morseCode = morseCodeMapping[char];
  const morseOutput = document.getElementById("morseOutput");

  if (morseCode) {
    if (reset) {
      morseOutput.textContent = "";
    }
    morseOutput.style.visibility = "visible";
  } else {
    morseOutput.textContent = "";
    morseOutput.style.visibility = "hidden";
  }
}

function updateOutputImg(alphabet) {
  // Implement the logic to show the image for the given alphabet
  const outputImg = document.querySelector(".outputImg");

  // Example logic for updating the image (replace with your actual logic)
  if (alphabet) {
    // Show the image related to the alphabet
    outputImg.style.visibility = "hidden";
    // For example, you might set the src of an <img> element inside outputImg
    // document.querySelector(".outputImg img").src = `path/to/${alphabet}.png`;
  }
}

const charToMorse = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  "?": "..--..",
};

function displayHintImages() {
  const selectElement = document.querySelector("#alphabetInput");
  const output = selectElement.value.toUpperCase();
  const imageContainer = document.querySelector(".outputImg");
  imageContainer.style.visibility = "visible";
  const nameContainer = document.querySelector(".outputName");
  //   const nameDiv = document.querySelector(".nameDiv");

  const letterNames = {
    A: "Archery",
    B: "Banjo",
    C: "Candy",
    D: "Dog",
    E: "Eye",
    F: "Firetruck",
    G: "Giraffe",
    H: "Hippo",
    I: "Insect",
    J: "Jet",
    K: "Kite",
    L: "Laboratory",
    M: "Mustache",
    N: "Net",
    O: "Orchestra",
    P: "Paddle",
    Q: "Quarterback",
    R: "Robot",
    S: "Submarine",
    T: "Tape",
    U: "Unicorn",
    V: "Vacuum",
    W: "Wand",
    X: "X-ray",
    Y: "Yard",
    Z: "Zebra",
  };

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const morseCode = getMorseCodeForAlphabet(output);
  let morseIndex = 0;

  // Clear previous content
  while (imageContainer.firstChild) {
    imageContainer.removeChild(imageContainer.firstChild);
  }

  hideHintButton();

  if (images[output]) {
    let currentIndex = 0;

    // Create and style the image element
    const image = document.createElement("img");
    image.src = images[output].normal; // Start with the normal image
    image.alt = `Image for ${output}`;
    image.style.width = "245px";
    image.style.height = "235px";
    // image.style.margin = "-45px";
    // image.style.marginLeft = "80px";
    // image.style.paddingLeft = "140px";

    // Append the image to the container
    imageContainer.appendChild(image);

    // nameContainer.textContent = letterNames[output] || '';

    const nameDiv = document.createElement("div");
    nameDiv.textContent = letterNames[output];
    nameDiv.className = "nameDiv";

    // Append the name div to the container
    imageContainer.appendChild(nameDiv);

    // Define the timing intervals
    const intervalTime = 800; // Fixed interval for image change

    // Function to play sound
    function playSound(duration) {
      const oscillator = audioContext.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration / 1000); // Convert duration to seconds
    }

    // Function to change the image
    let dotIndex = 1;
    let dashIndex = 1;

    function changeImage() {
      if (morseIndex < morseCode.length) {
        const symbol = morseCode[morseIndex];
        let imageSrc;

        if (symbol === ".") {
          // Build the image source based on dotIndex
          imageSrc =
            images[output]["dot" + (dotIndex > 1 ? dotIndex : "")] ||
            images[output].dot;
          playSound(100); // Duration for dot

          // Increment dotIndex for the next dot image
          dotIndex++;
        } else if (symbol === "-") {
          // Build the image source based on dashIndex
          imageSrc =
            images[output]["dash" + (dashIndex > 1 ? dashIndex : "")] ||
            images[output].dash;
          playSound(300); // Duration for dash

          // Increment dashIndex for the next dash image
          dashIndex++;
        }

        // Log information for debugging
        console.log(
          "Morse Code Symbol:",
          symbol,
          "Image Src:",
          imageSrc,
          "Current Index:",
          morseIndex
        );

        // Set the image source
        image.src = imageSrc;
        morseIndex++; // Move to the next Morse code symbol

        // Continue to the next image
        setTimeout(changeImage, intervalTime);
      } else {
        // Show the final Morse code image (no reset to normal)
        // setTimeout(function () {
        //     image.src = images[output].normal; // Reset to normal image
        // }, intervalTime);
      }
    }

    // Initialize the counters before starting the image change process
    dotIndex = 1;
    dashIndex = 1;

    // Start the image change process
    setTimeout(changeImage, intervalTime);
  } else {
    // If no image found for the selected alphabet, display an error or placeholder message
    imageContainer.textContent = "Image not found";
    nameContainer.textContent = "";
  }
}

function hideHintButton() {
  const hintButton = document.getElementById("hintButton");
  hintButton.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  const backButton = document.getElementById("backButton");
  const menuContainer = document.querySelector(".menu-container");
  const errorMessage = document.getElementById("errorMessage");
  const searchInput = document.getElementById("searchInput");
  // const btnContainer = document.querySelector('.btn-container');
  const morseOutput = document.getElementById("morseOutput");
  const msg = document.getElementById("message");
  const msgMean = document.getElementById("messageMean");
  const playBtn = document.getElementById("playButton");
  const morsePlay = document.querySelector(".morsePlay");
  const meanText = document.getElementById("meaningText");
  const audioText = document.querySelector(".text3");
  let lastAbbreviation = ""; // Variable to store  the last selected abbreviation

  // Event listener for each box
  boxes.forEach((box) => {
    box.addEventListener("click", (event) => {
      const abbreviation = event.target.innerText;
      searchInput.value = abbreviation; // Set the abbreviation to input box
      lastAbbreviation = abbreviation; // Update the last selected abbreviation
      backButton.style.display = "block";
      // btnContainer.style.display = 'block';

      morseOutput.style.display = "block";
      menuContainer.style.display = "none";
      msg.style.display = "block";
      playBtn.style.display = "block";
      msgMean.style.display = "block";
      morsePlay.style.display = "grid"; // Show the morsePlay div
      console.log("message is displayed");
      meanText.style.display = "block";
      audioText.style.display = "block";
      console.log("Abbreviation button is clicked");

      meanText.style.display = "block";
    meanText.textContent = `The abbreviation of '${abbreviation}' is shown below.`;
      
    });
  });

  // Event listener for back button
  backButton.addEventListener("click", () => {
    backButton.style.display = "none";
    morseOutput.innerHTML = ""; // Clear the morseOutput content
    morseOutput.style.display = "none";
    // btnContainer.style.display = 'none';
    menuContainer.style.display = "block";
    msg.style.display = "none";
    playBtn.style.display = "none";
    msgMean.style.display = "none";
    morsePlay.style.display = "none";
    meanText.style.display = "none";
    audioText.style.display = "none";
  });

  // Filter abbreviations based on input
  window.filterAbbreviations = function () {
    const input = searchInput.value.toUpperCase().trim();
    let fullMatchFound = false;
    let anyMatchFound = false;

    boxes.forEach((box) => {
      const abbreviation = box.innerText.toUpperCase();
      if (abbreviation.indexOf(input) > -1) {
        box.style.display = "";
        anyMatchFound = true;
        if (abbreviation === input) {
          fullMatchFound = true;
        }
      } else {
        box.style.display = "none";
      }
    });

    if (anyMatchFound) {
      errorMessage.style.display = "none";
      menuContainer.style.display = "block";
      backButton.style.display = "none";
      document.querySelector(".morsePlay").style.display = "none";
    } else {
      errorMessage.style.display = "block";
      menuContainer.style.display = "none";
      backButton.style.display = "none";
      msgMean.style.display = "none";
      playBtn.style.display = "none";
      meanText.style.display = "none";
    }

    // Hide morseOutput and btnContainer if input is empty or no full match is found
    if (input === "" || !fullMatchFound) {
      morseOutput.style.display = "none";
      // btnContainer.style.display = 'none';
      msgMean.style.display = "none";
      meanText.style.display = "none";
      playBtn.style.display = "none";
      audioText.style.display = "none";
    }
  };

  // Event listener for search input changes
  searchInput.addEventListener("input", () => {
    const input = searchInput.value.trim();
    if (input === "" || input !== lastAbbreviation.toUpperCase()) {
      morseOutput.innerHTML = ""; // Clear the morseOutput content
      morseOutput.style.display = "none"; // Optionally hide it
      // btnContainer.style.display = 'none';
      msg.style.display = "none";
      msgMean.style.display = "none";
      playBtn.style.display = "none";
      meanText.style.display = "none";
      audioText.style.display = "none";
    }
    filterAbbreviations(); // Call filter function to update the list
  });
});

function displayMessage(message) {
  document.getElementById("message").innerText = message;
}

function displayMeaning(meaning) {
  document.getElementById("messageMean").innerText = meaning;
}
