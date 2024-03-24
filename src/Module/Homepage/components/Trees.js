import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useStore } from '@/state/useStore'

export const Trees = (props) => {
    const { scene } = useThree()
    const { scene: obj } = useGLTF('models/Tree.glb')
    const { gameStatus } = useStore()
    const treesArry = useRef([]);
    let min = 5.40
    let max = 10.50
    const { keyMap } = props

    function initTree(object) {
        for (let i = 4; i > -36; i -= 4.2) {
            const posX = (Math.random() * (max - min) + min).toFixed(2)
            const posX2 = (Math.random() * (max - min) + min).toFixed(2)
            createTreeModel({
                object: object.clone(),
                pos: {
                    x: -Math.abs(posX), y: 1.85, z: i
                },
                side: 1,
                uid: `tl${i}`
            })
            createTreeModel({
                object: object.clone(),
                pos: {
                    x: posX2, y: 1.85, z: i
                },
                side: 0,
                uid: `tr${i}`
            })

        }


    }


    function createTreeModel({
        object,
        pos = {
            x: -5.05, y: 0, z: 0
        },
        side = 1,
        uid
    }) {
        scene.add(object)
        let mesh = object
        mesh.position.set(pos.x, pos.y, pos.z)
        mesh.rotation.y = 1.57
        mesh.scale.set(1.5, 1.5, 1.5)
        mesh.side = side
        mesh.uid = uid
        const Am = scene.children.find(v => v.uid === uid)
        if (Am) {
            scene.remove(Am)
        }
        scene.add(mesh)
        mesh.update = (speed) => {

            if (mesh.position.z > 5.5) {
                treesArry.current = treesArry.current.filter((v) => {
                    return v.uid !== mesh.uid
                })
                scene.remove(mesh)
                const posX = (Math.random() * (max - min) + min).toFixed(2)
                let x = mesh.side ? -Math.abs(posX) : Math.abs(posX)
                createTreeModel({
                    object: object.clone(),
                    pos: {
                        x: x, y: 1.85, z: -36
                    },
                    side: mesh.side,
                    uid: mesh.uid
                })
            } else {
                mesh.position.z += speed

            }


        }
        treesArry.current.push(object)
    }

    useEffect(() => {
        treesArry.current = []
        initTree(obj)  
    }, [])

    useFrame(() => {
        if (gameStatus === 3) {
            treesArry.current.forEach((obj) => {
                obj.update(keyMap['speed'])
            })
        }
    })

}
