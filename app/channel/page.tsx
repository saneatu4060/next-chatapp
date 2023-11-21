"use client";
// import "./style.css";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { myChannelNameState} from "@/lib/context";
import { useRecoilState } from "recoil";
import { useRef, useState } from "react";
import { App } from "./threeComponent";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";




const images = [

  // Back
  { position: [-4.25, 0, 3], rotation: [0, 0, 0]},
  { position: [4.25, 0, 3], rotation: [0, 0, 0]},
  // Left
  { position: [-8.25, 0,8], rotation: [0, Math.PI / 2, 0]},
  // Right
  { position: [8.25, 0, 8], rotation: [0, -Math.PI / 2, 0]}
]


export default function Channel() {

/* -----------------------------------------------------------------------------------*/
  let LoungeComponent = dynamic(() => import("./loungeComponent"), {
    ssr: false,
  });
  useEffect(() =>{
  },[])



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
          {<LoungeComponent/>}
          {/* <Canvas style={{ width: "100vw", height: "100vh" }}>
            <Sphere position={[1,1,1]}/>
            <OrbitControls/>
          </Canvas> */}
          {/* <App images={images}/>             */}
        </> 
  )
}
