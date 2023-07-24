let l2 = document.getElementById('b2')
let handOff = document.getElementById('handId')
let startStop = document.getElementById("startstop")



export default class Speed {
    constructor(handElem) {
        this.handElem = handElem
        this.reset()
    }

    get positionS() {
        return parseFloat(
            getComputedStyle(this.handElem).getPropertyValue("--rotation")
        )
    }

    set positionS(value) {
        let adjust = ((value - 56) * -2.65) + 4
        
        if (adjust >= -75 && adjust <= 81) {
            this.handElem.style.setProperty("--rotation", adjust)
        } else if (adjust < -75) {
            this.handElem.style.setProperty("--rotation", -75)
        } else if (adjust > 81) {
            this.handElem.style.setProperty("--rotation", 81)
        }
    }


    reset() {
        this.position = -88
    }
}


