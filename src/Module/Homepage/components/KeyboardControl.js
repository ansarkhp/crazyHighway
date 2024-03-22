import { useStore } from '@/state/useStore'
import { useFrame } from '@react-three/fiber'
import { useEffect, } from 'react'
import * as THREE from 'three'

export default function KeyboardControl({ keyMap }) {
    const { gameStarted } = useStore()

    useEffect(() => {
        const onDocumentKey = (e) => {
            keyMap.current[e.code] = e.type === 'keydown'
        }

        document.addEventListener('keydown', onDocumentKey)

        document.addEventListener('keyup', onDocumentKey)
        return () => {
            document.removeEventListener('keydown', onDocumentKey)
            document.removeEventListener('keyup', onDocumentKey)
        }
    }, [])

    // setTimeout(() => { console.log("hello", keyMap.current.distance); }, 4000);
    let s = 0
    useFrame((_, delta) => {
        if (gameStarted) {
        let speed = keyMap.current.speed
        s += 1

        // console.log("a", keyMap.current.speed);
        const ds = 35
        const SPS = (ds * 1000 / 3600) / 2
        // console.log("fvvv", SPS, SPS / 60, SPS * delta, keyMap.current.distance + keyMap.current.speed , s , SPS * delta);
        if (!keyMap.current.speed) {
            keyMap.current.speed = 0.08

        }
        // console.log("b", keyMap.current.speed);
        if (keyMap.current['ArrowUp']) {
            // speed += 0.005
            if (speed < 0.3) {
                keyMap.current.speed += 0.0006
            }
        }
        if (keyMap.current['ArrowDown']) {
            let breakDown = speed - 0.001
            if (breakDown <= 0.1) {
                keyMap.current.speed = 0.1
            } else if (breakDown > 0.1) {
                keyMap.current.speed = breakDown
            }
        }
            if (!keyMap.current.distance) {
                keyMap.current.distance = 0.00000001
            } else {
                keyMap.current.distance = keyMap.current.distance + keyMap.current.speed
            }
        }
    })



    return <></>
}