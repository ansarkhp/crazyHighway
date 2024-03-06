import React from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export const SpawnCars = (props) => {
    const { scene } = useThree()
    const gltf = useGLTF('models/race.glb')
    let speed = 0.045
    // let carMesh
    const { keyMap } = props
    let spawnCars = []

    let min = 5
    let max = -5

    // createDriveCar({
    //     object: gltf.scene.clone(),
    //     pos: {
    //         x: 1.25, y: 0, z: 0
    //     },
    //     uid:"1"
    // })
    createDriveCar({
        object: gltf.scene.clone(),
        pos: {
            x: (Math.random() * (max - min) + min).toFixed(2), y: 0, z: -36
        },
        uid: "2"
    })
    // createDriveCar({
    //     object: gltf.scene.clone(),
    //     pos: {
    //         x: -1.25, y: 0, z: 0
    //     },
    //     uid:"-1"
    // })
    // createDriveCar({
    //     object: gltf.scene.clone(),
    //     pos: {
    //         x: -3.75, y: 0, z: 0
    //     },
    //     uid:"-2"
    // })

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
        uid = "",
    }) {
        console.log(object);

        let carMesh = object
        carMesh.uid = uid
        const Am = scene.children.find(v => v.uid === uid)
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

        carMesh.update = (speed) => {

            carMesh.position.z += speed
            // console.log(mesh.position.z);

            if (carMesh.position.z > 5.5) {
                var index = spawnCars.indexOf(carMesh);
                if (index !== -1) {
                    spawnCars.splice(index, 1);
                }
                scene.remove(carMesh)
            }
        }
        spawnCars.push(carMesh)
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

    useFrame((a, b, c) => {

        // spawnCars.forEach((obj) => {
        //     obj.update(keyMap['speed'])
        // })
        let random = Math.random() < 0.008

        // console.log(a, b, c);
        // if (random) {

        //     createDriveCar({
        //         object: gltf.scene.clone(),
        //         pos: {
        //             x: (Math.random() * (max - min) + min).toFixed(2), y: 0, z: -36
        //         },
        //     })

        // }

    })

}
