
"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRef, useState } from "react";
// import { ThreeComponent } from "./threeComponent"
import { Canvas } from "@react-three/fiber";




// const images = [

//   // Back
//   { position: [-3, 0, 3], rotation: [0, Math.PI / 8, 0]},
//   { position: [3, 0, 3], rotation: [0, -Math.PI / 8, 0]},
//   // Left
//   { position: [-7.5, 0,7], rotation: [0, Math.PI / 3, 0]},
//   // Right
//   { position: [7.5, 0, 7], rotation: [0, -Math.PI / 3, 0]}
// ]

export default function Channel_2() {

/* -----------------------------------------------------------------------------------*/
let ThreeComponent = dynamic(() => import("./threeComponent"), {
  ssr: false,
});
useEffect(() =>{
},[])

return (    
      <>
        {<ThreeComponent/>}
      </> 
)
}
