import { useEffect, useState, createContext, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const {
  auth0Domain,
  auth0ClientId,
  auth0Audience,
  redirectUri,
} = Constants.expoConfig.extra;

// Example use of constants (e.g. in a fetch or auth setup)
console.log("Auth0 Config Loaded:", {
  auth0Domain,
  auth0ClientId,
  auth0Audience,
  redirectUri,
});
