import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '@/state/useStore'

export const Audios = (props) => {
    const [state, setState] = useState(false)
    const gameStatus = useStore(s => s.gameStatus)
    const musicEnabled = useStore(s => s.musicEnabled)
    let driveAudio = new Audio('sound/game_theme.mp3')
    let gameAudio = new Audio('sound/gameOver_theme.mp3')
    let raceStartAudio = new Audio('sound/race-start-beeps.mp3')

    driveAudio.loop = true
    driveAudio.volume = .2
    driveAudio.volume = .2
    gameAudio.loop = true

    useEffect(() => {
        const playAudio = (gameStatus) => {
            if (gameStatus === 3) {
                driveAudio.play().then(() => {
                });

                raceStartAudio.pause();
                gameAudio.pause();
            } else if (gameStatus === 2 || gameStatus === 5) {
                raceStartAudio.play().then(() => {
                });

                gameAudio.pause();
                driveAudio.pause();
            } else {
                gameAudio.play().then((res) => {
                })

                driveAudio.pause();
                raceStartAudio.pause();

            }
        };
        if (musicEnabled) {
            playAudio(gameStatus);
        } else {
            driveAudio.pause();
            gameAudio.pause();
            raceStartAudio.pause();
        }

        window.addEventListener("click", function () {
            if (!state) setState(true)

        });
        return () => {
            driveAudio.pause();
            gameAudio.pause();
            raceStartAudio.pause();
        };
    }, [gameStatus, state, musicEnabled])

}
