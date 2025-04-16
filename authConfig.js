import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";

const isProd = process.env.NODE_ENV === "production";

const useProxy = !isProd;

const redirectUri = AuthSession.makeRedirectUri({
  useProxy,
});

const { auth0Domain, auth0ClientId, EXPO_PUBLIC_AUTH0_AUDIENCE } =
  Constants.expoConfig.extra;

export const authConfig = {
  domain: auth0Domain,
  clientId: auth0ClientId,
  audience: EXPO_PUBLIC_AUTH0_AUDIENCE,
  redirectUri,
  useProxy,
  scopes: ["openid", "profile", "email"],
  responseType: "code",
};
