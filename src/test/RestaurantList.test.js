import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers
import RestaurantList from "../components/RestaurantList";
import { MemoryRouter } from "react-router-dom";

// Mock restaurants data for testing
const restaurants = [
  {
    id: 1,
    name: "Restaurant A",
    location: "Location A",
    rating: 4,
    cuisine: "Cuisine A",
    description: "Description A",
  },
  {
    id: 2,
    name: "Restaurant B",
    location: "Location B",
    rating: 3,
    cuisine: "Cuisine B",
    description: "Description B",
  },
];

describe("RestaurantList Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <RestaurantList />
      </MemoryRouter>
    );
  });

  it('should render the title "Restaurants"', () => {
    expect(screen.getByText("Restaurants")).toBeInTheDocument();
  });

  it("should render a link to add a new restaurant", () => {
    expect(screen.getByText("+ Add New Restaurant")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "+ Add New Restaurant" })
    ).toHaveAttribute("href", "/add");
  });

  // Add more test cases as needed for other functionalities like delete confirmation
});
