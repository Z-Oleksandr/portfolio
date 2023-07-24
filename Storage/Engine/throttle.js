import Speed from "./speedo.js"

const throttleControl = document.getElementById("thrott") 
throttleControl.style.transitionTimingFunction = "linear"

let l2 = document.getElementById('b2')

export default class Thrott {

    constructor(throttElem) {
        this.throttElem = throttElem
        this.reset()
    }

    get position() {
        return parseFloat(
            getComputedStyle(this.throttElem).getPropertyValue("--gas")
        )
    }

    set position(value) {
        const speedHand = new Speed(document.getElementById("handId"))

        let indicator = value


        if (throttleControl.classList.contains('active') == true) {
            if (value <= 86 && value >= 26){
                this.throttElem.style.setProperty("--gas", indicator)
            } else if (value > 86) {
                this.throttElem.style.setProperty("--gas", 86)
            } else if (value < 26) {
               this.throttElem.style.setProperty("--gas", 26)
            }
            speedHand.positionS = indicator
        }
    }

    rect() {
        return this.throttElem.getBoundingClientRect()
    }

    reset() {
        this.position = 50
    }
}