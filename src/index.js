import express from "express";
import amenitiesRouter from "./routes/amenities.js";
import bookingsRouter from "./routes/bookings.js";

const app = express();

app.use(express.json());

app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
