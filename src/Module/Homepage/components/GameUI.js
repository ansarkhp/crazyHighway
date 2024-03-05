import React from 'react'
import useKeyboard from '../hooks/useKeyboard'



export const GameUI = (props) => {

    // const keyMap = useKeyboard()

    return (
        <div className='game-wrapper'>

            <div className='meter'>
                <div>
                    <div>Distance</div>
                    <div className='meter-divider' />
                </div>

                <div className='speed'>
                    <div className='speed-meter'>63</div>
                    <span>MPH</span>
                </div>
                <div>
                    <div>Time</div>
                    <div className='meter-divider' />
                </div>

            </div>

            <div className='meter-values'>
                <div className='mt-wrap'>
                    <span>10.2KM</span>
                </div>
                <div className='mt-wrap'>
                    <span>00:00:31</span>
                </div>

            </div>
        </div>
    )

}
