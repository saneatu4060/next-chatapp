"use client";

import * as THREE from 'three'
import { useEffect, useRef, forwardRef,Suspense} from 'react'
import { Canvas, } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import { isVideoInputReadyState, isAudioInputReadyState} from "@/lib/context";
import { useRecoilState } from 'recoil';

// export const App = ({ images }) => (
//     <>
//     <Canvas style={{ width: "100vw", height: "100vh" }} dpr={[1, 1.5]} camera={{ fov: 90, position: [0, 4, 15] }}>
//         <color attach="background" args={['#191920']} />
//         <group position={[0, 0.5, 1]}>
//         <Frames images={images} />
//         </group>
//         {/* <Scene/> */}
//         <PointerLockControls 
//         maxPolarAngle={Math.PI/2} 
//         minPolarAngle={Math.PI/2} 
//         pointerSpeed={0.3}/>
//     </Canvas>
//     </>

// )

// function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
//   const ref = useRef()
//   return <group ref={ref}>{images.map((props) => <Frame  {...props} /> )}</group>
// }

// function Frame({ c = new THREE.Color(), ...props }) {
//   const frame = useRef()

//   return (
//     <>
//     <group {...props}>
//       <mesh scale={[3, 4, 0.1]} position={[0, 1, 0]}>
//         <mesh ref={frame}  scale={[2, 1.5, 0.05]} position={[0 , 0 , 0]}>
//           <boxGeometry />
//         </mesh>
//       </mesh>
//     </group>
//     </>

//   )
// }

type MyVideoProps = {
  myName: string;
};

const ThreeComponent = forwardRef<HTMLElement, MyVideoProps>((props, ref) => {
  const [_isVideoInputReady, setIsVideoInputReady] = useRecoilState(isVideoInputReadyState);
  const [_isAudioInputReady, setIsAudioInputReady] = useRecoilState(isAudioInputReadyState);
  const CANVAS_SIZE = { width: 300, height: 200 };
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    (async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: CANVAS_SIZE.width,
          height: CANVAS_SIZE.height,
        },
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

  return (
    <>
    {/* <Canvas>
      <Suspense>
      <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          src=""
          className=" w-canvas h-canvas"
        />
      <PointerLockControls 
        maxPolarAngle={Math.PI/2} 
        minPolarAngle={Math.PI/2} 
        pointerSpeed={0.3}/>
      </Suspense>
    </Canvas> */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          src=""
          className=" w-canvas h-canvas"
        />
    </>

      )
});

ThreeComponent.displayName = 'ThreeComponent'
export default ThreeComponent;

