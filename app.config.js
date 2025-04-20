import "dotenv/config";

export default {
  expo: {
    name: "StarSteps",
    slug: "fe-star-step-app",
    version: "1.0.0",
    platforms: ["ios", "android", "web"],
    plugins: ["expo-secure-store"],
    extra: {
      auth0Domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN,
      auth0ClientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID,
      auth0Audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
    },
    web: {
      bundler: "metro",
    },
  },
};
