import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipeModel(req.body);

  try {
    const response = await recipe.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    //finding the recipe
    const recipe = await RecipeModel.findById(req.body.recipeID);

    //finding the user who save the recipe
    const user = await UserModel.findById(req.body.userID);

    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

router.get("/saveRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

router.get("/saveRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

export { router as recipeRouter };
