
"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
// import { myChannelNameState} from "@/lib/context";
// import { useRecoilState } from "recoil";
import { useRef, useState } from "react";
// import { App } from "./threeComponent";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";







export default function Channel_2() {

/* -----------------------------------------------------------------------------------*/
function Sphere(props){
 const ref= useRef() 
 return(
  <mesh
  {...props}
  ref={ref}>
  <sphereGeometry args={[0.75, 64, 64]}/>
  <meshStandardMaterial color={"red"}/>
 </mesh>
 )

}




  return (    

        <>
        <Canvas style={{ width: "100vw", height: "100vh" }}>
            <Sphere position={[1,1,1]}/>
            <OrbitControls/>
        </Canvas> 
        <h1>channel_2です</h1>
        </> 
  )
}
