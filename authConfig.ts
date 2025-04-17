import Constants from "expo-constants";

const { auth0Domain, auth0ClientId, auth0Audience, redirectUri } = Constants.expoConfig.extra;


console.log("Loaded Auth0 domain:", authConfig.domain);
console.log("Audience:", authConfig.audience);
console.log("Redirect URI:", authConfig.redirectUri);
console.log("Auth0 domain loaded from env:", Constants.expoConfig.extra?.auth0Domain);

export const authConfig = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || process.env.EXPO_PUBLIC_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE || process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
  redirectUri: import.meta.env.VITE_REDIRECT_URI || process.env.EXPO_PUBLIC_REDIRECT_URI,
  useProxy: false,
  scopes: ["openid", "profile", "email"],
  responseType: "token",
};