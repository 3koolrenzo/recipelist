import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Importing uuid
import supabase from '../services/supabase'; // Importing Supabase client

const BASE_URL = 'https://recipesharingapplm.netlify.app/'; // Your backend URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const recipeService = {
  getAllRecipes: async () => {
    try {
      const { data, error } = await supabase.from('recipes').select('*'); // Fetching recipes from Supabase
      if (error) throw new Error('Error fetching recipes'); // Throw error if there's an issue
      return data;
    } catch (error) {
      throw error; // Throw error to be caught by the caller
    }
  },
createRecipe: async (recipeData) => {
    try {
      const createdAt = new Date(); // Current timestamp
      const { data, error } = await supabase.from('recipes').insert([{
        id: uuidv4(), // Generating UUID for recipe
        ...recipeData,
        created_at: createdAt,
      }]);
      if (data) {
    alert("Post Created Successfully");
    }else {
      
    }
    } catch (error) {
      throw error;
    }
  },
  updateRecipe: async (recipeId, updatedRecipeData) => {
    try {
      const { data, error } = await supabase.from('recipes').update(updatedRecipeData).eq('id', recipeId);
      if (error) throw new Error('Error updating recipe');
      return data[0];
    } catch (error) {
      throw error;
    }
  },
  deleteRecipe: async (recipeId) => {
    try {
      const { error } = await supabase.from('recipes').delete().eq('id', recipeId);
      if (error) throw new Error('Error deleting recipe');
    } catch (error) {
      throw error;
    }
  },
  addComment: async (recipeId, commentText) => {
    try {
      const { data, error } = await supabase.from('comments').insert([{ recipe_id: recipeId, text: commentText }]);
      if (error) throw new Error('Error adding comment');
      return { comment: data[0] };
    } catch (error) {
      throw error;
    }
  },
};

export default recipeService;
