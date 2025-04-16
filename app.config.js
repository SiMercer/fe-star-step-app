import "dotenv/config";

export default ({ config }) => ({
  ...config,
  name: "StarSteps",
  slug: "StarSteps",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  userInterfaceStyle: "automatic",
  assetBundlePatterns: ["**/*"],
  platforms: ["ios", "android", "web"],
  extra: {
    auth0Domain: process.env.AUTH0_DOMAIN,
    auth0ClientId: process.env.AUTH0_CLIENT_ID,
    EXPO_PUBLIC_AUTH0_AUDIENCE: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
    EXPO_PUBLIC_REDIRECT_URI: process.env.EXPO_PUBLIC_REDIRECT_URI,
  },
  web: {
    bundler: "metro",
  },
});
