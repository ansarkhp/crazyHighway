import { useFrame } from '@react-three/fiber'
import { useEffect, } from 'react'

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

    useFrame(() => {
        // if (keyMap['Space']) {
        //     console.log("space", keyMap);
        // }
        console.log(keyMap);
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
            // let breakDown = speed - 0.005
            if (speed > 0.045) {
                keyMap.current.speed -= 0.001
            }
            // keyMap.current.speed = speed > 0.045 ? breakDown : 0.045
        }
        if (!keyMap.current.distance) {
            console.log("hel4444444lo", keyMap.current.distance);
            keyMap.current.distance = 0.005
        } else {
            console.log("hello");
            keyMap.current.distance = keyMap.current.distance + keyMap.current.speed
        }

    })



    return <></>
}