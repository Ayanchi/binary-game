import Phaser from 'phaser'
import {MainScene} from './scene.js'

const width = window.screen.width < 640 ? window.screen.width : 640
const height = window.screen.height < 640 ? window.screen.height : 640

export const config = {
  width: width, // Ширина
  height: height, // Высота
  backgroundColor: '#333333', // Цвет фона
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
