import React, { useRef, useState } from 'react'



export const Terrain = (props) => {
    const {
        pos,
        scale,
        color = "#FFFFFF",
        physics = false,
        texture,
        name = ""
    } = props
    return (
        <>
            <mesh name={name} position={[pos[0], pos[1], pos[2]]} scale={[scale[0], scale[1], scale[2]]}>
                {/*
          The thing that gives the mesh its shape
          In this case the shape is a flat plane
        */}
                <boxGeometry />
                {/*
          The material gives a mesh its texture or look.
          In this case, it is just a uniform green
        */}
                <meshBasicMaterial color={color} />
            </mesh>
        </>

    )
}
