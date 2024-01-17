import React, { useEffect, useReducer } from "react";
import Thumbnails from "../../Thumbnails/Thumbnails";
import {
  getAll,
  getAllByTag,
  getAllTags,
  search,
} from "../../services/foodService";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import Tags from "../../components/Tags/Tags";

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      if (Array.isArray(action.payload)) {
        return { ...state, foods: action.payload };
      } else {
        console.error("Invalid foods data:", action.payload);
        return state;
      }

    case "TAGS_LOADED":
      if (Array.isArray(action.payload)) {
        return { ...state, tags: action.payload };
      } else {
        console.error("Invalid tags data:", action.payload);
        return state;
      }

    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm, tag } = useParams();

  useEffect(() => {
    getAllTags().then((tags) =>
      dispatch({ type: "TAGS_LOADED", payload: tags })
    );

    const loadFoods = async () => {
      try {
        const loadedFoods = tag
          ? await getAllByTag(tag)
          : searchTerm
          ? await search(searchTerm)
          : await getAll();

        console.log("Loaded Foods:", loadedFoods);

        dispatch({ type: "FOODS_LOADED", payload: loadedFoods });
      } catch (error) {
        console.error("Error loading foods:", error);
      }
    };

    loadFoods();
  }, [searchTerm, tag]);

  return (
    <>
      <Search />
      <Tags tags={tags} />
      <Thumbnails foods={foods} />
    </>
  );
}
