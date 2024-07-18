import axios from "axios";

// Use the environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL;

export const getRestaurants = async () => {
  try {
    return await axios.get(API_URL);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const getRestaurant = async (id) => {
  try {
    return await axios.get(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error fetching restaurant with id ${id}:`, error);
    throw error;
  }
};

export const createRestaurant = async (restaurant) => {
  try {
    return await axios.post(API_URL, restaurant);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    throw error;
  }
};

export const updateRestaurant = async (id, restaurant) => {
  try {
    return await axios.put(`${API_URL}/${id}`, restaurant);
  } catch (error) {
    console.error(`Error updating restaurant with id ${id}:`, error);
    throw error;
  }
};

export const deleteRestaurant = async (id) => {
  try {
    return await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting restaurant with id ${id}:`, error);
    throw error;
  }
};
