import { Transform, createTransform } from "redux-persist";

const EXPIRATION_DURATION = 3 * 24 * 60 * 60 * 1000;
const expireTransform: Transform<any, any> = createTransform(
  (inboundState, key) => {
    return {
      data: inboundState,
      _persistedAt: Date.now(),
    };
  },
  (outboundState, key) => {
    if (!outboundState || typeof outboundState !== "object") {
      return null;
    }

    let state = outboundState;
    if (typeof outboundState === "string") {
      try {
        state = JSON.parse(outboundState);
      } catch (e) {
        return null;
      }
    }

    if (
      !state.hasOwnProperty("data") ||
      !state.hasOwnProperty("_persistedAt")
    ) {
      return null;
    }

    const now = Date.now();
    const persistedAt = state._persistedAt;

    if (
      typeof persistedAt !== "number" ||
      now - persistedAt > EXPIRATION_DURATION
    ) {
      return null;
    }

    return state.data;
  },
  { whitelist: ["isAuthenticated", "isLoading", "role", "token", "user"] }
);

export default expireTransform;
