import cron  from "cron";
import https from "https";

const backendUrl = "https://careercraft-backend.onrender.com";

// This function will be executed every 14 minutes
const job = new cron.CronJob("*/14 * * * *", function () {
  console.log(`Restarting server`);

  // Performs an HTTPS GET request to hit any backend api.
  https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        console.log("Server restarted");
      } else {
        console.error(
          `failed to restart server with status code: ${res.statusCode}`
        );
      }
    })
    .on("error", (err) => {
      console.error(`Error during restart:`, err.message);
    });
});

export { job } ;