import Phaser from 'phaser'
import {generateBinary} from './action'
// import {randomInt} from './randint.js'

const width = window.screen.width < 640 ? window.screen.width : 640
const height = window.screen.height < 640 ? window.screen.height : 640

export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene')
    this.score = [0]
    this.level = 1
    this.activeGame = 'noactive'
  }
  preload() {
    this.load.image('bear1', '/src/assets/binary-game/b1.jpg')
    this.load.image('bear2', '/src/assets/binary-game/b2.jpg')
    this.load.image('bear3', '/src/assets/binary-game/b3.jpg')
    this.load.image('bear4', '/src/assets/binary-game/b4.jpg')
    this.load.atlas('pink', '/src/assets/binary-game/pink.png', '/src/assets/binary-game/pink_atlas.json')
    this.load.animation('pink_anim', '/src/assets/binary-game/pink_anim.json')
    this.load.image('cartoon', '/src/assets/binary-game/cartoon.png')
  }

  create() {
    this.add.image(width / 2, height / 2, 'cartoon')
    this.beer = ['bear1', 'bear2', 'bear3', 'bear4']
    this.timer = this.add.text(width / 2 + 100, 10, '0', {font: 'bold 28px Courier', fill: '#'})
    this.examplesText = this.add.text(width / 2, height / 3, '4', {font: 'bold 28px Courier'})
    this.system = this.add.text(width / 2 - 150, height / 2 + 210, '', {font: 'bold 28px Courier', fill: '#'})
    Phaser.Actions.Shuffle(this.beer)
    this.imgAnswers = []
    this.textAnswers = []
    this.levels = []
  }

  update() {
    if (this.activeGame == 'noactive') {
      this.activeGame = 'active'
      this.loadBinary = generateBinary(this.imgAnswers, this.textAnswers, this)
    }
  }
}
