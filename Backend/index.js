import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./router/booksRoute.js";
import cors from "cors";

const app = express();

// Apply CORS middleware with specific origin
app.use(cors({
  origin: 'https://book-store-blond-six.vercel.app', // replace with your React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // allowed headers
}));

app.use(express.json());

app.use("/books", booksRoute);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
