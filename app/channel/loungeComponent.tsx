"use client";
import toast from "react-hot-toast";
import { useEffect, useState, useLayoutEffect, useRef, ReactNode } from "react";
import {
  SkyWayContext,
  SkyWayChannel,
  LocalPerson,
  Channel,
  LocalVideoStream,
  Publication,
  RemoteVideoStream,
  RemoteAudioStream,
  MemberJoinedEvent,
  MemberLeftEvent,
  RemoteMember,
  LocalAudioStream,
} from "@skyway-sdk/core";
import { faker } from "@faker-js/faker/locale/ja";
import { useRecoilState } from "recoil";
import {
  skywayTokenState,
  myChannelNameState,
  skywayJwtForTokenState,
  isVideoInputReadyState,
  isAudioInputReadyState,
} from "@/lib/context";
import { CHANNEL_MAPPINGS } from "@/lib/roomInfo";
import MyVideo from "./myVideo";
import { validSkywayToken } from "@/lib/skyway";
import { Canvas } from "@react-three/fiber";
import { VideoTexture } from "three";
import { PointerLockControls } from "@react-three/drei";
import { extend } from "@react-three/fiber";

extend({ PointerLockControls });
type MemberInfo = { memberId: string; memberName: string };
export default function LoungeComponent() {
  const [skywayToken, setSkywayToken] = useRecoilState(skywayTokenState);
  const [skywayJwtForToken, setSkywayJwtForToken] = useRecoilState(
    skywayJwtForTokenState
  );
  const [myChannelName] = useRecoilState(myChannelNameState);
  const [memberList, setMemberList] = useState<MemberInfo[]>([]);
  const [isVideoInputReady] = useRecoilState(isVideoInputReadyState);
  const [isAudioInputReady] = useRecoilState(isAudioInputReadyState);
  const [isChannelJoined, setIsChannelJoined] = useState(false);
  const [isChannelInitializing, setIsChannelInitializing] = useState(false);
  const [myName, setMyName] = useState("");
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const memberListRef = useRef<HTMLDivElement>(null);
  const memberRef = useRef<HTMLDivElement>(null);
  interface BoxWithVideoProps {
    position: [number, number, number];
    member: string;
  }
  let myChannel: Channel;
  let userName: LocalPerson;

  useLayoutEffect(() => {
    setMyName(faker.person.lastName());
    if (!validSkywayToken(skywayJwtForToken)) {
      setSkywayToken("");
      setSkywayJwtForToken("");

      location.href = "/";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subscribeAndAttach = async (publication: Publication) => {
    if (!myChannel) {
      return;
    }
    if (publication.publisher.id === userName.id) return;
    const { stream } = await userName.subscribe<
      RemoteAudioStream | RemoteVideoStream
    >(publication.id);
    let mediaElement;
    const memberDiv = memberListRef.current
      ?.getElementsByClassName(`member-${publication.publisher.id}`)
      .item(0) as HTMLDivElement;
    switch (stream.track.kind) {
      case "video":
        mediaElement = memberDiv
          .getElementsByTagName("video")
          .item(0) as HTMLVideoElement;
        break;
      case "audio":
        mediaElement = memberDiv
          .getElementsByTagName("audio")
          .item(0) as HTMLAudioElement;
        break;
      default:
        return;
    }
    stream.attach(mediaElement);
  };
  const startMemberListControl = () => {
    if (!myChannel) {
      return;
    }
    myChannel.members.filter((remoteMember: RemoteMember) => {
      if (remoteMember.id == userName.id) {
        return;
      }
      setMemberList((prev) => [
        ...prev,
        { memberId: remoteMember.id, memberName: remoteMember.metadata || "" },
      ]);
    });
    myChannel.onMemberJoined.add((event: MemberJoinedEvent) => {
      setMemberList((prev) => [
        ...prev,
        { memberId: event.member.id, memberName: event.member.metadata || "" },
      ]);
      toast(`${event.member.metadata}さんが参加しました`, { icon: "👏" });
    });
    myChannel.onMemberLeft.add((event: MemberLeftEvent) => {
      console.log(event);
      setMemberList((prev) =>
        prev.filter((member) => member.memberId !== event.member.id)
      );
      toast(`${event.member.metadata}さんが退出しました`, { icon: "💨" });
    });
  };
  const publishVideoStream = async () => {
    const avatarCanvas = myVideoRef.current
      ?.getElementsByClassName("w-canvas h-canvas")
      .item(0) as HTMLCanvasElement;
    if (avatarCanvas) {
      const myVideoInputStream: LocalVideoStream = new LocalVideoStream(
        avatarCanvas.captureStream(60).getVideoTracks()[0]
      );
      await userName.publish(myVideoInputStream);
      toast(`映像配信が開始されました`, { icon: "🎥" });
    } else {
      toast.error(
        "映像初期化に何かしらエラーが発生しました。\nページを更新等してお試しください。"
      );
    }
  };
  const publishAudioStream = async () => {
    const myVoice = myVideoRef.current
      ?.getElementsByClassName("refMyVoice")
      .item(0) as HTMLAudioElement;
    if (myVoice) {
      const myAudioInputStream: LocalAudioStream = new LocalAudioStream(
        (myVoice as any).captureStream().getAudioTracks()[0],
        {
          autoGainControl: true,
          noiseSuppression: true,
        }
      );
      await userName.publish(myAudioInputStream);
      toast(`音声配信が開始されました`, { icon: "🎤" });
    } else {
      toast.error(
        "音声初期化に何かしらエラーが発生しました。\nページを更新等してお試しください。"
      );
    }
  };
  const joinChannel = async () => {
    if (!Object.keys(CHANNEL_MAPPINGS).includes(myChannelName)) {
      return toast.error("不正チャンネル名です");
    }
    if (!skywayToken) {
      return toast.error("skywayを利用するTokenがありません");
    }
    if (isChannelInitializing) {
      return toast.error("現在チャンネル初期化中です\nこのままお待ち下さい");
    }
    setIsChannelInitializing(() => true);
    try {
      const context = await SkyWayContext.Create(skywayToken);
      myChannel = await SkyWayChannel.FindOrCreate(context, {
        name: CHANNEL_MAPPINGS[myChannelName],
        metadata: myChannelName,
      });
      userName = await myChannel.join({
        metadata: myName,
      });
      setIsChannelJoined(() => true);
      startMemberListControl();
      await publishVideoStream();
      await publishAudioStream();
      myChannel.publications.filter(subscribeAndAttach);
      myChannel.onStreamPublished.add((e) => subscribeAndAttach(e.publication));
      toast.success(
        `トークをお楽しみください。\nここでのあなたの名前は${myName}です！`
      );
    } catch (e) {
      toast.error(
        "チャンネル初期化時にエラーが発生しました。\n3秒後に内部トークンを初期化してトップページへ遷移します。"
      );
      console.log(e);
      setTimeout(() => {
        setSkywayToken("");
        setSkywayJwtForToken("");
        location.href = "/";
      }, 3000);
    }
    setIsChannelInitializing(() => false);
  };

  const VideoBox = ({ position, member }: BoxWithVideoProps) => {
    const [texture, setTexture] = useState<VideoTexture>();
    const video = document
      .getElementsByClassName(member)
      .item(0) as HTMLVideoElement;
    const videoContainer = video;

    useEffect(() => {
      if (videoContainer) {
        const videoTexture = new VideoTexture(videoContainer);
        setTexture(videoTexture);
      }
    }, [videoContainer]);

    return (
      <mesh position={position}>
        <boxGeometry args={[2, 2, 0]} />
        {texture && <meshBasicMaterial map={texture} />}
      </mesh>
    );
  };

  return (
    <>
      <div className="container">
        <div className="flex flex-col text-center w-full mb-10">
          <div className="flex flex-col text-center w-full mb-10">
            <p className="text-s text-indigo-500 tracking-widest font-medium title-font mb-1">
              参加チャンネル名
            </p>
            <p className="text-4xl font-medium title-font text-gray-900">
              {myChannelName}
            </p>
          </div>
          {isChannelJoined && (
            <p className="text-gray-700 opacity-60">
              部屋退出時は右上のボタンから退出してください。
            </p>
          )}
          {isChannelJoined && !memberList.length && (
            <div className="flex flex-wrap flex-columns justify-center">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <div className="animate-spin h-10 w-10 mr-2 border-4 border-blue-700 rounded-full border-t-transparent"></div>
                <span className="title-font font-medium">
                  他の人が参加するのを待っています...
                </span>
              </div>
            </div>
          )}
          {!isChannelJoined && (
            <div className="p-2">
              <button
                onClick={joinChannel}
                className="flex mx-auto bg-green-500 border-0 px-8 focus:outline-none hover:bg-green-600 rounded disabled:bg-gray-600"
                disabled={isVideoInputReady && isAudioInputReady ? false : true}
              >
                {isVideoInputReady && isAudioInputReady ? (
                  <p className="text-white text-lg p-2">
                    チャンネルに参加する
                    <span className="block mt-1 text-sm pl-1 pb-2 text-white/80">
                      ※映像&音声の送受信開始
                    </span>
                  </p>
                ) : (
                  <span className="text-white text-lg p-2 inline-block align-middle">
                    カメラと音声が有効になるとチャンネル参加できます
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
        <div
          ref={memberListRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-10"
        >
          {memberList &&
            memberList.map((member) => {
              return (
                <div
                  ref={memberRef}
                  key={member.memberId}
                  className={`member-${member.memberId}`}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    src=""
                    className={`${member.memberName}`}
                  />
                  <audio autoPlay src="" />
                </div>
              );
            })}
        </div>

        {memberList && (
          <Canvas style={{ width: "100vw", height: "100vh" }}>
            <PointerLockControls
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 1.3}
            />
            <VideoBox
              position={[-4.0, 0, 0]}
              member={memberList[0]?.memberName}
            />
            <VideoBox
              position={[-1.5, 0, 0]}
              member={memberList[1]?.memberName}
            />
            <VideoBox
              position={[1.5, 0, 0]}
              member={memberList[2]?.memberName}
            />
            <VideoBox
              position={[4.0, 0, 0]}
              member={memberList[3]?.memberName}
            />
          </Canvas>
        )}
      </div>

      <section className="absolute top-0 right-0 m-2">
        <MyVideo ref={myVideoRef} myName={myName} />
      </section>
    </>
  );
}
