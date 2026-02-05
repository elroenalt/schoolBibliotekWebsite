//location of the bookTips data
const JsonFile = 'data.json';
//where the bookTips later get saved
let bookTips = undefined
//variables for the display logic
let curIndex = 0
let maxDisp = 3
let BookDisplayvisibility = false

//manager to open the BookDisplay
function openBookDisplay(id) {
    //get bookTip data of the current index
    const data = bookTips[curIndex+id]
    //change html text content to the current data
    document.querySelector('#Book-Display').style.display = "grid"
    document.querySelector('#Book-Display-Title').textContent = data.title
    document.querySelector('#Book-Display-Info').textContent = `von ${data.author}
    ${data.minAge}`
    document.querySelector('#Book-Display-IMG').src = data.image
    document.querySelector('#Book-Display-Rezesion').innerText = `${data.rezension.replaceAll(".", ".\n")}
    geschrieben von: ${data.by}`
}

//changes the bookTips to the current 
function displayBookTip(ind,Disp) {
    //get BookTip data of the current index
    const data = bookTips[ind]
    //change html text content to the current data
    document.querySelector(`#Book-Tipp-Title-${Disp}`).textContent = data.title
    document.querySelector(`#Book-Tipp-IMG-${Disp}`).src = data.image
    document.querySelector(`#Book-Tipp-INFO-${Disp}`).textContent = `Alters Empfehlung: ${data.minAge}
    Genre: ${data.genre}
    Author: ${data.author}
    Rezesion von: ${data.by}`
}
//changes the bookTip respectivly to each arrow
function changeBookTipps(by) {
    //change the current first index
    curIndex += by;
    //update the arrows visivility
    document.querySelector('#arrow-l').style.display = curIndex <= 0 ? "none" : "grid"
    document.querySelector('#arrow-r').style.display = curIndex + maxDisp >= bookTips.length ? "none" : "grid"
    //loop through each bookTipp display and update them
    let dataIndex = curIndex
    for(let i = 0; i < maxDisp; i++) {
        //checks wether the display should be visisvle
        const Display = document.querySelector(`#Book-Tipp-${i}`).style
        //if the index isnt in data turn the display off
        if(!bookTips[dataIndex]) {
            Display.display = "none"
        }else {
            //else if the display was off activate it
            if(Display.display === "none") {
                Display.display = "grid"
            }
            //updates the book Tip
            displayBookTip(dataIndex,i)
        }
        //increase the current dataIndex
        dataIndex++
    }

}
// check for wether the user is on mobile or below 436px in width
function checkIfResized() {
    const isMobile = window.matchMedia("(max-width: 426px)").matches;
    //changes the display amount respectivly
    maxDisp = isMobile ? 1 : 3;
    //turns the excess displays off
    if (maxDisp === 1) {
        document.querySelector(`#Book-Tipp-1`).style.display = "none";
        document.querySelector(`#Book-Tipp-2`).style.display = "none";
    }
}
//load the bookTips from the Json file
async function fetchJsonFiles() {
    try {
        // when the file is accesible get the data
        const response = await fetch(JsonFile);
        if (!response.ok) {
            throw new Error('Error! while loading ' + JsonFile + ' status: ' + response.status);
        }
        const data = await response.json();
        //set the data to out local variable
        bookTips = data;
        //check for mobile and init the display
        checkIfResized()
        changeBookTipps(0);
    } catch (error) {
        //if for some reason there was a error notify the user
        console.error("Error while starting:", error);
        return; 
    }
} 
//start up
fetchJsonFiles()
//asign an check if on mobile when the user resizes his screen eg. if he rotates the phone
window.addEventListener('resize', checkIfResized)