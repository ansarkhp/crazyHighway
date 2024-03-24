import { useStore } from '@/state/useStore'
import { useProgress } from '@react-three/drei'
import React, { useEffect, useState } from 'react'

export const GameLoader = (props) => {
    const { active, progress } = useProgress()
    const { gameStatus, setGameStatus } = useStore()

    useEffect(() => {
        if (progress >= 100) {
            setTimeout(function () {
                setGameStatus(1)
            }, 500)
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
