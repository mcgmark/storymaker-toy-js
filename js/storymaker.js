// Assignment 1 | COMP1073 Client-Side JavaScript
// 
//




/* Variables
-------------------------------------------------- */


/* Declare and initialize array to store all buttons by their id */

const buttons = document.querySelectorAll('input');


/* Assign element to variable to be able to target it to change the text content */

const storyOutputElement = document.querySelector('#story');


/* Declare and initialize object to store parts of story */

const storyPartsObject = {
    "nounOneArray" : ["The turkey","Mom","Dad","The dog","My teacher","The elephant","The cat"],
    "verbArray" : ["sat on","ate","danced with","saw","doesn't like","kissed"],
    "adjectiveArray" : ["a funny","a scary","a goofy","a slimy","a barking","a fat"],
    "nounTwoArray" :["goat","monkey","fish","cow","frog","bug","worm"],
    "settingArray" :["on the moon!","on the chair!","in my spaghetti!","in my soup!","on the grass!","in my shoes!"]
};

/* Declare and initialize object to store button click count */

let buttonCounters = {buttonOneCounter:0, buttonTwoCounter:0, buttonThreeCounter:0, buttonFourCounter:0, buttonFiveCounter:0};


/* Declare and initialize object to store currently selected parts of story */ 

let storyPartContainer = {nounOneArray:'', verbArray:'', adjectiveArray:'', nounTwoArray:'', settingArray:''};


/* Declare and initialize variable to hold the complete story - Purposely set to blank to show story as individual parts at start */

let storyComplete = '';



/* Functions
-------------------------------------------------- */


/* Function for the top five buttons. Make use of passing parameters to a function.  */
// Button 1, 2, 3, 4, 5 - Pass parameters for each button to function to select story parts

function topFiveButtons(buttonCounter, pickedArrayName,){ 
    
    // Reset button click counter when its value matches the array length
   
    if (buttonCounters[`${buttonCounter}`] === Object.keys(storyPartsObject[`${pickedArrayName}`]).length) {   
       buttonCounters[`${buttonCounter}`] = 0;
   };

    // Set variable using the button click counter to select an array value 
    
    storyPartContainer[`${pickedArrayName}`] = Object.values(storyPartsObject[`${pickedArrayName}`])[buttonCounters[buttonCounter]]; 

    // Send array value to text-to-speech function
    
    sayIt(storyPartContainer[`${pickedArrayName}`]);

    // Use function to update story output  
    
    updateStory(); 

    // Add 1 to the counter for every button click
    
    buttonCounters[`${buttonCounter}`] ++; 
};


/* Button - Playback - Replays all of the selected parts as a whole story using the sayIt function */

function playbackButton(){
    if (storyComplete === "") {
        storyOutputElement.textContent = "You must click or tap a button to start the story maker!";
    } else {
        sayIt(storyComplete);
    };
};


/* Button - Randomize - This function creates a random story and outputs it */

function randomizeButton(){

    // Find a random array value for every part of the story and set it to object key
    // Uses function that finds a random number using the length of the array
    // Uses a for loop to cycle through each part of the story that needs to be randomly generated
    // Uses the parts object array to select story parts
    
    for (h of Object.keys(storyPartsObject)) {
        storyPartContainer[`${h}`] = randomValueFromArray(Object.values(storyPartsObject[`${h}`]));
        console.log(h);
    };

    // Output the random story to the text element paragraph and text-to-speech using functions //
    
    updateStory();
    sayIt(storyComplete);
};

/* Function to generate a random number based on the length of an array. This is used to select random story parts */
    
function randomValueFromArray(array){
	return array[Math.floor(Math.random()*array.length)];
};


/* Function to convert string to text-to-speech to recreate the See-N-Say toy feature */

function sayIt(txtSpeech) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(txtSpeech));
};


/* Function to update storyComplete variable and text element paragraph that displays the story text  */

function updateStory(){
    storyComplete = `${storyPartContainer.nounOneArray} ${storyPartContainer.verbArray} ${storyPartContainer.adjectiveArray} ${storyPartContainer.nounTwoArray} ${storyPartContainer.settingArray}`;
    storyOutputElement.textContent = storyComplete;
};



/* Event Listeners
-------------------------------------------------- */


/* Using the buttons array with a for loop and an event listener to recognize which button was clicked */

for (i of buttons) {
    i.addEventListener('click', function() {
       
        // Use switch case with the #id of the input element to know which button was clicked
        // Use function with passed parameters for button

        switch (this.id) {   
            case "buttonOne":   
                topFiveButtons('buttonOneCounter', 'nounOneArray'); 
                break;
            case "buttonTwo":
                topFiveButtons('buttonTwoCounter', 'verbArray');
                break;
            case "buttonThree":
                topFiveButtons('buttonThreeCounter', 'adjectiveArray');
                break;
            case "buttonFour":
                topFiveButtons('buttonFourCounter', 'nounTwoArray');
                break;
            case "buttonFive":
                topFiveButtons('buttonFiveCounter', 'settingArray');
                break;
            case "playbackbtn":
                playbackButton();
                break;
            case "randomize":
                randomizeButton();
                break;
        };
    });
};