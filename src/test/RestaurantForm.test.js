import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RestaurantForm from "../components/RestaurantForm";
import { createRestaurant } from "../services/restaurantService";

jest.mock("../services/restaurantService");

describe("RestaurantForm", () => {
  beforeEach(() => {
    createRestaurant.mockClear();
  });

  test("renders RestaurantForm with correct title", () => {
    render(
      <MemoryRouter>
        <RestaurantForm />
      </MemoryRouter>
    );

    expect(screen.getByText("Add Restaurant")).toBeInTheDocument();
  });

  test("handles form submission for creating a restaurant", async () => {
    render(
      <MemoryRouter>
        <RestaurantForm />
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test Restaurant" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText("Location"), {
      target: { value: "Test Location" },
    });

    // Mock the createRestaurant function
    createRestaurant.mockResolvedValueOnce({});

    // Simulate form submission
    fireEvent.click(screen.getByText("Save"));

    // Check if createRestaurant was called with the correct arguments
    expect(createRestaurant).toHaveBeenCalledWith({
      name: "Test Restaurant",
      description: "Test Description",
      location: "Test Location",
      rating: "",
      cuisine: "",
    });
  });
});
