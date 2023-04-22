import {randomNumbers} from '../stones-game/lib.js'
import {randomInt} from './randint.js'
import Phaser from 'phaser'

const width = window.screen.width < 640 ? window.screen.width : 640
const height = window.screen.height < 640 ? window.screen.height : 640

export const levels = [
  {
    time: 20,
    system: [2],
    range: [0, 20],
    answers: 4
  },
  {
    time: 30,
    system: [8],
    range: [0, 30],
    answers: 2
  },
  {
    time: 9,
    system: [10],
    range: [0, 40],
    answers: 4
  },
  {
    time: 25,
    system: [2, 4, 8, 16],
    range: [0, 60],
    answers: 3
  }
]

let doRange, doBinary

export function generate(currentlevel, scene) {
  let level = levels[currentlevel - 1]

  doRange = randomNumbers(level.range[0], level.range[1])[0]
  doBinary = level.system[randomNumbers(0, level.system.length - 1)]
  let calc = Number(doRange).toString(doBinary)
  scene.examplesText.setText(doRange)

  scene.system.setText('your system:' + doBinary)

  return {
    answer: calc,
    doRange: doRange,
    doBinary: doBinary,
    calcTwo: randomInt(level.range[0], level.range[1], level.answers - 1, doRange, doBinary)
  }
}

function col(level, timer, scene, imgAnswers, textAnswers) {
  let seconds = levels[level - 1].time
  timer.setText('TIME:' + seconds)
  let timeGame = setInterval(function timeoftimer() {
    if (seconds <= 0) {
      clearInterval(timeGame)
      return
    }
    seconds--
    if (seconds == 0) {
      scene.level++
      imgAnswers.forEach(element => {
        element.destroy()
      })
      textAnswers.forEach(element => {
        element.destroy()
      })

      scene.level = 1

      scene.activeGame = 'noactive'
      console.log('d')
    }
    timer.setText('TIME:' + seconds)
  }, 1000)
  return {
    timeGame: timeGame,
    seconds: seconds
  }
}

let pinkSprite = [],
  pinklevels = []

export function pinkCircle(scene) {
  let pinkLel = scene.score

  if (pinkLel <= 3) {
    for (let i = 1; i <= pinkLel; i++) {
      if (i == pinkLel) {
        pinkSprite[i] = scene.add
          .sprite((width / 9) * i - 20, 25, 'pink')
          .play('go')
          .setScale(0.2)
        pinklevels[i] = scene.add.text(20, 20, '', {font: '16px Courier', fill: '#'})
        pinklevels[i].setText([i])
        Phaser.Display.Align.In.Center(pinklevels[i], pinkSprite[i])
        continue
      }
    }
  }
  console.log(pinklevels)
}

export function generateBinary(imgAnswers, textAnswers, scene) {
  scene.data = generate(scene.level, scene)
  scene.dataGame = scene.data
  scene.answers = scene.data.calcTwo
  scene.answers.push(scene.data.answer)
  Phaser.Actions.Shuffle(scene.answers)
  console.log(scene.data.answer)
  scene.circlePink = pinkCircle(scene)
  // console.log(scene.circlePink.pink)

  for (let i = 0; i < levels[scene.level - 1].answers; i++) {
    imgAnswers[i] = scene.add
      .image(
        (width / levels[scene.level - 1].answers) * i + width / levels[scene.level - 1].answers / 2,
        height / 2 + 40,
        scene.beer[i]
      )
      .setScale(0.6)
    textAnswers[i] = scene.add.text(width / 2, height / 3, '', {font: 'bold 28px Courier'})
    textAnswers[i].setText(scene.answers[i])
    Phaser.Display.Align.In.Center(textAnswers[i], imgAnswers[i])
    imgAnswers[i].setInteractive()
    imgAnswers[i].on('pointerdown', function () {
      if (scene.answers[i] === scene.dataGame.answer) {
        scene.score++
        if (scene.score == 4) {
          pinkSprite.forEach(element => {
            element.destroy()
          })
          pinklevels.forEach(element => {
            element.destroy()
          })
          scene.score = 0
          scene.level++
        }
        imgAnswers.forEach(element => {
          element.destroy()
        })
        textAnswers.forEach(element => {
          element.destroy()
        })

        if (scene.level == 5) {
          alert('МОЛОДЕЦ !!!')
          scene.level = 1
        }
        clearInterval(scene.colculator.timeGame)
        scene.activeGame = 'noactive'
      } else {
        scene.level = 1

        imgAnswers.forEach(element => {
          element.destroy()
        })
        textAnswers.forEach(element => {
          element.destroy()
        })
        clearInterval(scene.colculator.timeGame)
        scene.activeGame = 'noactive'
      }
    })
  }
  scene.colculator = col(scene.level, scene.timer, scene, imgAnswers, textAnswers)
}
