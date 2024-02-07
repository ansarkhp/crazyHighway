import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats, PerspectiveCamera } from '@react-three/drei'
import { Dividers, Terrain, Trees } from './components'
export const Homepage = () => {

    console.log("reloading....");

    return (
        <Canvas
            className='canvas'
            style={{ background: 'linear-gradient( 180deg ,#81adec,#d7e6f9, #d7e6f9)' }}
        >
            <PerspectiveCamera position={[0, 3, 4]} fov={75} near={0.1} far={100} makeDefault />
            <ambientLight color="#ffeb3b" intensity={0.5} />
            <directionalLight color="#fffee1" position={[0, 0, 1]} />
            <OrbitControls />
            <Stats />
            <Terrain pos={[0, 0, -15]} scale={[10, 0, 40]} color='#656579' />
            <Terrain pos={[25, 0, -15]} scale={[40, 0, 40]} color='#61b876' />
            <Terrain pos={[-25, 0, -15]} scale={[40, 0, 40]} color='#61b876' />
            <Suspense fallback={null} >
                <Dividers />
                <Trees />
            </Suspense>

        </Canvas>

    )
}
