import React, { useEffect, useState } from 'react'


export const HUD = (props) => {

    const { keyMap, state } = props

    // console.log(appState);
    // state to store time
    const [time, setTime] = useState(0);

    // state to check stopwatch running or not
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    // Hours calculation
    const hours = Math.floor(time / 360000);

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    // Milliseconds calculation
    const milliseconds = time % 100;

    // Method to start and stop timer
    const startAndStop = () => {
        setIsRunning(!isRunning);
    };

    useEffect(() => {
        setIsRunning(true)
    })
    // Method to reset timer back to 0
    const reset = () => {
        setTime(0);
    };

    function calculateKM(value, type) {
        // Calculate the distance for the given value
        var distance = (value * 35) / .05;
        if (type === "s") return Math.round(distance)
        else return distance.toFixed(2)

    }

    // setTimeout(() => { console.log("hello",keyMap.distance, calculateDistance(keyMap.distance)); }, 5000);


    return (
        <div className='game-wrapper'>

            <div className='meter'>
                {/* <div>
                    <div>Distance</div>
                    <div className='meter-divider' />
                </div> */}

                <div className='speed'>
                    <div className='speed-meter'>{state.collidedCoin?.length ?? 0}</div>
                    <div>Coins</div>
                </div>
                {/* <div>
                    <div onClick={reset}>Time</div>
                    <div className='meter-divider' />
                </div> */}

            </div>

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
