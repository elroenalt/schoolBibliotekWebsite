const arrowLeft = document.querySelector('#arrowLeft')
const arrowRight = document.querySelector('#arrowRight')
const bookDisplays = [
    {Container: document.querySelector('#bookTip0'),Title: document.querySelector('#bookTip0Title'),  IMG: document.querySelector('#bookTip0IMG'), Content: document.querySelector('#bookTip0Content')},
    {Container: document.querySelector('#bookTip1'),Title: document.querySelector('#bookTip1Title'), IMG: document.querySelector('#bookTip1IMG'), Content: document.querySelector('#bookTip1Content')},
    {Container: document.querySelector('#bookTip2'),Title: document.querySelector('#bookTip2Title'), IMG: document.querySelector('#bookTip2IMG'), Content: document.querySelector('#bookTip2Content')},
]
const JsonFile = 'bookTips.json'
let bookTips;
let TipIndex = 0;

async function fetchJsonFiles() {
    try {
        const response = await fetch(JsonFile)
        if(!response.ok) {
          throw new Error('Error! while laoding '+ JsonFile + ' status: ' + response.status)
        }
        const data = await response.json()
        bookTips = data
    }catch (error) {
        console.error("Error while starting:", error);
    } 
    changeBookTips(0)
}
function changeBookTips(am) {
    TipIndex += am;
    if(TipIndex + 1>= bookTips.length) {
        arrowRight.style.display = 'none'
    }else if(arrowRight.style.display == 'none') {
        arrowRight.style.display = 'block'
    }
    if(TipIndex <= 0 ) {
        arrowLeft.style.display = 'none'
    }else if(arrowLeft.style.display == 'none') {
        arrowLeft.style.display = 'block'
    }
    console.log(TipIndex)
    for(let i = 0; i < 3; i++) {
        const curIndex = TipIndex + i
        const bookDisplay = bookDisplays[i]
        const bookTip = bookTips[curIndex]
        if(bookTip) {
            bookDisplay.Title.textContent = bookTip.title
            bookDisplay.IMG.src = bookTip.image
            bookDisplay.Content.textContent += bookTip.content
            if(bookDisplay.Container.style.display == 'none') {
                bookDisplay.Container.style.display = 'block'
            }
        }else {
            bookDisplay.Container.style.display = 'none';
        }
    }
}
fetchJsonFiles()
arrowLeft.addEventListener('click',() => changeBookTips(-1))
arrowRight.addEventListener('click',() => changeBookTips(1))