import { useProgress } from '@react-three/drei'
import React, { useEffect, useState } from 'react'
import { GameLoader } from './GameLoader'


export const GameMenu = (props) => {
    const { active, progress } = useProgress()
    const [hasLoaded, setHasLoaded] = useState(false)
    useEffect(() => {
        if (progress >= 100) {
            setTimeout(function () {
                setHasLoaded(true)
            }, 1000)
        }
    }, [progress])



    return (
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
                            <button> Start</button>
                            <button> About</button>
                        </div>
                    </div>

                </div>
            )}
        </>
    )

}
