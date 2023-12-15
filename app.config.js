import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    apiHost: process.env.API_HOST,
    apiKey: process.env.API_KEY,
    debug: process.env.DEBUG === "true",
  },
});
