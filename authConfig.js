import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
const useProxy = true;

export const authConfig = {
  domain: Constants.expoConfig.extra.auth0Domain,
  clientId: Constants.expoConfig.extra.auth0ClientId,
  audience: Constants.expoConfig.extra.EXPO_PUBLIC_AUTH0_AUDIENCE,
  redirectUri: AuthSession.makeRedirectUri({
    useProxy,
  }),
  useProxy,
  scopes: ["openid", "profile", "email"],
  responseType: "code",
};
