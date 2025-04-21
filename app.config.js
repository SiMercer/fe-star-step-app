export default {
  expo: {
    owner: "simercer",
    name: "StarSteps",
    slug: "fe-star-step-app",
    version: "1.0.0",
    platforms: ["ios", "android", "web"],
    plugins: ["expo-secure-store"],
    extra: {
      auth0Domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN,
      auth0ClientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID,
      auth0Audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
      redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI,
      eas: { projectId: "c8a1b3ad-3dc4-42fc-a90d-0625eeec160f" },
    },
    updates: { url: "https://u.expo.dev/c8a1b3ad-3dc4-42fc-a90d-0625eeec160f" },
    runtimeVersion: { policy: "appVersion" },
    web: { bundler: "metro" },
  },
};
