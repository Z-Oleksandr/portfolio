//localStorage
let savedListItems = JSON.parse(localStorage.getItem('savedListItems')) || []
let savedChapters = JSON.parse(localStorage.getItem('savedChapters')) || []
let savedChapterLinks = JSON.parse(localStorage.getItem('savedChapterLinks')) || []
let chapterCount = 0
let savedChapterCount = JSON.parse(localStorage.getItem('SavedChapterCount')) || []
console.log('savedChapterCount ' + savedChapterCount)
console.log('savedChapters ' + savedChapters)

//List
const list0 = document.getElementById('list0')

//Buttons
const clearLS = document.getElementById('clearAll')
const initiate = document.getElementById('inter1')

//Cards
const card1 = document.getElementById('card1')
const card2 = document.getElementById('card2')
const card3 = document.getElementById('card3')
const card4 = document.getElementById('card4')
const card5 = document.getElementById('card5')

//Forms
const form2 = document.getElementById('form2')
const form3 = document.getElementById('form3')
const form4 = document.getElementById('form4')
const form5 = document.getElementById('form5')

//Inputs
const input2 = document.getElementById('listItem')
const input3 = document.getElementById('chapter')
const input4 = document.getElementById('chapterLink')
const input5 = document.getElementById('subListItem')

//main

loadSavedListItems()
loadSavedChapters()

//First Card - Begin
initiate.addEventListener('click', function() {
    card1.classList.add('hidden')
    card2.classList.remove('hidden')
})

//Second Card - create list item
form2.addEventListener('submit', (event) => {
    event.preventDefault()

    let formData = new FormData(form2)
    let listItem = formData.get('listItem')

    input2.value = ""
    card2.classList.add('hidden')
    card3.classList.remove('hidden')
    addNewListItem(listItem)
})

function addNewListItem(listItem) {
    upntilldiv()

    let thisDiv = document.getElementById('chapterCount' + chapterCount)
    const newP = document.createElement('p')
    newP.classList.add('t10')
    newP.textContent = listItem
    thisDiv.appendChild(newP)

    savedListItems.push(listItem)
    localStorage.setItem('savedListItems', JSON.stringify(savedListItems))
}


//Third Card - add chapters
    form3.addEventListener('submit', (event) => {
    event.preventDefault()

    let formData = new FormData(form3)
    let chapter = formData.get('chapter')

    input3.value = ""
    addChapter(chapter)
})

function addChapter(chapter) {
    let thisDiv = document.getElementById('chapterCount' + chapterCount)

    savedChapterCount.push(chapterCount)
    localStorage.setItem('savedChapterCount', JSON.stringify(savedChapterCount))
    console.log('SCC' + savedChapterCount)

    const newA = document.createElement('a')
    thisDiv.appendChild(newA)

    const newP = document.createElement('p')
    newP.classList.add('t10')
    newP.textContent = ' [' + chapter + '] '
    newA.appendChild(newP)

    savedChapters.push(chapter)
    localStorage.setItem('savedChapters', JSON.stringify(savedChapters))
}

function loadSavedListItems() {
    for (let i = 0; i < savedListItems.length; i++) {
        revive(savedListItems[i])
    }
}

function loadSavedChapters() {
    for (let i = 0; i < savedChapters.length; i++) {
        reviveChapters(i)
    }
}

function reviveChapters(j) {
    for (let i = 1; i < savedChapterCount.length; i++) {
        let thisDiv = document.getElementById('chapterCount' + savedChapterCount[i])

        const newA = document.createElement('a')
        thisDiv.appendChild(newA)

        const newP = document.createElement('p')
        newP.classList.add('t10')
        newP.textContent = savedChapters[j]
        newA.appendChild(newP)
    }
    // chapterCount = savedChapterCount.length
}

function revive(savedListItem) {
    upntilldiv()
    let thisDiv = document.getElementById('chapterCount' + chapterCount)

    const newP = document.createElement('p')
    newP.classList.add('t10')
    newP.textContent = savedListItem
    thisDiv.appendChild(newP)
}

//helping functions

clearLS.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
    chapterCount = 0
})

function upntilldiv() {
    const newLi = document.createElement('li')
    newLi.classList.add('li0')
    list0.appendChild(newLi)

    const newDiv = document.createElement('div')
    newDiv.classList.add('linked')

    chapterCount++
    // savedChapterCount.push(chapterCount)
    // localStorage.setItem('savedChapterCount', JSON.stringify(chapterCount))

    newDiv.setAttribute('id', 'chapterCount' + chapterCount)
    newLi.appendChild(newDiv)
}