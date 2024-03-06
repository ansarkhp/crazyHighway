import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats, PerspectiveCamera } from '@react-three/drei'
import { Dividers, DriveCar, GameUI, Lights, SpawnCars, Terrain, Trees } from './components'
import { Leva } from 'leva'
import * as THREE from 'three'

export const Homepage = () => {

    console.log("reloading....");

    return (
        <>
            {/* <Leva collapsed /> */}
            <GameUI />
            <Canvas
                className='canvas'
                style={{ background: 'linear-gradient( 180deg ,#81adec,#d7e6f9, #d7e6f9)' }}
            >
                
                <PerspectiveCamera position={[0, 1.5, 4]} fov={75} near={0.1} far={100} makeDefault />
                <Lights />
                <OrbitControls />
                <Stats className="statsUI" />
                <Terrain pos={[0, 0, -15]} scale={[10, 0, 40]} color='#656579' />
                <Terrain pos={[25, 0, -15]} scale={[40, 0, 40]} color='#61b876' />
                <Terrain pos={[-25, 0, -15]} scale={[40, 0, 40]} color='#61b876' />
                <Suspense fallback={null} >
                    <Dividers />
                    <Trees />
                    <DriveCar />
                    <SpawnCars />
                </Suspense>

            </Canvas>
        </>
    )
}
