import Constants from "expo-constants";

const { auth0Domain, auth0ClientId, auth0Audience, redirectUri } = Constants.expoConfig.extra;


console.log("Loaded Auth0 domain:", authConfig.domain);
console.log("Audience:", authConfig.audience);
console.log("Redirect URI:", authConfig.redirectUri);

export const authConfig = {
  domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN!,
  clientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID!,
  audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE!,
  redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI!,
  useProxy: false,
};