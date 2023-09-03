import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { UserRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", UserRouter);
app.use("/recipes", recipeRouter);

mongoose.connect(
  "mongodb+srv://fievenmongo:fievenmongo@recipes.itjxry4.mongodb.net/recipes?retryWrites=true&w=majority"
);
app.listen(5000, () => console.log("Server is runnings"));
