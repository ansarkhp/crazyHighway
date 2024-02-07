import React from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'



export const Trees = (props) => {
    const { scene } = useThree()
    const { scene: obj } = useGLTF('models/Tree.glb')
    let speed = 0.045
    const treesArry = []
    let min = 5.40
    let max = 10.50

    function initTree(object) {
        for (let i = 4; i > -36; i -= 3.2) {
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
    initTree(obj)
    

    function createTreeModel({
        object,
        pos = {
            x: -5.05, y: 0, z: 0
        },
        quat = {
            x: 0,
            y: 0,
            z: 0,
        },
        velocity = {
            x: 0,
            y: 0,
            z: 0,
        },
        side = 1,
        uid
    }) {
        scene.add(object)
        let mesh = object
        mesh.position.set(pos.x, pos.y, pos.z)
        mesh.rotation.y = 1.57
        mesh.scale.set(1.5, 1.5, 1.5)
        mesh.velocity = velocity
        mesh.side = side
        mesh.uid = uid
        const Am = scene.children.find(v => v.uid === uid)
        if (Am) {
            scene.remove(Am)
        }
        scene.add(mesh)
        mesh.update = (speed) => {
            mesh.velocity.z = speed
            mesh.position.z += speed

            if (mesh.position.z > 5.5) {
                var index = treesArry.indexOf(mesh);
                if (index !== -1) {
                    treesArry.splice(index, 1);
                }
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
            }


        }
        treesArry.push(object)
    }


    useFrame(() => (
        treesArry.forEach((obj) => {
            obj.update(speed)
        })
    ))

}
