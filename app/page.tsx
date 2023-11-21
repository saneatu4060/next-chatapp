"use client";

import toast from "react-hot-toast";
import { useRecoilState } from 'recoil'
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ApiResponse, CustomError, MySkywayAuthInfo } from "@/lib/interface";
import { skywayTokenState, myChannelNameState, skywayJwtForTokenState} from "@/lib/context";
import { validSkywayToken } from "@/lib/skyway";
import { CHANNEL_MAPPINGS } from '@/lib/roomInfo';


export default function Home() {
  const [skywayToken, setSkywayToken] = useRecoilState(skywayTokenState);
  const [skywayJwtForToken, setSkywayJwtForToken] = useRecoilState(skywayJwtForTokenState);
  const [_, setMyChannelName] = useRecoilState(myChannelNameState);
  const router = useRouter();

  
/* -----------------------------------------------------------------------------------*/
  const getToken = async () => {
    const response = await fetch("./api/getSkywayInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const apiResponse: ApiResponse<MySkywayAuthInfo | CustomError> =
      await response.json();

    if (response.ok) {
      if (apiResponse.isSuccess) {
        const apiResponseBody = apiResponse.body as MySkywayAuthInfo;
        setSkywayToken(apiResponseBody.skywayToken);
        setSkywayJwtForToken(apiResponseBody.jwt)

      } else {
        const apiResponseBody = apiResponse.body as CustomError;
        toast.error(apiResponseBody.errorMessage);
      }
    } else {
      toast.error("connectionError");
      console.log(response)
    }
  };
/* -----------------------------------------------------------------------------------*/

  const goChannelPage = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const channelName = event.currentTarget.textContent || "";
    if (!Object.keys(CHANNEL_MAPPINGS).includes(channelName)) {
      return toast.error("チャンネル名が不正です");
    }
    if (!skywayToken) {
      return toast.error("skywayを利用するTokenがありません");
    }
    if(channelName=="通常"){
      setMyChannelName(channelName);
      router.push(`/channel/`);
    }
    if(channelName=="提案システム"){
      setMyChannelName(channelName);
      router.push(`/channel_2/`);
    }

  };



  return (

    <section >
      <div>
        <div>
          <h1 className="text-center">
            対面と同じ臨場感を得る会議システム
          </h1>
          {(skywayJwtForToken) && <h2 className="text-center">システム選択</h2> }
            <div>
              {validSkywayToken(skywayJwtForToken) ? (
                Object.keys(CHANNEL_MAPPINGS).map((item, idx) => {
                  return (
                    <button
                      key={idx}
                      className="p-2 w-1/2"
                      onClick={goChannelPage}
                    >
                      <span className="justify-center h-full flex items-center  bg-gray-600 border-2 p-4 rounded-lg  text-black title-font font-medium">
                        {item}
                      </span>
                    </button>
                    
                    
                  );
                },)
              ) : (
                <button
                  className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg w-full"
                  onClick={getToken}
                >
                  トークン発行
                </button>
              )}
            </div>
        </div>
      </div>
    </section>
              
  )
}