import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats, PerspectiveCamera } from '@react-three/drei'
import { Dividers, Terrain } from './components'

export const Homepage = () => {

    return (
        <Canvas className='canvas'>
            <PerspectiveCamera position={[0, 3, 4]} fov={75} near={0.1} far={100} makeDefault />
            <ambientLight position={[0, 0, 5]} color="#ffffff" intensity={0.5} />
            <directionalLight color="red" position={[0, 0, 1]} />
            {/* <mesh visible userData={{ hello: 'world' }} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="hotpink" transparent />
            </mesh> */}
            <OrbitControls />
            <Stats />
            <Terrain pos={[0, 0, -15]} scale={[10, 0, 40]} color='#656579' />
            <Terrain pos={[25, 0, -15]} scale={[40, 0, 40]} color='#61b876' />
            <Terrain pos={[-25, 0, -15]} scale={[40, 0, 40]} color='#61b876' />
            <Suspense fallback={null}>
                <Dividers />
            </Suspense>

        </Canvas>

    )
}
