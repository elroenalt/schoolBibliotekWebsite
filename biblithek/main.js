const JsonFile = 'data.json';
let bookTips = undefined

let curIndex = 0
let maxDisp = 3
let BookDisplayvisibility = false
function openBookDisplay(id) {
    const data = bookTips[curIndex+id]
    document.querySelector('#Book-Display').style.display = "grid"
    document.querySelector('#Book-Display-Title').textContent = data.title
    document.querySelector('#Book-Display-Info').textContent = `von ${data.author}
    ${data.minAge}`
    document.querySelector('#Book-Display-IMG').src = data.image
    document.querySelector('#Book-Display-Rezesion').innerText = `${data.rezension.replaceAll(".", ".\n")}
    geschrieben von: ${data.by}`
}
function changeBookTippvisibility() {
    document.querySelector('#Book-Display') = BookDisplayvisibility ? "none" : "gird"
}
function displayBookTipp(ind,Disp) {
    const Title = document.querySelector(`#Book-Tipp-Title-${Disp}`)
    const IMG = document.querySelector(`#Book-Tipp-IMG-${Disp}`)
    const Info = document.querySelector(`#Book-Tipp-INFO-${Disp}`)
    const data = bookTips[ind]
    Title.textContent = data.title
    IMG.src = data.image
    Info.textContent = `Alters Empfehlung: ${data.minAge}
    Genre: ${data.genre}
    Author: ${data.author}
    Rezesion von: ${data.by}`
}
function changeBookTipps(by) {
    curIndex += by;
    document.querySelector('#arrow-l').style.display = curIndex <= 0 ? "none" : "grid"
    document.querySelector('#arrow-r').style.display = curIndex + maxDisp > bookTips.length ? "none" : "grid"
    let dataIndex = curIndex
    for(let i = 0; i < maxDisp; i++) {
        const Display = document.querySelector(`#Book-Tipp-${i}`).style
        if(!bookTips[dataIndex] || i >= maxDisp) {
            Display.display = "none"
            continue
        }else if(Display.display === "none") {
            Display.display = "grid"
        }
        displayBookTipp(dataIndex,i)
        dataIndex++
    }

}
function checkIfResized() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    console.log("Is Mobile: " + isMobile);
    maxDisp = isMobile ? 1 : 3;
    if (maxDisp === 1) {
        document.querySelector(`#Book-Tipp-1`).style.display = "none";
        document.querySelector(`#Book-Tipp-2`).style.display = "none";
    }

    changeBookTipps(0);
}
async function fetchJsonFiles() {
    try {
        const response = await fetch(JsonFile);
        if (!response.ok) {
            throw new Error('Error! while loading ' + JsonFile + ' status: ' + response.status);
        }
        const data = await response.json();
        bookTips = data;
        checkIfResized()
    } catch (error) {
        console.error("Error while starting:", error);
        return; 
    }
} 
fetchJsonFiles()
window.addEventListener('resize', checkIfResized)