import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats, PerspectiveCamera } from '@react-three/drei'
import { Audios, Dividers, DriveCar, GameLoader, GameMenu, HUD, Lights, Road, SpawnCars, Terrain, Trees } from './components'
import { Leva } from 'leva'
import * as THREE from 'three'
import KeyboardControl from './components/KeyboardControl'

export const Homepage = () => {
    const keyMap = useRef({})
    const state = useRef({})
    console.log("reloading....");
    PokiSDK.init().then(() => {
        console.log("Poki SDK successfully initialized");
        // fire your function to continue to game
    }).catch(() => {
        console.log("Initialized, something went wrong, load you game anyway");
        // fire your function to continue to game
    });
    return (
        <>
            {/* <Leva collapsed /> */}
            <HUD keyMap={keyMap} />
            <GameLoader />
            <GameMenu />
            <Canvas
                className='canvas'
                style={{ background: 'linear-gradient( 180deg ,#81adec,#d7e6f9, #d7e6f9)' }}
            >
                <PerspectiveCamera position={[0, 2.7, 5]} fov={75} near={0.1} far={100} makeDefault />
                <Lights />
                <OrbitControls />
                {/* <Stats className="statsUI" /> */}
                <KeyboardControl keyMap={keyMap} />
                <Road keyMap={keyMap.current} />
                <Terrain name="road" pos={[0, 0, -15]} scale={[10, 0, 40]} color='#656579' keyMap={keyMap.current} />
                <Terrain pos={[25, 0, -15]} scale={[40, 0, 40]} color='#61b876' />
                <Terrain pos={[-25, 0, -15]} scale={[40, 0, 40]} color='#61b876' />
                <Audios />
                <Suspense fallback={null} >
                    <Dividers keyMap={keyMap.current} />
                    <Trees keyMap={keyMap.current} />
                    <DriveCar keyMap={keyMap.current} state={state} />
                    <SpawnCars keyMap={keyMap.current} state={state.current} />
                </Suspense>
            </Canvas>
        </>
    )
}
