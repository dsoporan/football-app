import express from "express";
import bodyParser from "body-parser";
import teamRouter from "./routes/teams.js";
import venueRouter from "./routes/venues.js";
import coachRouter from "./routes/coaches.js";
import playerRouter from "./routes/players.js";
import favouritePlayerRouter from "./routes/favouritePlayers.js";
import { swagger } from "./doc/swagger.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Routes
app.use("/api/teams", teamRouter);
app.use("/api/venues", venueRouter);
app.use("/api/coaches", coachRouter);
app.use("/api/players", playerRouter);
app.use("/api/favourite-players", favouritePlayerRouter);

swagger(app);

// error handling
app.use((error, req, res) => {
  console.log(error);
  const status = error.statusCode || 500;
  const { message } = error;
  res.status(status).json({ message });
});

app.listen(1337, async () => {
  console.log("App is listening...");
});

export default app; // testing purpose
