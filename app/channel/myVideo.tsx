"use client";

import { useState, useEffect, useRef, forwardRef, ChangeEvent } from "react";



// import * as Tone from "tone";
import { useRecoilState } from "recoil";
import { isVideoInputReadyState, isAudioInputReadyState, myVoicePitchState, isMyVoiceCheckEnableState } from "@/lib/context";
import { DisplayP3ColorSpace } from "three";

type MyVideoProps = {
  myName: string;
};

const MyVideo = forwardRef<HTMLElement, MyVideoProps>((props, ref) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLVideoElement>(null);

  const requestAnimationFrameRef = useRef<number>(0);

//   const [pitchShifter, setPitchShifter] = useState<Tone.PitchShift>();

  const [myVoicePitch, setMyVoicePitch] = useRecoilState(myVoicePitchState);
  const [isMyVoiceCheckEnable, setIsMyVoiceCheckEnable] = useRecoilState(isMyVoiceCheckEnableState);
  const [_isVideoInputReady, setIsVideoInputReady] = useRecoilState(isVideoInputReadyState);
  const [_isAudioInputReady, setIsAudioInputReady] = useRecoilState(isAudioInputReadyState);



  useEffect(() => {
    
    (async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width:300,
          height:200
        }
      });
      videoRef.current!.srcObject = new MediaStream(
        mediaStream.getVideoTracks()
      );
      initializeVoiceChanger(mediaStream);
      setIsVideoInputReady(true);
    })();
    return () => cancelAnimationFrame(requestAnimationFrameRef.current);
  }, []);

  const initializeVoiceChanger = async (mediaStream: MediaStream) => {
    // const micAudio = new Tone.UserMedia();
    // await micAudio.open();
    // const shifter = new Tone.PitchShift(myVoicePitch);
    // micAudio.connect(shifter);
    // setPitchShifter(shifter);

    // const effectedDest = Tone.context.createMediaStreamDestination();
    // shifter.connect(effectedDest);

    // const oldTrack = mediaStream.getAudioTracks()[0];
    // mediaStream.removeTrack(oldTrack);
    // const effectedTrack = effectedDest.stream.getAudioTracks()[0];
    // mediaStream.addTrack(effectedTrack);
    audioRef.current!.srcObject = new MediaStream(mediaStream.getAudioTracks());
    setIsAudioInputReady(true)
  };


//   const handleVoicePitch = (e: ChangeEvent<HTMLInputElement>) => {
//     setMyVoicePitch(parseFloat(e.target.value));
//     if (pitchShifter) {
//       pitchShifter.pitch = parseFloat(e.target.value);
//     }
//   };

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

        {/* <canvas className="absolute w-canvas h-canvas" ref={meshCanvasRef} /> */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          src=""
          className=" w-canvas h-canvas"
        />
      </div>
      <div className="relative border-2 border-gray-700 rounded-lg p-3">
        <h3>Voice Pitch</h3>
        <audio className="refMyVoice" ref={audioRef} autoPlay src="" muted={!isMyVoiceCheckEnable}  />
        <input
          type="range"
          min="-20"
          max="20"
          step="0.5"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mb-3"
          defaultValue={myVoicePitch}
        //   onChange={handleVoicePitch}
        />
        <div className="flex items-center">
          <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500focus:ring-2" checked={isMyVoiceCheckEnable} onChange={() => setIsMyVoiceCheckEnable(!isMyVoiceCheckEnable)} />
          <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-600">自分の声を聞いて確認</label>
        </div>
      </div>
    </section>
  );
});
MyVideo.displayName = 'myVideo'
export default MyVideo;
