import React, { useEffect, useReducer } from "react";
import Thumbnails from "../../Thumbnails/Thumbnails";
import { getAll, search } from "../../services/foodService";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";

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
  const { searchTerm } = useParams();

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const loadedFoods = searchTerm
          ? await search(searchTerm)
          : await getAll();
        dispatch({ type: "FOODS_LOADED", payload: loadedFoods });
      } catch (error) {
        console.error("Error loading foods:", error);
      }
    };

    loadFoods();
  }, [searchTerm]); // Include searchTerm as a dependency to trigger useEffect on change

  return (
    <>
      <Search />
      <Thumbnails foods={foods} />
    </>
  );
}
