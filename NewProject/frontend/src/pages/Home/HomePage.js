import React, { useEffect, useReducer } from "react";
import Thumbnails from "../../Thumbnails/Thumbnails";
import { getAll } from "../../services/foodService";

const initialState = { foods: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods } = state;

  useEffect(() => {
    // Assuming getAll returns a Promise resolving to an array of foods
    getAll().then((food) => dispatch({ type: "FOODS_LOADED", payload: food }));
  }, []);

  return (
    <>
      <Thumbnails foods={foods} />
    </>
  );
}
