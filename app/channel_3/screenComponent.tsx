"use client";
import { useEffect, useRef, forwardRef, useState} from "react";
import { useRecoilState } from "recoil";
import { isVideoInputReadyState, isAudioInputReadyState} from "@/lib/context";
import { VideoTexture , Mesh} from "three";
import { Canvas } from "@react-three/fiber";
type ScreenProps = {
  myName: string;
};
const ScreenComponent = forwardRef<HTMLElement, ScreenProps>((props, ref) => {
  const CANVAS_SIZE = { width: 300, height: 200 };
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [_isVideoInputReady, setIsVideoInputReady] = useRecoilState(isVideoInputReadyState);
  const [_isAudioInputReady, setIsAudioInputReady] = useRecoilState(isAudioInputReadyState);
//   const [videoTexture, setVideoTexture] = useState<VideoTexture>();
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
//   const screenRendering = async (mediaStream:MediaStream)=>{
//     const videoTexture = new VideoTexture(videoRef.current!);
//     setVideoTexture(videoTexture);
//     videoRef.current!.srcObject = new MediaStream(
//         mediaStream.getVideoTracks()
//     )
//     setIsVideoInputReady(true);
//   }
//   interface WebcamBoxProps {
//     videoTexture: VideoTexture | undefined;
//   }
//   const WebcamBox =({videoTexture}:WebcamBoxProps)=>{
//     const boxMeshRef = useRef<Mesh>();
//     return(
//         <mesh>
//             <boxGeometry args={[1,1,1]}/>
//             <meshBasicMaterial map={videoTexture}/>
//         </mesh>
//     )
//   }
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
          className="screen"
        />
        {/* <Canvas className="screen">
            <WebcamBox videoTexture={videoTexture}/>
        </Canvas> */}
      </div>
      <div className="relative border-2 border-gray-700 rounded-lg p-3">
        <h3>Voice Pitch</h3>
        <audio className="sound" ref={audioRef} autoPlay src=""  />
      </div>
    </section>
  );
});
ScreenComponent.displayName = 'ScreenComponent'
export default ScreenComponent;