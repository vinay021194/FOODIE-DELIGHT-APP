// src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App Component", () => {
  test("renders NavBar and routes", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Check if NavBar is rendered
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    // Check if the RestaurantList route is rendered on '/'
    expect(screen.getByText(/restaurants/i)).toBeInTheDocument(); // Assuming "Restaurants" is in RestaurantList

    // Check if the RestaurantForm route is rendered on '/add'
    // Navigate to '/add' using MemoryRouter
    window.history.pushState({}, "", "/add");
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument(); // Assuming there's a label with text "Name" in RestaurantForm

    // Check if the RestaurantForm route is rendered on '/edit/:id'
    // Navigate to '/edit/1' using MemoryRouter
    window.history.pushState({}, "", "/edit/1");
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument(); // Assuming there's a label with text "Name" in RestaurantForm
  });
});
