import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export const Road = (props) => {
    const {
        keyMap,
    } = props
    const { scene } = useThree()
    let roadArry = []


    const material = new THREE.MeshBasicMaterial({ color: 0xc8c8c8 });
    const geometry = new THREE.BoxGeometry(1, 1);

    function initRoadline() {
        for (let i = 4; i > -36; i -= 4.2) {

            createRoad({
                pos: {
                    x: -2.5, y: .001, z: i
                },
                side: 1,
                uid: `lrl${i}`
            })
            createRoad({
                pos: {
                    x: 2.5, y: .001, z: i
                },
                side: 0,
                uid: `rrl${i}`
            })

        }


    }
    initRoadline()


    function createRoad({
        pos = {
            x: 0, y: 0, z: 0
        },
        uid = "",
    }) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh
        mesh.uid = uid
        const Am = scene.children.find(v => v.uid === uid)
        if (Am) {
            scene.remove(Am)
        }


        mesh.position.set(pos.x, pos.y, pos.z); // Adjust position as needed
        mesh.scale.set(.2, 0, 2.5); // Adjust scale as needed

        scene.add(mesh);


        mesh.update = (speed) => {
            mesh.position.z += speed

            if (mesh.position.z > 5.5) {
                var index = roadArry.indexOf(mesh);
                if (index !== -1) {
                    roadArry.splice(index, 1);
                }
                createRoad({
                    pos: {
                        x: mesh.position.x, y: mesh.position.y, z: -36
                    },
                    uid: mesh.uid
                })
                scene.remove(mesh)
            }
        }

        roadArry.push(mesh)

    }

    function createCentralLine() {

        const material = new THREE.MeshBasicMaterial({ color: 0xc8c8c8 });
        const geometry = new THREE.BoxGeometry(1, 1);

        const mesh = new THREE.Mesh(geometry, material);
        mesh.uid = "rcl"
        const Am = scene.children.find(v => v.uid === "rcl")
        if (Am) {
            scene.remove(Am)
        }


        mesh.position.set(0, .001, -15); // Adjust position as needed
        mesh.scale.set(.2, 0, 40); // Adjust scale as needed

        scene.add(mesh);
    }
    createCentralLine()

    useFrame((e) => {
        try {
            roadArry.forEach((obj) => {
                obj.update(keyMap['speed'])
            })
        } catch (error) {
            console.log(error);
        }


    })

}
