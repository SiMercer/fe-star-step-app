export default {
  expo: {
    name: "StarSteps",
    slug: "fe-star-step-app",
    version: "1.0.0",
    sdkVersion: "EXPO_SDK_VERSION_HERE",
    platforms: ["ios", "android", "web"],
    extra: {
      auth0Domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN,
      auth0ClientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID,
      auth0Audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
      redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI,
    },
  },
};
