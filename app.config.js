import 'dotenv/config';

export default {
  expo: {
    owner: "simercer",
    name: "StarSteps",
    slug: "fe-star-step-app",
    version: "1.0.0",
    sdkVersion: "52.0.0",
    userInterfaceStyle: "automatic",
    platforms: ["ios", "android", "web"],
    plugins: ["expo-secure-store", "expo-font"],
    extra: {
      EXPO_PUBLIC_AUTH0_DOMAIN: process.env.EXPO_PUBLIC_AUTH0_DOMAIN,
      EXPO_PUBLIC_AUTH0_CLIENT_ID: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID,
      EXPO_PUBLIC_AUTH0_AUDIENCE: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
      USE_FAKE_AUTH: process.env.USE_FAKE_AUTH,
      eas: { projectId: "c8a1b3ad-3dc4-42fc-a90d-0625eeec160f" },
    },
    updates: {
      url: "https://u.expo.dev/c8a1b3ad-3dc4-42fc-a90d-0625eeec160f",
    },
    runtimeVersion: { policy: "appVersion" },
    web: { bundler: "metro" },
  },
};