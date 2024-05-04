import { Color } from 'three'
import { createRef } from 'react'
import { create } from 'zustand'

const useStore = create((set, get) => {

  return {
    set,
    get,
    gameStatus: 0,
    collidedCoins: [],
    score: 0,
    level: 0,
    gameOver: false,
    gameStarted: false,
    hasInteracted: false,
    musicEnabled: true,
    setGameStatus: (status) => set(state => ({ gameStatus: status })),
    setCoinCollided: (value) => set(state => ({ collidedCoins: value })),
    enableMusic: (enabled) => set(state => ({ musicEnabled: enabled }))
  }
})

// game status
// 0 = initial loading
// 1 = menu screen
// 2 = game start count down
// 3 = play game
// 4 = pouse game
// 5 = pouse /play 
// 6 = car colllides with another car

const mutation = {
  gameOver: false,
  score: 0,
  gameSpeed: 0.0,
  desiredSpeed: 0.0,
  horizontalVelocity: 0,
  colorLevel: 0,
  shouldShiftItems: false,
  currentMusicLevel: 0,
  currentLevelLength: 0,
  globalColor: new Color()
}

export { useStore, mutation }