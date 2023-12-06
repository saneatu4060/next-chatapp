"use client";

import { useEffect, useRef, forwardRef, useState} from "react";
import { useRecoilState } from "recoil";
import { isVideoInputReadyState, isAudioInputReadyState} from "@/lib/context";
import { VideoTexture } from "three";
import { Canvas } from "@react-three/fiber";


type MyVideoProps = {
  myName: string;
};

const MyVideo = forwardRef<HTMLElement, MyVideoProps>((props, ref) => {
  const CANVAS_SIZE = { width: 300, height: 200 };
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [_isVideoInputReady, setIsVideoInputReady] = useRecoilState(isVideoInputReadyState);
  const [_isAudioInputReady, setIsAudioInputReady] = useRecoilState(isAudioInputReadyState);


  useEffect(() => {
    
    (async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width:CANVAS_SIZE.width,
          height:CANVAS_SIZE.height
        }
      });
      videoRef.current!.srcObject = new MediaStream(
        mediaStream.getVideoTracks()
      );
      setIsVideoInputReady(true);
      audioRef.current!.srcObject = new MediaStream(
        mediaStream.getAudioTracks()
      );
      setIsAudioInputReady(true);
      
    })();
  }, []);

interface BoxWithVideoProps{
    position: [number, number, number];
    // rotation: [number, number, number];
}
const VideoBox =({position}:BoxWithVideoProps)=>{
  const [texture,setTexture] = useState<VideoTexture>();
  const video = MyVideo.current
  useEffect(()=>{
    if(video){
      const videoTexture = new VideoTexture(video);
      setTexture(videoTexture)
    }
  },[video]);
  return (
    <mesh position={position}>
      <boxGeometry args={[2,2,0]}/>
      {texture&&(
        <meshBasicMaterial map={texture}/>
      )}
    </mesh>
  )
}




  return (
    <section ref={ref}>
      <a href="/">
        <div className="bg-yellow-500 rounded-lg mb-2 text-center hover:bg-yellow-200 cursor">
          トップページに戻る
        </div>
      </a>
      <div className="border-2 border-gray-700 rounded-lg mb-2 text-center">
        <h3 className="p-3 pb-0">あなたは : <span className="font-bold">{props.myName}</span></h3>
      </div>
      <div className="relative border-2 border-gray-700 rounded-lg mb-2 text-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          src=""
          className=" w-canvas h-canvas"
        />
        {/* <Canvas style={{ width: "10vw", height: "10vh" }}>
          <VideoBox position={[2,0,0]}/>
          <VideoBox position={[-2,0,0]}/>
          <VideoBox position={[0,0,0]}/>
        </Canvas> */}
      </div>
      <div className="relative border-2 border-gray-700 rounded-lg p-3">
        <h3>Voice Pitch</h3>
        <audio className="refMyVoice" ref={audioRef} autoPlay src=""   />
      </div>
    </section>
  );
});
MyVideo.displayName = 'myVideo'
export default MyVideo;
