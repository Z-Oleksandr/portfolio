import Thrott from "./throttle.js"

const throttle = new Thrott(document.getElementById("thrott"))
let contrl = document.getElementById("contrl")
let startStop = document.getElementById("startstop")
let timeValue = null
let handOff = document.getElementById('handId')
let lights = document.getElementById('lightsbutton')
let lightsIcon = document.getElementById('iconSize')
let numbers = document.getElementById('num')
let speedoLight = document.getElementById('backLight')

let l = document.getElementById('b1')
let l2 = document.getElementById('b2')
let l3 = document.getElementById('b3')

    document.addEventListener("mousemove", e => {
                throttle.position = (e.y / window.innerHeight) * 100
    })



let r = document.getElementById('onLight')
let throttleControl = document.getElementById("thrott")

function setOnLight() {
    let rs = getComputedStyle(r)
    r.style.setProperty('--color', '#1bb339')
}

function setOffLight() {
    r.style.setProperty('--color', '#db1a1a')
}

function activateContrl() {
    if (l2.classList.contains('off')) {
        return
    } else if (throttleControl.classList.contains('active') == false) {
        throttleControl.classList.add('active')
        setOnLight()
    } else if (throttleControl.classList.contains('active') == true) {
        throttleControl.classList.remove('active')
        setOffLight()
    }
}

contrl.addEventListener('click', activateContrl)

startStop.addEventListener('click', backlight)


function backlight() {
    if (l.classList.contains('active') == false) {
        setTimeout(backlightOn, 250)
    } else if (l.classList.contains('active') == true) {
        setTimeout(backLightOff, 250)
    }
}

function backlightOn() {
    l.classList.add('active')
    l2.classList.remove('off')
    l.style.setProperty('--textOn', '#c71616')
    l2.style.setProperty('--textOn', '#c71616')
    l3.style.setProperty('--textOn', '#c71616')
}

function backLightOff() {
    l.classList.remove('active')
    l2.classList.add('off')
    l.style.setProperty('--textOn', '#9fa1a1')
    l2.style.setProperty('--textOn', '#9fa1a1')
    l3.style.setProperty('--textOn', '#9fa1a1')
}

handOff.style.transitionDuration = '3s'

function idle2() {
    if (l2.classList.contains('off') == false) {
        handOff.style.setProperty('--rotation', -75)

    } else if (l2.classList.contains('off') == true) {
        handOff.style.setProperty('--rotation', -88)
        lights.classList.remove('clicked')
    }
}

function idle() {
    setTimeout(idle2, 260)
    setTimeout(ignitionOff => {
        if (lights.classList.contains('clicked') == false) {
            lights.style.setProperty('--sizeButt', 90)
            lights.style.setProperty('--posButt', 0)
            lightsIcon.style.setProperty('--sizeAdjust', 0)
        }
        if (lights.classList.contains('clicked') == false) {
            lightsIcon.style.setProperty('--lightOn', 'black')
            setTimeout(OnN => {numbers.style.setProperty('--lightOn', 'black')}, 100)
            setTimeout(On => {speedoLight.style.setProperty('--display', 0)}, 100)
            setTimeout(On => {handOff.style.setProperty('--lightColor', 'black')}, 0)
        }
    }, 260)
}

startStop.addEventListener('click', idle)

lights.addEventListener('click', lightsClick)

function lightsClick() {
    buttSize()
    lightsOn()
}

function buttSize() {
    if (lights.classList.contains('clicked') == false) {
        lights.classList.add('clicked')
        lights.style.setProperty('--sizeButt', 80)
        lights.style.setProperty('--posButt', 5)
        lightsIcon.style.setProperty('--sizeAdjust', 5)
    } else if (lights.classList.contains('clicked') == true) {
        lights.classList.remove('clicked')
        lights.style.setProperty('--sizeButt', 90)
        lights.style.setProperty('--posButt', 0)
        lightsIcon.style.setProperty('--sizeAdjust', 0)
    }
}

function lightsOn() {
    if (lights.classList.contains('clicked') == true) {
        lightsIcon.style.setProperty('--lightOn', '#b33e04')
        setTimeout(OnN => {numbers.style.setProperty('--lightOn', '#b33e04')}, 180)
        setTimeout(On => {speedoLight.style.setProperty('--display', 0.5)}, 250)
        setTimeout(On => {handOff.style.setProperty('--lightColor', '#b33e04')}, 0)
    } else if (lights.classList.contains('clicked') == false) {
        lightsIcon.style.setProperty('--lightOn', 'black')
        setTimeout(OnN => {numbers.style.setProperty('--lightOn', 'black')}, 100)
        setTimeout(On => {speedoLight.style.setProperty('--display', 0)}, 100)
        setTimeout(On => {handOff.style.setProperty('--lightColor', 'black')}, 0)
    }
}
