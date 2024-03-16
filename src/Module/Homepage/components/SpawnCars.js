import React from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export const SpawnCars = (props) => {
    const { scene } = useThree()
    const gltf = useGLTF('models/race.glb')
    const coinGltf = useGLTF('models/coin.glb')
    const { keyMap, state } = props
    let spawnCars = []


    function createCar({
        object,
        pos = {
            x: 0, y: 0.5, z: 0
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
        carMesh.name = "spawnCar"
        scene.add(carMesh)

        carMesh.update = (speed) => {

            carMesh.position.z += speed
            carMesh.boox.setFromObject(carMesh)

            if (carMesh.position.z > 5.5) {
                var index = spawnCars.indexOf(carMesh);
                if (index !== -1) {
                    spawnCars.splice(index, 1);
                }
                scene.remove(carMesh)
            }
        }



        let carBox = new THREE.Box3().setFromObject(carMesh);
        let helper = new THREE.Box3Helper(carBox, new THREE.Color(0, 255, 0));
        helper.uid = `${uid}box`

        const Alm = scene.children.find(v => v.uid === `${uid}box`)
        if (Alm) {
            scene.remove(Alm)
        }
        scene.add(helper);
        carMesh.boox = carBox

        spawnCars.push(carMesh)


    }

    function createCoin({
        object,
        pos = {
            x: 0, y: 0.5, z: 0
        },
        uid = "",
    }) {

        let carMesh = object
        carMesh.uid = uid
        const Am = scene.children.find(v => v.uid === uid)
        if (Am) {
            scene.remove(Am)
        }
        carMesh.position.set(pos.x, pos.y, pos.z)
        carMesh.quaternion.set(0, 0, 0, 0)
        carMesh.name = "spawnCoin"
        scene.add(carMesh)

        carMesh.update = (speed) => {

            carMesh.position.z += speed
            carMesh.rotation.y -= 0.02;
            carMesh.boox.setFromObject(carMesh)

            if (carMesh.position.z > 5.5) {
                var index = spawnCars.indexOf(carMesh);
                if (index !== -1) {
                    spawnCars.splice(index, 1);
                }
                scene.remove(carMesh)
            }
        }
        let carBox = new THREE.Box3().setFromObject(carMesh);
        let helper = new THREE.Box3Helper(carBox, new THREE.Color(0, 255, 0));
        helper.uid = `${uid}box`

        const Alm = scene.children.find(v => v.uid === `${uid}box`)
        if (Alm) {
            scene.remove(Alm)
        }
        scene.add(helper);
        carMesh.boox = carBox

        spawnCars.push(carMesh)
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



    let sp = [{ uid: 0, posX: rp[Math.floor(Math.random() * 4)], isCar: true, posS: 0, lengthX: 3 }]

    for (let step = 0; step < 100; step++) {
        let max = 15
        let obj = {
            uid: step + 1,
            posX: rp[Math.floor(Math.random() * 4)],
            isCar: Math.random() < 0.85,
        }


        if (sp.at(-1).posX === obj.posX) {
            let min = sp.at(-1).lengthX
            obj.posS = sp.at(-1).posS + Math.floor(Math.random() * (max - min + 1)) + min
            obj.lengthX = obj.isCar ? 3 : Math.floor(Math.random() * (8 - 3 + 1)) + 3
        } else {
            obj.posS = sp.at(-1).posS + Math.floor(Math.random() * (max - 2 + 1)) + 2
            obj.lengthX = obj.isCar ? 3 : Math.floor(Math.random() * (8 - 3 + 1)) + 3
        }
        sp.push(obj)
    }

    const updateSpawnElement = () => {
        sp.shift()
        let max = 15
        let obj = {
            uid: sp.at(-1).uid + 1,
            posX: rp[Math.floor(Math.random() * 4)],
            isCar: Math.random() < 0.85
        }


        if (sp.at(-1).posX === obj.posX) {
            let min = sp.at(-1).lengthX + 2
            obj.posS = sp.at(-1).posS + Math.floor(Math.random() * (max - min + 1)) + min
            obj.lengthX = obj.isCar ? 3 : Math.floor(Math.random() * (6 - 4 + 1)) + 4
        } else {
            obj.posS = sp.at(-1).posS + Math.floor(Math.random() * (max - 2 + 1)) + 2
            obj.lengthX = obj.isCar ? 3 : Math.floor(Math.random() * (6 - 4 + 1)) + 4
        }
        sp.push(obj)
    }

    const collisionCheck = (obj) => {
        if (obj.name === "spawnCar") {
            if (obj.position.z >= -3) {
                let Box = obj.boox
                var collision = state.carBox.intersectsBox(Box);
                if (collision == true) {
                    console.log("spawn car collision");
                }
            }
        } else {
            if (obj.position.z >= -3) {
                let Box = obj.boox
                var collision = state.carBox.intersectsBox(Box);
                if (collision == true) {
                    console.log("coin collision");
                }
            }
        }
    }


    useFrame((e) => {
        spawnCars.forEach((obj) => {
            obj.update(keyMap['speed'])
            collisionCheck(obj)
        })
        if (sp.length > 0 && (keyMap['distance'] >= sp[0].posS)) {
            let spawnElement = sp[0]
            updateSpawnElement()
            if (spawnElement.isCar) {
                createCar({
                    object: gltf.scene.clone(),
                    pos: {
                        x: spawnElement.posX, y: 0, z: -36
                    },
                    uid: spawnElement.uid
                })
            } else {
                for (let step = 0; step < spawnElement.lengthX; step++) {
                    createCoin({
                        object: coinGltf.scene.clone(),
                        pos: {
                            x: spawnElement.posX, y: .5, z: -36 - step
                        },
                        uid: `c${spawnElement.uid}-${step}`
                    })
                }
            }
        }

    })

}
