import Constants from "expo-constants";

const {
  auth0Domain,
  auth0ClientId,
  auth0Audience,
  redirectUri
} = Constants.expoConfig.extra;

console.log("Loaded Auth0 domain:", auth0Domain);
console.log("Audience:", auth0Audience);
console.log("Redirect URI:", redirectUri);

export const authConfig = {
  domain: auth0Domain,
  clientId: auth0ClientId,
  audience: auth0Audience,
  redirectUri: redirectUri,
  useProxy: false,
  scopes: ["openid", "profile", "email"],
  responseType: "token",
};
