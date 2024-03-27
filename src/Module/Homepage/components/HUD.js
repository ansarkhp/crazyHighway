import { useStore } from '@/state/useStore';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useState } from 'react'


export const HUD = (props) => {

    const gameStatus = useStore(s => s.gameStatus)
    const setGameStatus = useStore(s => s.setGameStatus)
    const collidedCoins = useStore(s => s.collidedCoins)


    const [seconds, setSeconds] = useState(2);

    useEffect(() => {
        if (gameStatus === 2 && seconds > -1) {
            const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
            // Cleanup function to clear the timeout when the component unmounts
            return () => clearTimeout(timerId);
        } else if (gameStatus === 2) {
            // Perform any actions when the countdown finishes (optional)
            setGameStatus(3)
            console.log("game start");
        }
    }, [seconds, gameStatus]);



    return (
        <div className='game-wrapper'>
            {gameStatus !== 2 && (
                <div className='meter'>
                    {/* <div>
                    <div>Distance</div>
                    <div className='meter-divider' />
                </div> */}

                    <div className='speed'>
                        <div className='speed-meter'>{collidedCoins?.length ?? 0}</div>
                        <div>Coins</div>
                    </div>
                    {/* <div>
                    <div onClick={reset}>Time</div>
                    <div className='meter-divider' />
                </div> */}

                </div>
            )}
            {gameStatus === 2 && (
                <div className='counter-wrap'>
                    <span> {seconds === 0 ? 'GO!' : seconds}</span>
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
