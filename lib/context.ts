import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const skywayTokenState = atom({
  key: "skywayToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const skywayJwtForTokenState = atom({
  key: "skywayJwtForToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const myChannelNameState = atom({
  key: "myChannelName",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const isVideoInputReadyState = atom({
  key: "isVideoInputReady",
  default: false,
});

export const isAudioInputReadyState = atom({
  key: "isAudioInputReady",
  default: false,
});
