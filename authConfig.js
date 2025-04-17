import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";

const useProxy = false;

export const authConfig = {
  domain: Constants.expoConfig.extra.EXPO_PUBLIC_AUTH0_DOMAIN,
  clientId: Constants.expoConfig.extra.EXPO_PUBLIC_AUTH0_CLIENT_ID,
  audience: Constants.expoConfig.extra.EXPO_PUBLIC_AUTH0_AUDIENCE,
  redirectUri: Constants.expoConfig.extra.EXPO_PUBLIC_REDIRECT_URI,
  useProxy,
  scopes: ["openid", "profile", "email"],
  responseType: "code",
};
