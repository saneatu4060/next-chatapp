import { AuthToken } from "@skyway-sdk/room";

export const validSkywayToken = (skywayJwtForToken: AuthToken): boolean => {
  if (skywayJwtForToken && Date.now() < skywayJwtForToken.exp * 1000) {
    return true;
  }
  return false;
};
