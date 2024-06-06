import Express from "express";
import gameRouter from "./api/game.js";

const app = new Express();

// Logs all requests
app.use((req, res, next) => {
  console.log(`${req.method} request at ${req.path}`);
  next();
});

app.use("/game", gameRouter);

// Static file server
app.use(Express.static("public"));

// Start server listening on port 5000
app.listen(5000, () => {
  console.log("Listening on port 5000");
});
