import { useProgress, } from '@react-three/drei'
import React, { useEffect, useState } from 'react'
import { GameLoader } from './GameLoader'
import { useStore } from '@/state/useStore'

export const GameMenu = (props) => {
    const { active, progress } = useProgress()
    const [shown, setShown] = useState(true)
    const [hasLoaded, setHasLoaded] = useState(false)
    useEffect(() => {
        if (progress >= 100) {
            setTimeout(function () {
                setHasLoaded(true)
            }, 1000)
        }
    }, [progress])


    const { gameStarted, gameOver, setGameStarted } = useStore()
    console.log(gameStarted);

    useEffect(() => {
        if (gameStarted || gameOver) {
            setShown(false)
        } else if (!gameStarted) {
            setShown(true)
        }
    }, [gameStarted, active, gameOver])

    return shown ? (
        <>

            {!hasLoaded ? (
                <GameLoader active={active} progress={progress} />
            ) : (
                <div className='game-overlay'>

                    <div className='game-overlay-wrap'>
                        <img
                            className='menu-cover-img'
                            alt="menu-cover"
                            src="/images/cover.jpg"
                        />
                        <div className="menu-buttons">
                            <button onClick={() => {
                                setGameStarted(true)
                            }}> Start</button>
                            <button> About</button>
                        </div>
                    </div>

                </div>
            )}
        </>
    ) : null

}
