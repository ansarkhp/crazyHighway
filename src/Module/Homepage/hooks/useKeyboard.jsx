import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

export default function useKeyboard() {
    const keyMap = useRef({})

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
                keyMap.current.speed -= 0.0005
            }
            // keyMap.current.speed = speed > 0.045 ? breakDown : 0.045
        }
        // keyMap.current.distance = 
        // console.log(speed);
    })



    return keyMap.current
}