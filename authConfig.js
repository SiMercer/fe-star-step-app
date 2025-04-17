import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";

const useProxy = false;

console.log("Loaded Auth0 domain:", Constants.expoConfig.extra.auth0Domain);

export const authConfig = {
  domain: Constants.expoConfig.extra.EXPO_PUBLIC_AUTH0_DOMAIN,
  clientId: Constants.expoConfig.extra.EXPO_PUBLIC_AUTH0_CLIENT_ID,
  audience: Constants.expoConfig.extra.EXPO_PUBLIC_AUTH0_AUDIENCE,
  redirectUri: Constants.expoConfig.extra.EXPO_PUBLIC_REDIRECT_URI,
  useProxy,
  scopes: ["openid", "profile", "email"],
  responseType: "code",
};
