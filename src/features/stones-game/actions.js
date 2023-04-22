import Phaser from 'phaser'
import {randomNumbers} from './lib.js'

let circleAnswers, ceilCookie, startCookie, answers
let isPlayer = true
const circle = [],
  width = window.screen.width < 640 ? window.screen.width : 640,
  ration = width / 640
let circleRadius = 40 * ration
let level = 1
const levels = [
  {
    minAmount: 1,
    maxAmount: 3,
    amountAnswer: 2
  }
]
// arr[i]=level
function playerWin() {
  alert('You won the game, congratulations!')
  location.reload()
}

function computerWin() {
  alert('You louser')
  location.reload()
}

function move(answer, scene, person = 'player') {
  isPlayer = person === 'player' ? false : true
  startCookie += answer
  scene.startText.setText(startCookie)

  console.log(startCookie)
  if (startCookie >= ceilCookie) {
    person === 'player' ? playerWin() : computerWin()
    console.log(startCookie)
    return
  }
}

function computerMove(scene) {
  let moveComp = false
  for (let i = 0; i < circleAnswers.length; i++)
    if (answers[startCookie + circleAnswers[i]] === 'fail' || startCookie + circleAnswers[i] >= ceilCookie) {
      move(circleAnswers[i], scene, 'computer')
      moveComp = true
      break
    }

  if (!moveComp) {
    let rand = randomNumbers(0, circleAnswers.length - 1)[0]
    move(circleAnswers[rand], scene, 'computer')
  }
}

function drawCircle(scene, i) {
  circle[i] = scene.add.circle(
    width / circleAnswers.length + circleRadius * 2 * i + (circleRadius / 2) * i - circleRadius,
    415,
    circleRadius,
    0x6666ff
  )
  let text = scene.add.text(0, 0, '+' + circleAnswers[i], {fontSize: '20px', color: 'white', fontFamily: 'Arial'})

  Phaser.Display.Align.In.Center(text, circle[i])

  circle[i].setInteractive()
  circle[i].on('pointerdown', function () {
    if (isPlayer) {
      move(circleAnswers[i], scene)
      setTimeout(computerMove, 1000, scene)
    }
  })
}

function calculatePositions() {
  let pos = []
  for (let i = ceilCookie - 1; i >= 0; i--) {
    let pointState = 'fail'
    for (let j = 0; j < circleAnswers.length; j++) {
      let step = circleAnswers[j] + i
      if (step >= ceilCookie || pos[step] === 'fail') pointState = 'success'
    }
    pos[i] = pointState
  }

  return pos
}

export function startGame(scene) {
  circleAnswers = randomNumbers(
    levels[level - 1].minAmount,
    levels[level - 1].maxAmount,
    levels[level - 1].amountAnswer
  )
  ceilCookie = randomNumbers(20, 30)[0]

  answers = calculatePositions()
  for (let i = randomNumbers(1, 3)[0]; i < ceilCookie; i++) {
    if (answers[i] === 'success') {
      startCookie = i
      break
    }
  }

  scene.startText.setText(startCookie)
  scene.cookieText.setText(ceilCookie)
  Phaser.Display.Align.In.Center(scene.cookieText, scene.cookie)

  for (let i = 0; i < circleAnswers.length; i++) {
    // Нужно будет посчитать выравнивание
    drawCircle(scene, i)
  }
}
