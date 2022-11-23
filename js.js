const score = document.querySelector('.all-points')
const optionArea = document.querySelector('.option')
const changeSizeArea = document.querySelector('.change-size')
const fightArea = document.querySelector('.fight')
const resultInfo = document.querySelector('.result-info')

const allBtn = document.querySelectorAll('.button')
const playAgainBtn = document.querySelector('.play-again-btn')

let points = parseInt(window.localStorage.getItem('score'))

const createRandomPick = () => {
    const random = Math.floor(Math.random()*3 + 1)
    let houseBtn = document.createElement('button')

    switch(random){
        case 1: 
            houseBtn.setAttribute('id', 'scissors')
            houseBtn.classList.add('button', 'button-scissors')
            houseBtn.innerHTML = `
            <div class="button-image-container">
                <img src="images/icon-scissors.svg" alt="scissors">
            </div>
            `
        break;
        case 2:
            houseBtn.setAttribute('id', 'paper')
            houseBtn.classList.add('button', 'button-paper')
            houseBtn.innerHTML = `
            <div class="button-image-container">
                <img src="images/icon-paper.svg" alt="paper">
            </div>
            `
        break;
        case 3:
            houseBtn.setAttribute('id', 'rock')
            houseBtn.classList.add('button', 'button-rock')
            houseBtn.innerHTML = `
            <div class="button-image-container">
                <img src="images/icon-rock.svg" alt="rock">
            </div>
            `
        break;
        default: 
            houseBtn.classList.add('button', 'button-scissors')
            houseBtn.innerHTML = `
            <div class="button-image-container">
                <img src="images/icon-scissors.svg" alt="scissors">
            </div>
            `
    }

    return houseBtn
}

const showPoints = () => {
    if(window.localStorage.getItem('score') == null){
        window.localStorage.setItem('score', 0)
    }
    score.innerHTML = window.localStorage.getItem('score')
}

const addPoint = (resultInfo) => {
    if(resultInfo.textContent == 'you win'){
        points++
        window.localStorage.setItem('score', points)
        showPoints()
    }
}

const toggleDisplay = () => {
    optionArea.classList.toggle('dn')
    fightArea.classList.toggle('dn')
}

const showResult = (myPick, housePick) => {

    switch(myPick.id){
        case 'scissors':
            if(housePick.id == 'paper'){
                resultInfo.textContent = 'you win'
            }else if(housePick.id === 'rock'){
                resultInfo.textContent = 'you lose'
            }else{
                resultInfo.textContent = 'dead-heat'
            }
        break;
        case 'paper':
            if(housePick.id == 'rock'){
                resultInfo.textContent = 'you win'
            }else if(housePick.id === 'scissors'){
                resultInfo.textContent = 'you lose'
            }else{
                resultInfo.textContent = 'dead-heat'
            }
        break;
        case 'rock':
            if(housePick.id == 'scissors'){
                resultInfo.textContent = 'you win'
            }else if(housePick.id === 'paper'){
                resultInfo.textContent = 'you lose'
            }else{
                resultInfo.textContent = 'dead-heat'
            }
        break;
    }

    changeSizeArea.classList.add('change-size-container')
    addPoint(resultInfo)
}

const showPick = (myPick) => {
    const myPickArea = document.querySelector('.my-pick')
    const randomPickArea = document.querySelector('.house-pick')
    const housePick = createRandomPick()

    myPickArea.append(myPick)

    setTimeout(() => {
        showResult(myPick, housePick)
     },1500)

    setTimeout(() => {
        document.querySelector('.house-pick-shadow').style.display = 'none'
        randomPickArea.append(housePick)
    },1000)
}

showPoints()
allBtn.forEach(button => button.addEventListener('click', () => {
    const myPick = button

    toggleDisplay()
    showPick(myPick)
}))

playAgainBtn.addEventListener('click', () => {
    window.location.reload()
})