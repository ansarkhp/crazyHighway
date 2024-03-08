import { useFrame } from '@react-three/fiber'
import { useEffect, } from 'react'
import * as THREE from 'three'

export default function KeyboardControl({ keyMap }) {


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

    function distanceInOneSecond(speedKmPerHour, d) {
        // Convert speed from km/h to km/s
        var speedKmPerSecond = speedKmPerHour / 3600;
        return speedKmPerSecond * d;
    }
    var clock = new THREE.Clock();
    var delta = 0;


    useFrame(() => {
        delta = clock.getDelta();
        let speed = keyMap.current.speed
        // console.log("a", keyMap.current.speed);
        if (!keyMap.current.speed) {
            keyMap.current.speed = 0.05

        }
        // console.log("b", keyMap.current.speed);
        if (keyMap.current['ArrowUp']) {
            // speed += 0.005
            if (speed < 0.225) {
                keyMap.current.speed += 0.0005
            }
        }
        if (keyMap.current['ArrowDown']) {
            let breakDown = speed - 0.001
            if (breakDown <= 0.05) {
                keyMap.current.speed = 0.05
            } else if (breakDown > 0.05) {
                keyMap.current.speed = breakDown
            }
        }
        if (!keyMap.current.distance) {
            keyMap.current.distance = 0.00000001
        } else {
            keyMap.current.distance = keyMap.current.distance + distanceInOneSecond(keyMap.current.speed, delta)
        }

    })



    return <></>
}