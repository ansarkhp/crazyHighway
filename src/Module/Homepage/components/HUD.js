import { useStore } from '@/state/useStore';
import React, { useEffect, useState } from 'react'


export const HUD = (props) => {

    const gameStatus = useStore(s => s.gameStatus)
    const setGameStatus = useStore(s => s.setGameStatus)
    const collidedCoins = useStore(s => s.collidedCoins)
    const setCoinCollided = useStore(s => s.setCoinCollided)


    const [seconds, setSeconds] = useState(2);

    useEffect(() => {
        if ((gameStatus === 2 || gameStatus === 5) && seconds > -1) {
            const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
            // Cleanup function to clear the timeout when the component unmounts
            return () => clearTimeout(timerId);
        } else if (gameStatus === 2 || gameStatus === 5) {
            // Perform any actions when the countdown finishes (optional)
            setGameStatus(3)
        }
    }, [seconds, gameStatus]);
    const onResumeGamePlay = () => {
        setSeconds(3)
        setGameStatus(5)
    }

    const onExitGamePlay = () => {
        setSeconds(3)
        setGameStatus(1)
        setCoinCollided([])
    }
    const onRetryGamePlay = () => {
        setSeconds(3)
        setGameStatus(2)
        setCoinCollided([])
    }


    return (
        <div className='game-wrapper'>
            {gameStatus === 3 && (
                <div className='meter'>
                    <div className='col'>

                    </div>

                    <div className='speed col'>
                        <div className='speed-meter'>{collidedCoins?.length ?? 0}</div>
                        <div>Coins</div>
                    </div>
                    <div className='col pause-col'>
                        <img
                            alt="pause"
                            src="/images/three-line.svg"
                            className='pause-img'
                            onClick={() => { setGameStatus(4) }}
                        />
                    </div>

                </div>
            )}
            {(gameStatus === 2 || gameStatus === 5) && (
                <div className='counter-wrap'>
                    <span> {seconds === 0 ? 'GO!' : seconds}</span>
                </div>
            )}
            {gameStatus === 4 && (
                <div className='pause-screen'>
                    <div className='pause-screen-wrap'>
                        <div
                            className='btn resume'
                            onClick={onResumeGamePlay}
                        >
                            Resume
                        </div>
                        <div
                            className='btn retry'
                            onClick={onRetryGamePlay}
                        >Restart</div>
                        <div
                            className='btn exit'
                            onClick={onExitGamePlay}
                        >
                            exit
                        </div>
                    </div>
                </div>
            )}
            {/* <div className='meter-values'>
                <div className='mt-wrap'>
                    <div>{calculateDistance(keyMap.distance)}KM</div>
                </div>
                <div className='mt-wrap'>
                    <div>
                        {hours}:{minutes.toString().padStart(2, "0")}:
                        {seconds.toString().padStart(2, "0")}
                    </div>
                </div>

            </div> */}
        </div>
    )

}
