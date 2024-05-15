import { useStore, useStore2 } from '@/state/useStore';
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect';

export const HUD = (props) => {

    const { keyMap } = props

    const gameStatus = useStore(s => s.gameStatus)
    const setGameStatus = useStore(s => s.setGameStatus)
    const collidedCoins = useStore(s => s.collidedCoins)
    const setCoinCollided = useStore(s => s.setCoinCollided)
    const musicEnabled = useStore(s => s.musicEnabled)
    const enableMusic = useStore(s => s.enableMusic)
    const highScore = useStore2(s => s.highScore)

    const [state, setState] = useState(false)
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
        window.CrazyGames.SDK.game.gameplayStart();
    }

    const onPauseGamePlay = () => {
        setGameStatus(4)
        window.CrazyGames.SDK.game.gameplayStop()
    }


    const onExitGamePlay = () => {
        setSeconds(3)
        setGameStatus(1)
        setCoinCollided([])
        keyMap.current.speed = 0.08
        keyMap.current.distance = 0.00000001
        keyMap.current.ArrowLeft = false
        keyMap.current.ArrowRight = false
    }
    const onRetryGamePlay = () => {
        const callbacks = {
            adFinished: () => {
                setCoinCollided([])
                keyMap.current.speed = 0.08
                keyMap.current.distance = 0.00000001
                keyMap.current.ArrowLeft = false
                keyMap.current.ArrowRight = false
                window.CrazyGames.SDK.game.gameplayStart();
                setGameStatus(2)
                enableMusic(musicEnabled)
            },
            adError: (error) => console.log("Error midgame ad", error),
            adStarted: () => {
                setSeconds(3)
                enableMusic(false)
                console.log("Start midgame ad")
            },
        };
        window.CrazyGames.SDK.ad.requestAd("midgame", callbacks)

    }

    const onDocumentKey = (code, type) => {
        keyMap.current[code] = type === 'keydown'
    }

    var elem = document.documentElement
    const { innerWidth: width, innerHeight: height } = window;
    let isLandscape = width < height
    useEffect(() => {
        if (isLandscape && gameStatus >= 1 && state) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
            }
            screen.orientation.lock("landscape").then(() => {
            }).catch((error) => {
                console.log(error);
            });
        }
        window.addEventListener("click", function () {
            if (!state) setState(true)

        });
    }, [isMobile, gameStatus, isLandscape, state])

    const onSoundOnOff = () => {
        enableMusic(!musicEnabled)
    }

    return (
        <div className='game-wrapper' onContextMenu={(e) => e.preventDefault()}>
            {gameStatus === 3 && (
                <div className='meter'>
                    <div className='col high-score-col'>
                        <div className='speed-meter'>{highScore < collidedCoins?.length ? collidedCoins?.length : highScore}</div>
                        <div>High Score</div>
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
                            onClick={onPauseGamePlay}
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
                            className='btn sound'
                            onClick={onSoundOnOff}
                        >Sound {musicEnabled ? "On" : "Off"}</div>
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

            {gameStatus === 6 && (
                <div className='score-screen'>
                    <div className='score-screen-wrap'>
                        <div className='score-card'>
                            <p>Coins Collected</p>
                            <div className='coin-wrap'>

                                <h4>{collidedCoins?.length ?? 0}</h4>

                            </div>

                        </div>
                        <div className='high-score-card'>
                            <p>High Score</p>
                            <div className='coin-wrap'>

                                <h4>{highScore}</h4>

                            </div>

                        </div>
                        <div
                            className='btn retry'
                            onClick={onRetryGamePlay}
                        >Play Again</div>
                        <div
                            className='btn exit'
                            onClick={onExitGamePlay}
                        >
                            exit
                        </div>
                    </div>
                </div>
            )}

            {(gameStatus === 3 && isMobile) ? (
                <div className='mobile-control'>
                    <div className='mobile-control-wrap'>
                        <div className='left-or-right'>
                            <img
                                alt="ArrowLeft"
                                src="/images/left-arrow.png"
                                onTouchStart={(e) => { onDocumentKey('ArrowLeft', "keydown") }}
                                onTouchEnd={(e) => { onDocumentKey('ArrowLeft', "keyup") }}
                            />
                            <img
                                alt="ArrowRight"
                                src="/images/right-arrow.png"
                                onTouchStart={(e) => { onDocumentKey('ArrowRight', "keydown") }}
                                onTouchEnd={(e) => { onDocumentKey('ArrowRight', "keyup") }}
                            />
                        </div>
                        <div className='accelerator-or-break'>
                            <img
                                alt="break"
                                src="/images/b-pedal.png"
                                onTouchStart={(e) => { onDocumentKey('ArrowDown', "keydown") }}
                                onTouchEnd={(e) => { onDocumentKey('ArrowDown', "keyup") }}
                            />

                            <img
                                alt="acc"
                                src="/images/a-pedal.png"
                                onTouchStart={(e) => { onDocumentKey('ArrowUp', "keydown") }}
                                onTouchEnd={(e) => { onDocumentKey('ArrowUp', "keyup") }}
                            />
                        </div>
                    </div>
                </div>
            ) : ""}
        </div>
    )

}
