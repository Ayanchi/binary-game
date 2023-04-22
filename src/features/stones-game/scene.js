import Phaser from 'phaser'
import {startGame} from './actions.js'

const width = window.screen.width < 640 ? window.screen.width : 640
const height = window.screen.height < 640 ? window.screen.height : 640

export class MainScene extends Phaser.Scene {
  constructor() {
    super()
    this.score = 0
  }

  preload() {
    this.load.image('cookie', '/src/assets/stones-game/img.png')
  }

  create() {
    const text = this.add.text(10, 10, '', {font: '16px Courier', fill: '#ff0000'})
    this.cookie = this.add.image(width / 2, height / 3, 'cookie', 'assets/cookie.png')
    this.cookieText = this.add.text(0, 0, '0', {font: 'bold 28px Courier', fill: '#000000'})
    this.startText = this.add.text(width / 2, height / 2.5 + 65, '0', {font: '24px Courier', fill: '#ff0000'})

    this.cookie.setScale(0.1)
    Phaser.Display.Align.In.Center(this.cookieText, this.cookie)
    text.setText(['Score: ' + this.score])

    startGame(this)
  }
}
