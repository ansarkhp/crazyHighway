import React, { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useStore, useStore2 } from '@/state/useStore'

export const SpawnCars = (props) => {
    const { scene } = useThree()
    const gltf = useGLTF('models/race.glb')
    const coinGltf = useGLTF('models/coin.glb')
    let audio = new Audio('sound/coin-collide.wav')
    let crashSound = new Audio('sound/crash_sound.mp3')

    const { keyMap, state } = props
    let spawnCars = useRef([]);
    let collidedCoinArry = useRef([]);
    const gameStatus = useStore(s => s.gameStatus)
    const setGameStatus = useStore(s => s.setGameStatus)
    let rp = [-3.75, -1.25, 1.25, 3.7]

    const sp = useRef([{ uid: 0, posX: rp[Math.floor(Math.random() * 4)], isCar: true, posS: 0, lengthX: 3 }])
    const collidedCoins = useStore((state) => state.collidedCoins)
    const setCoinCollided = useStore((state) => state.setCoinCollided)
    const musicEnabled = useStore(s => s.musicEnabled)
    const highScore = useStore2(s => s.highScore)
    const setHighScore = useStore2(s => s.setHighScore)



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


            if (carMesh.position.z > 5.5) {

                spawnCars.current = spawnCars.current.filter((v) => {
                    return v.uid !== carMesh.uid
                })
                const Alm = scene.children.find(v => v.uid === `${uid}box`)
                if (Alm) {
                    scene.remove(Alm)
                }
                scene.remove(carMesh)
            } else {
                carMesh.position.z += speed
                carMesh.boox.setFromObject(carMesh)
            }
        }

        let carBox = new THREE.Box3().setFromObject(carMesh);
        // let helper = new THREE.Box3Helper(carBox, new THREE.Color(0, 255, 0));
        // helper.uid = `${uid}box`

        // const Alm = scene.children.find(v => v.uid === `${uid}box`)
        // if (Alm) {
        //     scene.remove(Alm)
        // }
        // scene.add(helper);
        carMesh.boox = carBox

        spawnCars.current.push(carMesh)


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

            if (carMesh.position.z > 5.5) {
                spawnCars.current = spawnCars.current.filter((v) => {
                    return v.uid !== carMesh.uid
                })

                collidedCoinArry.current = collidedCoinArry.current.filter((v) => {
                    return v.uid !== carMesh.uid
                })

                const Alm = scene.children.find(v => v.uid === `${uid}box`)
                if (Alm) {
                    scene.remove(Alm)
                }
                scene.remove(carMesh)
            } else {
                carMesh.position.z += speed
                carMesh.rotation.y -= 0.02;
                carMesh.boox.setFromObject(carMesh)
            }
        }
        carMesh.collideUpdate = (speed) => {

            carMesh.position.y += speed
        }

        let carBox = new THREE.Box3().setFromObject(carMesh);
        // let helper = new THREE.Box3Helper(carBox, new THREE.Color(0, 255, 0));
        // helper.uid = `${uid}box`

        // const Alm = scene.children.find(v => v.uid === `${uid}box`)
        // if (Alm) {
        //     scene.remove(Alm)
        // }
        // scene.add(helper);
        carMesh.boox = carBox

        spawnCars.current.push(carMesh)

    }

    useEffect(() => {
        if (gameStatus === 2) {
            spawnCars.current.forEach((v) => {
                scene.remove(v)
            })
            console.log(spawnCars);
            sp.current = [{ uid: 0, posX: rp[Math.floor(Math.random() * 4)], isCar: true, posS: 0, lengthX: 3 }]
            spawnCars.current = []
            collidedCoinArry.current = []


            for (let step = 0; step < 100; step++) {
                let max = 15
                let obj = {
                    uid: step + 1,
                    posX: rp[Math.floor(Math.random() * 4)],
                    isCar: Math.random() < 0.85,
                }


                if (sp.current.at(-1).posX === obj.posX) {
                    let min = sp.current.at(-1).lengthX
                    obj.posS = sp.current.at(-1).posS + Math.floor(Math.random() * (max - min + 1)) + min
                    obj.lengthX = obj.isCar ? 3 : Math.floor(Math.random() * (8 - 3 + 1)) + 3
                } else {
                    obj.posS = sp.current.at(-1).posS + Math.floor(Math.random() * (max - 2 + 1)) + 2
                    obj.lengthX = obj.isCar ? 3 : Math.floor(Math.random() * (8 - 3 + 1)) + 3
                }
                sp.current.push(obj)
            }
        }
    }, [gameStatus])

    // spawn x position calculate fun
    // scene.traverse(function (child) {
    //     if (child.name === "road") {
    //         let ls = child.position.x - (child.scale.x / 2)
    //         let a = child.scale.x / 4
    //         for (let i = 1; i < 5; i++) {
    //             rp.push(ls + (i * a) - (a / 2))
    //         }
    //     }
    // });

    const updateSpawnElement = () => {
        sp.current.shift()
        let max = 15
        let obj = {
            uid: sp.current.at(-1).uid + 1,
            posX: rp[Math.floor(Math.random() * 4)],
            isCar: Math.random() < 0.85
        }


        if (sp.current.at(-1).posX === obj.posX) {
            let min = sp.current.at(-1).lengthX + 2
            obj.posS = sp.current.at(-1).posS + Math.floor(Math.random() * (max - min + 1)) + min
            obj.lengthX = obj.isCar ? 3 : Math.floor(Math.random() * (6 - 4 + 1)) + 4
        } else {
            obj.posS = sp.current.at(-1).posS + Math.floor(Math.random() * (max - 2 + 1)) + 2
            obj.lengthX = obj.isCar ? 3 : Math.floor(Math.random() * (6 - 4 + 1)) + 4
        }
        sp.current.push(obj)
    }

    const collisionCheck = (obj) => {
        if (obj.name === "spawnCar") {
            if (obj.position.z >= -3) {
                let Box = obj.boox
                var collision = state.carBox.intersectsBox(Box);
                if (collision == true) {
                    setGameStatus(6)
                    if (collidedCoins.length > highScore) {
                        GamePix.happyMoment()
                        setHighScore(collidedCoins.length)
                    }
                    if (musicEnabled) crashSound.play()
                    // console.log("spawn car collision");
                }
            }
        } else {
            if (obj.position.z >= -3) {
                let Box = obj.boox
                var collision = state.carBox.intersectsBox(Box);
                if (collision == true) {
                    if (!collidedCoins?.some((e) => e === obj.uid)) {
                        if (musicEnabled) {
                            audio.cloneNode(true).play();
                        }
                    }
                    if (collidedCoins) {
                        function onlyUnique(value, index, self) {
                            return self.indexOf(value) === index;
                        }
                        var unique = [...collidedCoins, obj.uid].filter(onlyUnique);
                        if (unique.length !== collidedCoins.length) {
                            setCoinCollided(unique)
                            collidedCoinArry.current = [...collidedCoinArry.current, obj].filter(onlyUnique);
                        }
                    } else {
                        setCoinCollided([obj.uid])
                        collidedCoinArry.current = [obj]
                    }
                }
            }
        }
    }


    useFrame(() => {
        if (gameStatus === 3) {

            spawnCars.current.forEach((obj) => {
                obj.update(keyMap['spf'])
                collisionCheck(obj)
            })
            collidedCoinArry.current.forEach((obj) => {
                obj.collideUpdate(keyMap['spf'])
            })
            if (sp.current.length > 0 && (keyMap['distance'] >= sp.current[0].posS)) {
                let spawnElement = sp.current[0]
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
        }
    })

}
