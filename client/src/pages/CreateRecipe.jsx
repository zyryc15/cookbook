import React, { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const navigate = useNavigate();
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (e, idx) => {
    const { value } = e.target;
    const ingredients = [...recipe.ingredients];
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredients = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert("Recipe has been created.");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, idx)}
          />
        ))}
        <button type="button" onClick={addIngredients}>
          Add Ingredients
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          name="instructions"
          id="instructions"
          cols="30"
          rows="10"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
