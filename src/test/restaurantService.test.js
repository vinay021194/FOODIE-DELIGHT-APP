import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../services/restaurantService"; // Adjust the import path based on your file structure

const API_URL = "http://localhost:5001/restaurants";

describe("API tests", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  test("getRestaurants should fetch restaurants", async () => {
    const data = [{ id: 1, name: "Restaurant 1" }];
    mock.onGet(API_URL).reply(200, data);

    const response = await getRestaurants();
    expect(response.data).toEqual(data);
  });

  test("getRestaurant should fetch a restaurant by id", async () => {
    const id = 1;
    const data = { id, name: "Restaurant 1" };
    mock.onGet(`${API_URL}/${id}`).reply(200, data);

    const response = await getRestaurant(id);
    expect(response.data).toEqual(data);
  });

  test("createRestaurant should create a new restaurant", async () => {
    const newRestaurant = { name: "New Restaurant" };
    const createdRestaurant = { id: 1, ...newRestaurant };
    mock.onPost(API_URL).reply(201, createdRestaurant);

    const response = await createRestaurant(newRestaurant);
    expect(response.data).toEqual(createdRestaurant);
  });

  test("updateRestaurant should update a restaurant by id", async () => {
    const id = 1;
    const updatedRestaurant = { name: "Updated Restaurant" };
    mock.onPut(`${API_URL}/${id}`).reply(200, updatedRestaurant);

    const response = await updateRestaurant(id, updatedRestaurant);
    expect(response.data).toEqual(updatedRestaurant);
  });

  test("deleteRestaurant should delete a restaurant by id", async () => {
    const id = 1;
    mock.onDelete(`${API_URL}/${id}`).reply(200);

    const response = await deleteRestaurant(id);
    expect(response.status).toBe(200);
  });
});
