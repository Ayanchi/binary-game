import Phaser from 'phaser'
import {MainScene} from './mainScene.js'

const width = window.screen.width < 640 ? window.screen.width : 640
const height = window.screen.height < 640 ? window.screen.height : 640

export const config = {
  width: width, // Ширина
  height: height, // Высота
  pixelArt: true,
  // backgroundColor: '#4488AA' // Цвет фона
  type: Phaser.AUTO, // Автоматический выбор холста
  parent: 'phaser', // Указываем id блока игры
  scene: [MainScene], // Добавляем основную сцену
  scale: {
    zoom: 1 // масштаб
  },
  physics: {
    // Физика
    default: 'matter',
    matter: {
      debug: true,
      gravity: {y: 0} // - физики нет
    }
  }
}
