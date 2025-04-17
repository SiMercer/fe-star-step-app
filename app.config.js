import "dotenv/config";

export default {
  expo: {
    name: "fe-star-step-app",
    slug: "fe-star-step-app",
    extra: {
      auth0Domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN,
      auth0ClientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID,
      auth0Audience: process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
      redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI,
    },
  },
};
