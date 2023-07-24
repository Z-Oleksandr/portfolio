//Buttons
let puff = document.getElementById("haveAPuff")
let dayChange = document.getElementById("changeDay")
let cleanIqos = document.getElementById("cleanIqos")

//Cancer
let cancerShow = document.getElementById("cancer")

//Numbers src
let puffed = document.getElementById("numSmo")
let puffedTot = document.getElementById("numSmoTot")

//Numbers counting
let count = 0
let cleanCount = 0
let totalCount = 0

//Notification bar
let notBar = document.getElementById("topNot")



function showNotBar() {
    notBar.style.setProperty('--notBarShow', 'inline')
}

function hideNotBar() {
    notBar.style.setProperty('--notBarShow', 'none')
    notBar.style.setProperty('--notBarColor', '#a6550f')
    notBar.style.setProperty('--firstNot', 'inline')
    notBar.style.setProperty('--secondNot', 'none')
}

function redNotBar() {
    notBar.style.setProperty('--notBarColor', '#9c0000')
    notBar.style.setProperty('--firstNot', 'none')
    notBar.style.setProperty('--secondNot', 'inline')
}

function cancerIs() {
    cancerShow.style.setProperty('--cancerIs', 'inline')
}

puff.addEventListener('click', function() {
    count += 1
    cleanCount += 1
    totalCount += 1
    puffed.innerHTML = count
    puffedTot.innerHTML = totalCount
    if (cleanCount == 15) {
        showNotBar()
    } else if (cleanCount == 20) {
        redNotBar()
    } else if (count == 100) {
        cancerIs()
    }
    console.log(cleanCount)
})

dayChange.addEventListener('click', function() {
    count = 0
    puffed.innerHTML = count
})

cleanIqos.addEventListener('click', function() {
    cleanCount = 0
    hideNotBar()
})


