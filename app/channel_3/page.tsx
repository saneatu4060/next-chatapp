"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";


export default function Channel_3() {

/* -----------------------------------------------------------------------------------*/
let MeetingRoom= dynamic(() => import("./meetingRoom"), {
  ssr: false,
});
useEffect(() =>{
},[])

return (    
      <>
        <MeetingRoom/>
      </> 
 )
}
