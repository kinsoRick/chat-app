const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
  payload: {
    environment: import.meta.env.VITE_ROLLBAR_ENV,
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export default rollbarConfig;
