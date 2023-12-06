"use client";

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three'
import { BoxGeometry, DirectionalLight, Mesh, MeshPhongMaterial, PerspectiveCamera, VideoTexture, WebGLRenderer } from 'three';
interface BoxWithVideoProps{
    videoTexture: THREE.VideoTexture;
    position: [number, number, number];
    rotation: [number, number, number];
}
const BoxWithVideo=({videoTexture,position,rotation}:BoxWithVideoProps) => {
  const boxRef = useRef<Mesh>(null);
  return (
    <mesh ref={boxRef} position={position} rotation={rotation}>
      <boxGeometry args={[2, 1.6, 0]} />
      <meshPhongMaterial map={videoTexture} />
    </mesh>
  );
};
const WebCamTexture = () => {
  const videoTextureRef = useRef<THREE.VideoTexture>(null);
  const boxWithVideoRef = useRef<Mesh>(null);
  useEffect(() => {
    (async () => {

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        console.log(stream); // 追加
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;


        videoTextureRef.current = new THREE.VideoTexture(video);
        videoTextureRef.current.minFilter = THREE.LinearFilter;
        if (boxWithVideoRef.current) {
          boxWithVideoRef.current.material.map = videoTextureRef.current;
          console.log("映像取得できています")
        }

    })()

  }, [boxWithVideoRef]);
  return (
    <>
    <video></video>
        <Canvas style={{ width: "100vw", height: "100vh" }}>
        <ambientLight />
        <directionalLight position={[0, 10, 10]} intensity={1} />
        <BoxWithVideo videoTexture={videoTextureRef.current} position={[-1, 0, 2]} rotation={[0,Math.PI/13,0]} />
        <BoxWithVideo videoTexture={videoTextureRef.current} position={[1, 0, 2]} rotation={[0,-Math.PI/13,0]} />
        <BoxWithVideo videoTexture={videoTextureRef.current} position={[-2.75, 0,3]} rotation={[0,Math.PI/4,0]}/>
        <BoxWithVideo videoTexture={videoTextureRef.current} position={[2.75, 0, 3]} rotation={[0,-Math.PI/4,0]}/>
        <PointerLockControls
        maxPolarAngle={Math.PI/2}
        minPolarAngle={Math.PI/1.3}/>
        </Canvas>
    </>
  );
};
export default WebCamTexture;