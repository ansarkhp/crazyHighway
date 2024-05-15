import { useStore } from '@/state/useStore'
import { useProgress } from '@react-three/drei'
import React, { useEffect, useState } from 'react'

export const GameLoader = (props) => {
    const { active, progress } = useProgress()
    const gameStatus = useStore(s => s.gameStatus)
    const setGameStatus = useStore(s => s.setGameStatus)

    useEffect(() => {
        if (progress >= 100) {
            setTimeout(function () {
                setGameStatus(1)
                // window.CrazyGames.SDK.game.loadingStop();
            }, 500)
        } else if (progress == 0) {
            console.log("hello");
            // window.CrazyGames.SDK.game.loadingStart();
        }

    }, [progress])

    return gameStatus === 0 ? (
        <div className='gameloder-wrapper'>
            <div className='bar-wrap'>
                <div
                    className='loader-bar'
                    style={{
                        width: `${progress}%`
                    }}
                />
            </div>
        </div>
    ) : null

}
