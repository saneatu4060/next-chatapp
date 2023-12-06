
"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import WebCamTexture from "./screenComponent";






export default function Channel_2() {

/* -----------------------------------------------------------------------------------*/
let ThreeComponent = dynamic(() => import("./screenComponent"), {
  ssr: false,
});
useEffect(() =>{
},[])

return (    
      <>
        {<WebCamTexture/>}
      </> 
 )
}
