import React from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '@/state/useStore'

export const DriveCar = (props) => {
    const { scene } = useThree()
    const gltf = useGLTF('models/race.glb')
    let carMesh
    let carBox
    var { keyMap, state } = props
    const { gameStarted } = useStore()

    createDriveCar({
        object: gltf.scene.clone(),
        pos: {
            x: 1.25, y: 0, z: 0
        },
    })
    function createDriveCar({
        object,
        pos = {
            x: 0, y: 0.5, z: 0
        },
    }) {

        carMesh = object
        carMesh.uid = 'driveCar'
        const Am = scene.children.find(v => v.uid === 'driveCar')
        if (Am) {
            scene.remove(Am)
        }
        carMesh.traverse(function (child) {
            if (child.isMesh === true && child.material !== null) {
                child.material.metalness = 0;
                child.material.roughness = 0.5;
                child.material.clearcoat = 2;
                child.material.needUpdate = true
            }
        });

        // carMesh = object
        carMesh.position.set(pos.x, pos.y, pos.z)
        carMesh.quaternion.set(0, 0, 0, 0)
        scene.add(carMesh)
        carBox = new THREE.Box3().setFromObject(carMesh);
        // let helper = new THREE.Box3Helper(carBox, new THREE.Color(0, 255, 0));
        // helper.uid = 'driveCarBox'

        // const Alm = scene.children.find(v => v.uid === 'driveCarBox')
        // if (Alm) {
        //     scene.remove(Alm)
        // }
        // scene.add(helper);
        scene.add(carMesh)
    }

    let las = 0.01
    let lac = 1
    let ras = 0.01
    let rac = 1
    useFrame(() => {

        if (gameStarted) {

            if (keyMap['ArrowLeft']) {
                if (carMesh.position.x > -4.15) {
                    lac = lac + .8
                    let v = (keyMap['speed'] / 20) * lac
                    if (keyMap['speed'] >= las) las = v >= keyMap['speed'] ? keyMap['speed'] : v
                    carMesh.position.x = carMesh.position.x - las
                    carBox.setFromObject(carMesh)
                }
            } else {
                lac = 1
                las = 0.08
            }
            if (keyMap['ArrowRight']) {
                if (carMesh.position.x < 4.15) {
                    rac = rac + .8
                    let v = (keyMap['speed'] / 20) * rac
                    if (keyMap['speed'] >= ras) ras = v >= keyMap['speed'] ? keyMap['speed'] : v
                    carMesh.position.x = carMesh.position.x + ras
                    carBox.setFromObject(carMesh)
                }
            } else {
                rac = 1
                ras = 0.08
            }
            state.current.carBox = carBox

        }
    })

}
