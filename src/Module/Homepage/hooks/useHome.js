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
    

};
