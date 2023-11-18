"use client";
// import "./style.css";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { myChannelNameState} from "@/lib/context";
import { useRecoilState } from 'recoil';
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
export default function Channel() {

/* -----------------------------------------------------------------------------------*/
  // let ViewComponent = dynamic(() => import("./viewComponent"), {
  //   ssr: false,
  // });
  let canvas: HTMLElement;
  useEffect(() =>{
  },[])

  const [myChannelName] = useRecoilState(myChannelNameState);



  return (    
        < >
          {/* {<ViewComponent/>} */}
          {/* <canvas id="canvas"></canvas> */}
          <div className="text-center">{myChannelName}</div>
        </> 
  )
}
