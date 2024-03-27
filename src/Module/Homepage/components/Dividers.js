import React, { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useStore } from '@/state/useStore'

export const Dividers = (props) => {
    const { scene } = useThree()
    const { scene: obj } = useGLTF('models/Fence.glb')
    const dividerArry = useRef([]);
    const gameStatus = useStore(s => s.gameStatus)
    const { keyMap } = props


    function initDivider(obj) {
        for (let i = 4; i > -36; i -= 3.2) {
            createDivModel({
                object: obj.clone(),
                pos: {
                    x: -5.05, y: 0, z: i
                },
                uid: `l${i}`
            })
            createDivModel({
                object: obj.clone(),
                pos: {
                    x: 5.05, y: 0, z: i
                },
                uid: `r${i}`
            })
        }


    }

    function createDivModel({
        object,
        pos = {
            x: -5.05, y: 0, z: 0
        },
        uid
    }) {
        let mesh = object
        mesh.position.set(pos.x, pos.y, pos.z)
        mesh.rotation.y = 1.57
        mesh.scale.set(.5, .5, .5)
        mesh.uid = uid
        const Am = scene.children.find(v => v.uid == uid)
        if (Am) {
            scene.remove(Am)
        }
        scene.add(mesh)

        mesh.update = (speed) => {

            if (mesh.position.z > 5.5) {
                dividerArry.current = dividerArry.current.filter((v) => {
                    return v.uid !== mesh.uid
                })

                createDivModel({
                    object: object.clone(),
                    pos: {
                        x: mesh.position.x, y: 0, z: (-36 - 3.2) + 3.2
                    },
                    uid: mesh.uid
                })
                scene.remove(mesh)
            } else {
                mesh.position.z += speed
            }
        }
        dividerArry.current.push(object)
    }

    useEffect(() => {
        dividerArry.current = []
        initDivider(obj)
    }, [])

    useFrame(() => {
        if (gameStatus === 3) {
            dividerArry.current.forEach((obj) => {
                obj.update(keyMap['speed'])
            })
        }
    })

}
