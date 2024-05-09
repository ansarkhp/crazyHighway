import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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
    musicEnabled: false,
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

export const useStore2 = create(persist(
  (set) => {

    return {
      highScore: 0,
      setHighScore: (val) => set(state => ({ highScore: val })),
    }
  },
  {
    name: 'game-data', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  },
)
)
export { useStore }