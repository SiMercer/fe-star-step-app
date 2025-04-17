import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";

const useProxy = false;

const redirectUri = AuthSession.makeRedirectUri({
  useProxy,
});

console.log("Redirect URI in use:", redirectUri);

export const authConfig = {
  domain: Constants.expoConfig.extra.auth0Domain,
  clientId: Constants.expoConfig.extra.auth0ClientId,
  audience: Constants.expoConfig.extra.auth0Audience,
  redirectUri,
  useProxy,
  scopes: ["openid", "profile", "email"],
  responseType: "code",
};
