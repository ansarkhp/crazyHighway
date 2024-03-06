import React, { useRef } from 'react'
import { useControls, Leva } from 'leva'
import * as THREE from 'three'
import { DirectionalLightHelper } from 'three'
import { useHelper } from '@react-three/drei'

export const Lights = (props) => {
    const ambientRef = useRef()
    const directionalRef = useRef()
    const pointRef = useRef()
    const spotRef = useRef()

    // useControls('Ambient Light', {
    //     visible: {
    //         value: true,
    //         onChange: (v) => {
    //             ambientRef.current.visible = v
    //         },
    //     },
    //     color: {
    //         value: '#b4b188',
    //         onChange: (v) => {
    //             ambientRef.current.color = new THREE.Color(v)
    //         },
    //     },
    // })

    // useControls('Directional Light', {
    //     visible: {
    //         value: true,
    //         onChange: (v) => {
    //             directionalRef.current.visible = v
    //         },
    //     },
    //     position: {
    //         x: 1,
    //         y: 1,
    //         z: 1,
    //         onChange: (v) => {
    //             directionalRef.current.position.copy(v)
    //         },
    //     },
    //     color: {
    //         value: '#ffffff',
    //         onChange: (v) => {
    //             directionalRef.current.color = new THREE.Color(v)
    //         },
    //     },
    // })

    // useControls('Point Light', {
    //     visible: {
    //         value: false,
    //         onChange: (v) => {
    //             pointRef.current.visible = v
    //         },
    //     },
    //     position: {
    //         x: 2,
    //         y: 0,
    //         z: 0,
    //         onChange: (v) => {
    //             pointRef.current.position.copy(v)
    //         },
    //     },
    //     color: {
    //         value: '#ffffff',
    //         onChange: (v) => {
    //             pointRef.current.color = new THREE.Color(v)
    //         },
    //     },
    // })

    // useControls('Spot Light', {
    //     visible: {
    //         value: false,
    //         onChange: (v) => {
    //             spotRef.current.visible = v
    //         },
    //     },
    //     position: {
    //         x: 3,
    //         y: 2.5,
    //         z: 1,
    //         onChange: (v) => {
    //             spotRef.current.position.copy(v)
    //         },
    //     },
    //     color: {
    //         value: 'white',
    //         onChange: (v) => {
    //             spotRef.current.color = new THREE.Color(v)
    //         },
    //     },
    // })
    // useHelper(directionalRef, DirectionalLightHelper, 1, "red");
    return (
        <>

            <ambientLight ref={ambientRef} intensity={1} color={'#b4b188'} />
            <directionalLight castShadow={true} ref={directionalRef} position={[1, 1, 1]} color={'#ffffff'} />
            <pointLight ref={pointRef} position={[2, 0, 0]} color="#ffffff" />
            <spotLight ref={spotRef} position={[3, 2.5, 1]} color="#ffffff" />

        </>
    )
}