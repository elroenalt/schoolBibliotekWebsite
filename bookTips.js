
const bookTipDisplay = {
    container: document.querySelector('#bookTipDisplay'),
    title: document.querySelector('#title'),
    author: document.querySelector('#author'),
    agerange: document.querySelector('#age-range'),
    rezession: document.querySelector('#rezession'),
    genre: document.querySelector('#genre'),
    IMG: document.querySelector('#IMG')
}
const JsonFile = 'bookTips.json';
let bookTips = []; 
let TipIndex = -1;
let CARDS_PER_VIEW = 3; 
let bookTipsManager

fetchJsonFiles();

function updateArrowVisibility() {
    const maxIndex = bookTips.length - CARDS_PER_VIEW;
        
    if (TipIndex <= 0) {
        arrowLeft.style.display = 'none';
    } else {
        arrowLeft.style.display = 'block';
    }

    if (TipIndex >= maxIndex) {
        arrowRight.style.display = 'none';
    } else {
        arrowRight.style.display = 'block';
    }
}
// manages Book tips
class BookTipsManager {
    constructor() {
        // display logic
        this.tipsPerView = isMobileView() ? 1 : 3
        this.updateTipsPerView
        this.firstIndex = 0
        this.displays = []
        for(let i = this.firstIndex; i < 3; i++) {
            this.displays.push(new BookTipDisplay(i))
        }
        // arrow logic
        this.LeftArrow = document.querySelector('#arrowLeft') 
        this.RightArrow = document.querySelector('#arrowRight')
        this.LeftArrow.addEventListener('click', () => this.changeBookTips(-1))
        this.RightArrow.addEventListener('click', () => this.changeBookTips(1))
        this.updateTipsPerView()
    }
    updateTipsPerView() {
        const MobileView = isMobileView()
        this.tipsPerView = MobileView ? 1 : 3
        let display = 'block'
        if(MobileView) {
            display = 'none'
        }
        for(let i = 0; i < 3; i++) {
            this.displays[i].display.Container.style.display = display
        }
        TipIndex = -1;  
        this.updateArrowVisibility()
        this.changeBookTips(1)
        this.changeBookTips(-1)
        
    }
    updateArrowVisibility() {
        if(this.firstIndex + this.tipsPerView >= bookTips.length) {
            this.RightArrow.style.display = 'none'
        }else {
            this.RightArrow.style.display = 'block'
        }
        if(this.firstIndex <= 0) {
            this.LeftArrow.style.display = 'none'
        }else {
            this.LeftArrow.style.display = 'block'
        }
    }
    changeBookTips(by) {
        let Index = this.firstIndex + by
        this.firstIndex = Index
        let cards = 0
        if(Index < 0 || Index >= bookTips.length) return
        for(let display of this.displays) {
            if(cards >= this.tipsPerView || Index >= bookTips.length) {
                display.display.Container.style.display = 'none'
                continue
            }else {
                display.display.Container.style.display = 'block'
            }
            display.changeContent(Index)
            Index++;
            cards++;
        }
        this.updateArrowVisibility()
    }

}

// Book tips 
class BookTipDisplay {
    constructor(index) {
        this.curIndex = 0
        this.onScreen = true
        this.display = {
            Container: document.querySelector(`#bookTip${index}`), 
            Title: document.querySelector(`#bookTip${index}Title`), 
            IMG: document.querySelector(`#bookTip${index}IMG`), 
            Author: document.querySelector(`#bookTip${index}Author`),
            AgeRange: document.querySelector(`#bookTip${index}AgeRange`),
            Genre: document.querySelector(`#bookTip${index}Genre`),
            By: document.querySelector(`#bookTip${index}By`),
        }
        this.display.Container.addEventListener('click', () => {
            openBookTip(this.curIndex)
        })
        this.changeContent(index)
    }
    changeContent(newIndex) {
        this.curIndex = newIndex
        const tip = bookTips[this.curIndex]
        this.display.Title.textContent = tip.title
        this.display.IMG.src = tip.image
        this.display.Author.textContent = "Author: " + tip.author
        this.display.AgeRange.textContent = "Alterempfählung: " + tip.minAge
        this.display.Genre.textContent = "Genre: " + tip.genre
        this.display.By.textContent = "Rezesion von: " +  tip.by
    }
    
}

// opens and loads the book Tip screen
function openBookTip(tip) {
    if(tip < 0 || tip > bookTips.length) {
        return false
    }
    console.log(tip)
    const bookTip = bookTips[tip]
    console.log(bookTip.title)
    bookTipDisplay.title.textContent = bookTip.title
    bookTipDisplay.author.textContent = 'Author: '+ bookTip.author
    bookTipDisplay.genre.textContent = 'Genre: ' + bookTip.genre
    bookTipDisplay.agerange.textContent = 'Alterempfählung: '+ bookTip.ageRange
    bookTipDisplay.rezession.textContent = bookTip.rezension
    bookTipDisplay.IMG.src = bookTip.image
    bookTipDisplay.container.style.display = 'block'
}

// checks if your phone schould display mobile view
function isMobileView() {
    if (window.matchMedia("(max-width: 768px)").matches) {
        return true
    }else {
        return false
    }
}

// loads the files for book tips
async function fetchJsonFiles() {
    try {
        const response = await fetch(JsonFile);
        if (!response.ok) {
            throw new Error('Error! while loading ' + JsonFile + ' status: ' + response.status);
        }
        const data = await response.json();
        bookTips = data;
    } catch (error) {
        console.error("Error while starting:", error);
        return; 
    }
    bookTipsManager = new BookTipsManager()
} 

document.querySelector('#closeBookTip').addEventListener('click',()=> {
    bookTipDisplay.container.style.display = 'none'
})

// check if the user resized theyre screen
window.addEventListener('resize', () => {
    bookTipsManager.updateTipsPerView()
    
});

