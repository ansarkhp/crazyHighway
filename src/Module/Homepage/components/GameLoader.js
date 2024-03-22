import React, { useEffect, useState } from 'react'
const defaultDataInterpolation = (p) => `Loading: ${p.toFixed(0)}%`

export const GameLoader = (props) => {
    const { active, progress } = props
    return (
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
    )

}
