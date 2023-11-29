"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

export default function Channel() {

/* -----------------------------------------------------------------------------------*/
  let LoungeComponent = dynamic(() => import("./loungeComponent"), {
    ssr: false,
  });
  useEffect(() =>{
  },[])

  return (    
        <>
          {<LoungeComponent/>}
        </> 
  )
}
