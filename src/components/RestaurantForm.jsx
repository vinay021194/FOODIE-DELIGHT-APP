import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRestaurant,
  updateRestaurant,
  createRestaurant,
} from "../services/restaurantService";
import "../styles/RestaurantForm.css";
import LoadingSpinner from "./LoadingSpinner";

const RestaurantForm = () => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    description: "",
    location: "",
    rating: "", // Initialize rating as an empty string
    cuisine: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    location: "",
    rating: "", // Add rating to errors state
  });
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getRestaurant(id)
        .then((response) => {
          setRestaurant(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(`Error fetching restaurant with id ${id}:`, error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formValid = true;
    const { name, description, location, rating } = restaurant;

    if (!name.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Name is required" }));
      formValid = false;
    }
    if (!description.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "Description is required",
      }));
      formValid = false;
    }
    if (!location.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: "Location is required",
      }));
      formValid = false;
    }
    // Validate rating is a number and within range
    if (rating !== "" && (isNaN(rating) || rating < 0 || rating > 5)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rating: "Rating must be a number between 0 and 5",
      }));
      formValid = false;
    }

    if (!formValid) {
      return;
    }

    setIsLoading(true);
    try {
      if (id) {
        await updateRestaurant(id, restaurant);
      } else {
        await createRestaurant(restaurant);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving restaurant:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="form-container">
      <h2>{id ? "Edit Restaurant" : "Add Restaurant"}</h2>
      <form className="restaurant-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={restaurant.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={restaurant.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={restaurant.location}
            onChange={handleChange}
          />
          {errors.location && (
            <p className="error-message">{errors.location}</p>
          )}
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={restaurant.rating}
            onChange={handleChange}
            min="0"
            max="5"
          />
          {errors.rating && <p className="error-message">{errors.rating}</p>}
        </div>
        <div>
          <label htmlFor="cuisine">Cuisine</label>
          <input
            type="text"
            id="cuisine"
            name="cuisine"
            value={restaurant.cuisine}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{id ? "Update" : "Save"}</button>
      </form>
    </div>
  );
};

export default RestaurantForm;
