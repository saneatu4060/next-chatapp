// "use client";
// // import { Face } from "kalidokit";
// import { WebGLRenderer } from "three";
// import { useState, useEffect, useRef, forwardRef, ChangeEvent } from "react";
// import * as THREE from "three";
// // import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// // import { VRM, VRMLoaderPlugin } from "@pixiv/three-vrm";
// // import * as Tone from "tone";

// import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"
// import { useRecoilState } from "recoil";
// import { isVideoInputReadyState, isAudioInputReadyState, myVoicePitchState, isMyVoiceCheckEnableState } from "@/lib/context";



// export default function threeComponent  ()  {
// //   const videoRef = useRef<HTMLVideoElement>(null);
// //   const audioRef = useRef<HTMLVideoElement>(null);
// //   const meshCanvasRef = useRef<HTMLCanvasElement>(null);
// //   const requestAnimationFrameRef = useRef<number>(0);
// //   const CANVAS_SIZE = { width: 300, height: 200 };
// //   const [pitchShifter, setPitchShifter] = useState<Tone.PitchShift>();
// //   const [lastVideoTime, setLastVideoTime] = useState(-1);
// //   const [myVoicePitch, setMyVoicePitch] = useRecoilState(myVoicePitchState);
// //   const [isMyVoiceCheckEnable, setIsMyVoiceCheckEnable] = useRecoilState(isMyVoiceCheckEnableState);

//   /**
//    *  シーン
//    **/
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xffffff);
//     scene.fog = new THREE.Fog(0xffffff, 0, 750);
    
//     /**
//      *  カメラ
//      **/
//     const camera = new THREE.PerspectiveCamera(
//         50,
//         innerWidth / innerHeight,
//         0.1,
//         2000
//     );
//     camera.position.set(0, 1, 2);
    
    
    
//     /**
//      *  レンダラー
//      **/
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);
    
    
    
    
//     //FPS視点設定
//     const controls = new PointerLockControls(camera,renderer.domElement);
//     window.addEventListener("click",()=>{
//         controls.lock();
//         controls.maxPolarAngle = Math.PI/2;
//     });
    
    
//     /**
//      * オブジェクト生成
//      **/
//     const planeGeometry = new THREE.PlaneGeometry(400, 400, 400, 400);
//     const material = new THREE.MeshBasicMaterial({
//         color: "gray",
//         wireframe: true,
//     });
//     const plane = new THREE.Mesh(planeGeometry, material);
//     plane.rotateX(-Math.PI / 2);
//     scene.add(plane);
    
    
    
//     function animate() {
//         requestAnimationFrame(animate);
//         renderer.render(scene, camera);
//     }
    
//     animate();
    
//     /**
//      * 画面リサイズ設定
//      **/
//     window.addEventListener("resize", onWindowResize);
//     function onWindowResize() {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//     }

//   return (
//     <section>
//         <body>
//             <div id="app"></div>
//         </body>
//     </section>
//   );
// };


