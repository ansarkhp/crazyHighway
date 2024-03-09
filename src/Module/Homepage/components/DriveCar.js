import React from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export const DriveCar = (props) => {
    const { scene } = useThree()
    const gltf = useGLTF('models/race.glb')
    let speed = 0.045
    let carMesh
    const { keyMap } = props

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
        quat = {
            x: 0,
            y: 0,
            z: 0,
        },
    }) {
        // console.log(object);

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


        // let bbox = new THREE.Box3().setFromObject(carMesh);
        // let helper = new THREE.Box3Helper(bbox, new THREE.Color(0, 255, 0));
        // let size = bbox.getSize(new THREE.Vector3());
        // scene.add(helper);
        // console.log(size);

        // carMesh = object
        carMesh.position.set(pos.x, pos.y, pos.z)
        carMesh.quaternion.set(0, 0, 0, 0)
        scene.add(carMesh)
        // gui.add(carMesh.position, 'x', -10, 10, .1)
        // gui.add(carMesh.position, 'y', -10, 10, .1)
        // gui.add(carMesh.position, 'z', -10, 10, .1)
        // carMesh.position.y = 0
        // console.log(object.scale);
        // carMesh.scale.set(.5, .5, .5)

        // const result = threeToCannon(carMesh, { type: ShapeType.HULL });
        // const { shape, offset, quaternion } = result;
        // // console.log(result);
        // carBody = new CANNON.Body({ mass: 10, material: defaultMaterial })
        // carBody.addShape(shape)
        // carBody.name = "car"
        // carBody.quaternion.set(0, -.7, -.7, 0)
        // // console.log(carMesh);
        // carBody.position.copy(carMesh.position)
        // // carBody.rotation.set(new THREE.Vector3(0, 0, 0));
        // world.addBody(carBody)
        // carLoaded = true
    }

    useFrame(() => {

        // console.log(keyMap);
        if (keyMap['ArrowLeft']) {
            if (carMesh.position.x > -4.39) {
                carMesh.position.x = carMesh.position.x - keyMap['speed']
            }
        }
        if (keyMap['ArrowRight']) {
            if (carMesh.position.x < 4.39) {
                carMesh.position.x = carMesh.position.x + keyMap['speed']
            }

        }
    })

}
