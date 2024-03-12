import React from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export const SpawnCars = (props) => {
    const { scene } = useThree()
    const gltf = useGLTF('models/race.glb')
    let speed = 0.045
    // let carMesh
    const { keyMap } = props
    let spawnCars = []


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

        let carMesh = object
        carMesh.uid = uid
        const Am = scene.children.find(v => v.uid === uid)
        if (Am) {
            scene.remove(Am)
        }
        const color = new THREE.Color();
        const cArray = [
            "#811331",
            "#FF00FF",
            "#FA8072",
            "#008080",
            "#C19A6B",
            "#818589",
            "#FAFA33",
            "#F3A8C0",
            "#D70040",
            "#02192B",
            "#2173B8",
            "#C8CCCE",
            "#FFF200",
            "#7FF334"
        ];

        // Set the color using the hexadecimal value
        const r = Math.floor(Math.random() * cArray.length);
        color.set(cArray[r]);
        carMesh.traverse(function (child) {
            if (child.isMesh === true && child.material !== null) {
                if (child.name === "Mesh_body") {
                    const material = child.material.clone();
                    material.color = color
                    child.material = material;
                }
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
    function spawnCar() {
        // Code to create and add a new car to the game
        // console.log("Car spawned!");
    }

    let rp = []
    scene.traverse(function (child) {
        if (child.name === "road") {
            let ls = child.position.x - (child.scale.x / 2)
            let a = child.scale.x / 4
            for (let i = 1; i < 5; i++) {
                rp.push(ls + (i * a) - (a / 2))
            }
        }
    });


    let sp = [0]

    for (let step = 0; step < 100; step++) {
        // Runs 5 times, with values of step 0 through 4.
        let max = 20
        let min = 3
        let b = Math.floor(Math.random() * (max - min + 1)) + min

        let c = sp.at(-1) + b
        // console.log(c)
        sp.push(c)
    }

    const updateSpawnCar = () => {
        sp.shift()
        let max = 20
        let min = 3
        let b = Math.floor(Math.random() * (max - min + 1)) + min

        let c = sp.at(-1) + b
        sp.push(c)
    }

    useFrame((e) => {
        // console.log(keyMap['distance']);
        spawnCars.forEach((obj) => {
            obj.update(keyMap['speed'])
        }) 

        if (keyMap['distance'] >= sp[0]) {
            updateSpawnCar()
            createDriveCar({
                object: gltf.scene.clone(),
                pos: {
                    x: rp[Math.floor(Math.random() * 4)], y: 0, z: -36
                },
                uid: e.clock.elapsedTime
            })
        }

    })

}
