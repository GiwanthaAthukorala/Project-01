import React, { useEffect, useReducer } from "react";
import Thumbnails from "../../Thumbnails/Thumbnails";
import { getAll, getAllTags, search } from "../../services/foodService";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import Tags from "../../components/Tags/Tags";

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    case "TAGS_LOADED":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm } = useParams();

  useEffect(() => {
    getAllTags().then((tags) =>
      dispatch({ type: "TAGS_LOADED", payload: tags })
    );

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
  }, [searchTerm]);

  return (
    <>
      <Search />
      <Tags tags={tags} />
      <Thumbnails foods={foods} />
    </>
  );
}
