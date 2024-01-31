// 'use client'
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as CANNON from 'cannon-es'
import { useImmer } from "use-immer";
// import { lightsControls } from './lightsControls';
import { basicWorld } from './basicWorld';



const lightsControls = dynamic(
    () => {
        return import("../hooks/lightsControls");
    },
    { ssr: false }
);



export const useHome = () => {
    // console.log(lightsControls);

    var mountRef = React.useRef(null);
    const [state, setState] = useImmer({
        distance: 0,
        speed: 0.03,
    })

    // Graphics variables

    let renderer;
    let stats;
    // let distance = 0
    useEffect(() => {

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);

        scene.add(cube);
        camera.position.z = 5;

        window.addEventListener('keydown', (e) => {
            carControl(e.code, {})

        })

        var animate = function () {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
           
        }

        let onWindowResize = function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener("resize", onWindowResize, false);

        animate();

        return () => mountRef.current.removeChild(renderer.domElement);
    }, []);

    console.log("hello", state.speed);

    const changeDis = () => {
        setState((draft) => {
            draft.distance = draft.distance += draft.speed
        });
    }

    const carControl = (key, mesh) => {
        // console.log(sphereBody, sphereBody.position.x, sphereBody.position.x - .2);
        if (key === "ArrowLeft") {
            // mesh.position.x = mesh.position.x - .1
        }
        if (key === "ArrowRight") {
            // mesh.position.x = mesh.position.x + .1

        }
        // console.log(key);
        if (key === "ArrowUp") {
            setState((draft) => {
                draft.speed = draft.speed += 0.005
            });

            // speed += .05
            // console.log(speed, speed += .05);
        }
        if (key === "ArrowDown") {
            setState((draft) => {
                draft.speed = draft.speed -= 0.005
            });

        }
    }

    useEffect(()=>{
        setState((draft) => {
            draft.distance = draft.distance += draft.speed
        });
    },[state])



    return {
        state,
        mountRef,
        speed1: state.speed
    };
};
