import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getRestaurants,
  deleteRestaurant,
} from "../services/restaurantService";
import "../styles/RestaurantList.css";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);

  useEffect(() => {
    getRestaurants()
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, []);

  const handleDelete = (id) => {
    setRestaurantToDelete(id);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    if (restaurantToDelete) {
      deleteRestaurant(restaurantToDelete)
        .then(() =>
          setRestaurants(restaurants.filter((r) => r.id !== restaurantToDelete))
        )
        .catch((error) => console.error("Error deleting restaurant:", error))
        .finally(() => {
          setShowConfirmation(false);
          setRestaurantToDelete(null);
        });
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setRestaurantToDelete(null);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? "filled" : ""}`}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="restaurant-list-container">
      <h2>Restaurants</h2>
      <Link to="/add" className="add-restaurant-link">
        + Add New Restaurant
      </Link>
      {restaurants.length === 0 ? (
        <p className="no-restaurant-message">
          No restaurants found. Please add.
        </p>
      ) : (
        <ul className="restaurant-cards">
          {restaurants.map((restaurant) => (
            <li key={restaurant.id} className="restaurant-card">
              <div className="restaurant-header">{restaurant.name}</div>
              <div className="restaurant-description">
                <p>
                  <strong>Location:</strong> {restaurant.location}
                </p>
                <p>
                  <strong>Rating:</strong> {renderStars(restaurant.rating)}
                </p>
                <p>
                  <strong>Cuisine:</strong> {restaurant.cuisine}
                </p>
                <p>
                  <strong>Description:</strong> {restaurant.description}
                </p>
              </div>
              <div className="card-buttons">
                <Link to={`/edit/${restaurant.id}`} className="edit-button">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(restaurant.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showConfirmation && (
        <div className="modal-container">
          <div className="confirmation-dialog">
            <span
              className="close-modal"
              onClick={() => setShowConfirmation(false)}
            >
              &times;
            </span>
            <p>Are you sure you want to delete this restaurant?</p>
            <button className="confirm-button" onClick={confirmDelete}>
              Confirm
            </button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
