import React, { useRef, useState } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF } from '@react-three/drei'



export const Dividers = (props) => {
    const {
        pos,
        scale,
        color = "#FFFFFF",
        physics = false,
        texture
    } = props
    // const dividerModel = useLoader(GLTFLoader, 'models/scene.gltf')
    // console.log(dividerModel);
    const { scene } = useGLTF('models/Fence.glb')
    // console.log(scene);
    const mesh = useRef(null);
    function scrollPage() {
        console.log('Heelo');
    }
    const dividerArry = []

    // function createStars() {
    //     let stars = []
    //     for (var i = 0; i < 100; i++) {
    //         var x = Math.floor(Math.random() * 10);
    //         var y = Math.floor(Math.random() * 10);
    //         var z = Math.floor(Math.random() * 10);
    //         stars[i] = [x, y, z]
    //     }
    //     return stars
    // }

    // const stars = createStars().map((cords, i) =>
    //     (<Star key={i} position={cords} color='white' />)
    // )
    // function createDividers() {
    //     for (let i = 4; i > -36; i -= 3.2) {
    //         // createDivider({
    //         //     object: scene.clone(),
    //         //     pos: {
    //         //         x: -5.05, y: 0, z: i
    //         //     }
    //         // })
    //         // createDivider({
    //         //     object: scene.clone(),
    //         //     pos: {
    //         //         x: 5.05, y: 0, z: i
    //         //     }
    //         // })
    //         <Divider object={i} position={cords} color='white' />
    //     }


    // }

    // function createStars() {
    //     let stars = []
    //     for (var i = 0; i < 100; i++) {
    //         var x = Math.floor(Math.random() * 10);
    //         var y = Math.floor(Math.random() * 10);
    //         var z = Math.floor(Math.random() * 10);
    //         stars[i] = [x, y, z]
    //     }
    //     return stars
    // }

    // const stars = [0].map((cords, i) =>
    //     (<Divider key={i} position={cords} color='white' />)
    // )
    const numModels = 10; // Change this to the number of models you want

    const generateRandomPosition = () => [
        Math.random() * 10 - 5, // X position between -5 and 5
        Math.random() * 10 - 5, // Y position between -5 and 5
        Math.random() * 10 - 5  // Z position between -5 and 5
    ];
    // console.log(generateRandomPosition);

    function initDivider(object) {
        for (let i = 4; i > -36; i -= 3.2) {
            // createDivModel({
            //     object: object.scene.clone(),
            //     pos: {
            //         x: -5.05, y: 0, z: i
            //     }
            // })
            // createDivModel({
            //     object: object.scene.clone(),
            //     pos: {
            //         x: 5.05, y: 0, z: i
            //     }
            // })
            // console.log("i", i);

            dividerArry.push(<Divider
                index={i + "l"}
                key={i + "l"}
                object={object}
                pos={[- 5.05, 0, i]} />)
            dividerArry.push(<Divider
                index={i + "r"}
                object={object}
                pos={[5.05, 0, i]} />)
            console.log(dividerArry);
        }


    }
    initDivider(scene)
    return (
        <>
            {
                dividerArry
            }
        </>
    )


}

const Divider = ({ object, pos }) => {
    const mesh = useRef(null);
    useFrame(() => (mesh.current.position.z += 0.045));
    return (
        <>
            <primitive
                ref={mesh}
                object={object.clone()}
                position={pos}
                rotation={[0, 1.57, 0]}
                scale={[.5, .5, .5]}
            />
        </>
    );
}