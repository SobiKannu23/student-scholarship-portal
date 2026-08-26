import axios from "axios";

// Dedicated axios instance for the portal's mock service layer. No request
// ever hits the network — mockApiCall() below simulates the round-trip with
// a plain timer, then resolves. Axios is still used to construct a proper
// request/response config, so every mock service goes through one
// consistent shape, without relying on a custom adapter (which can behave
// inconsistently across Axios versions and cause requests to hang).
const mockApiClient = axios.create({
  baseURL: "mock://scholarship-portal",
});

// Every mock service calls this instead of defining its own setTimeout-based
// delay function. Pass any payload (or null) and how long the simulated
// round-trip should take.
export function mockApiCall(data, delayMs = 400) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delayMs);
  });
}

export default mockApiClient;