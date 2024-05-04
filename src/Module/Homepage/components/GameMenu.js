import React from 'react'
import { useStore } from '@/state/useStore'

export const GameMenu = (props) => {

    const gameStatus = useStore(s => s.gameStatus)
    const setGameStatus = useStore(s => s.setGameStatus)
    const musicEnabled = useStore(s => s.musicEnabled)
    const enableMusic = useStore(s => s.enableMusic)

    const onStart = () => {
        PokiSDK.gameplayStart();
        setGameStatus(2)
    }

    const onSoundOnOff = () => {
        enableMusic(!musicEnabled)
    }

    return gameStatus === 1 ? (
        <>
            <div className='game-overlay'>

                <div className='game-overlay-wrap'>
                    <img
                        className='menu-cover-img'
                        alt="menu-cover"
                        src="/images/cover.jpg"
                    />
                    <div className="menu-buttons">
                        <button onClick={onStart}> Start</button>
                        <button onClick={onSoundOnOff}> Sound {musicEnabled ? "On" : "Off"}</button>
                    </div>
                </div>

            </div>
        </>
    ) : null

}
