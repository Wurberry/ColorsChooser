const arrayColors = ['red','blue','black','green']
const arrayColorsText = ['Красный','Синий','Черный','Зеленый']
// -----------------------------------------
const givenAnswerScreen = document.querySelector('.givenAnswer')

// -----------------------------------------
const tutScreen = document.querySelector('#tutorialScreen')

// -----------------------------------------
const startScreen = document.querySelector('#startScreen')
const startBtn = document.querySelector('.startBtn')
const tutBtn = document.querySelector('.tutBtn')
const numbStart = document.querySelector('.numberInAnswerCircle')
// -----------------------------------------
const gameScreen = document.querySelector('#gameScreen')
const infoBlock = document.querySelector('.gbInfoBlock')
const cardBlocks = document.querySelector('.gbGame')
const confirmBtnsBlocks = document.querySelector('.gbConfirmBtns')
const boxCardValue = document.querySelector('.gbcValueCard')
const boxCardColor = document.querySelector('.gbcColorCard')
const btnYes = document.querySelector('.gameBtnYes')
const btnNo = document.querySelector('.gameBtnNo')
const scoreText = document.querySelector('.scoreText')
const bonusText = document.querySelector('.bonusXText')
const timeText = document.querySelector('.timeText')
// -----------------------------------------

const minAddScore = 200
let score = 0
let bonus = 1
let bonusSeries = 0
let time = 61
let timeNumbScreen = 3

// -------------- main ----------------

startBtn.addEventListener('click', (e) => {
    startScreen.classList.add('up')
    givenAnswerScreen.style.opacity = 1
    infoBlock.style.opacity = 0
    cardBlocks.style.opacity = 0
    confirmBtnsBlocks.style.opacity = 0
    const numbInt = setInterval(() => {
        numbStart.textContent = '' + --timeNumbScreen
        if (timeNumbScreen === 0){
            clearInterval(numbInt)
            givenAnswerScreen.style.opacity = 0
            givenAnswerScreen.style.zIndex = 0
            infoBlock.style.opacity = 1
            cardBlocks.style.opacity = 1
            confirmBtnsBlocks.style.opacity = 1
        }
    }, 1000)

    const gameTimer = setTimeout(() => {
        createCard()

    }, 3000)

    const timeController = setTimeout(() => {
        let intervalGame = setInterval(() => {
            if (time>0){
                console.log(--time)
                setTime(time)
            }
            if (time === 0){
                clearInterval(intervalGame)
            }
        }, 1000)
    }, 2000)



})

tutBtn.addEventListener('click', (e) => {
    tutScreen.classList.remove('up')
})

btnYes.addEventListener('click', (e) => {
    checkEquals(1)
    changeText()
})

btnNo.addEventListener('click', (e) => {
    checkEquals(0)
    changeText()
})

// ------------- func ---------------

function createCard(){
    const cardColor = document.createElement("div")
    cardColor.classList.add('gbcColor')
    cardColor.classList.add('card')

    const cardValue = document.createElement("div")
    cardValue.classList.add('gbcValue')
    cardValue.classList.add('card')

    const text = document.createElement('div')
    text.classList.add('textInCard')
    text.textContent = ''

    const texta = document.createElement('div')
    texta.classList.add('textInCard')
    texta.textContent = ''

    boxCardColor.append(cardColor)
    boxCardValue.append(cardValue)

    cardColor.append(text)
    cardValue.append(texta)

    changeText()
}

function changeText(){
    const text = document.querySelectorAll('.textInCard')
    text.forEach((element) => {
        element.textContent = arrayColorsText[getRandomNumber(0, arrayColorsText.length - 1)]
        element.style.color = arrayColors[getRandomNumber(0,arrayColors.length-1)]
        // console.log(element)
    })
}

function checkEquals(choice){
    const texts = document.querySelectorAll('.textInCard')
    // console.log(texts[0].textContent, texts[1].style.color)

    if (choice === 1 && langChanger(texts[0].textContent) === texts[1].style.color){
        scoreAdding(1)
    } else if (choice === 0 && langChanger(texts[0].textContent) !== texts[1].style.color){
        scoreAdding(1)
    } else if (choice === 1 && langChanger(texts[0].textContent) !== texts[1].style.color){
        scoreAdding(0)
    } else if (choice === 0 && langChanger(texts[0].textContent) === texts[1].style.color){
        scoreAdding(0)
    }
}

function scoreAdding(ch){
    if (ch === 1){
        ++bonusSeries
        if (bonusSeries % 4 === 0 && bonus < 5) {
            ++bonus
        }
        score += minAddScore * bonus
    }
    if (ch === 0){
        bonusSeries = 0
        bonus = 1
    }
    scoreText.textContent = score
    bonusText.textContent = 'x' + bonus

    fillBonusCircles()
}

function fillBonusCircles(){
    const bonusCircles = document.querySelectorAll('.bonusCircle')

    bonusCircles.forEach((element) => {
        if (element.id <= bonus){
            element.classList.add('bCFill')
        } else {
            element.classList.remove('bCFill')
        }
    })


}

function setTime(time){
    if (time > 600){
        if (time % 60 > 9){
            timeText.textContent = Math.floor(time / 60) + ':' + time % 60
        } else {
            timeText.textContent = Math.floor(time / 60) + ':0' + time % 60
        }
    }

    if (time > 60 && time < 600){
        if (time % 60 > 9){
            timeText.textContent = '0' + Math.floor(time / 60) + ':' + time % 60
        } else {
            timeText.textContent = '0' + Math.floor(time / 60) + ':0' + time % 60
        }
    }

    if (time <= 60){
        if (time % 60 > 9){
            timeText.textContent = '00:' + time % 60
        } else {
            timeText.textContent = '00:0' + time % 60
        }
    }

    if (time === 60){
        timeText.textContent = '01:00'
    }


}


function langChanger(str){
    switch (str){
        case 'Красный':
            return 'red'
        case 'Синий':
            return 'blue'
        case 'Черный':
            return 'black'
        case 'Зеленый':
            return 'green'
    }
}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min)
}