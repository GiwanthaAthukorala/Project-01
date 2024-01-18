import React, { useEffect, useState } from "react";
import classes from "./foodPage.module.css";
import { getById } from "../../services/foodService";
import { useParams } from "react-router-dom";
import StarRating from "../../components/StartRating/StarRating";

export default function FoodPage() {
  const [food, setFood] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);

  return (
    <>
      {food && (
        <div className={classes.image}>
          <img src={`/foods/${food.imageUrl}`} alt={food.name} />

          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? "" : classes.not
                }`}
              >
                ❤️
              </span>
            </div>
            <div className={classes.rating}>
              <StarRating stars={food.stars} size={25} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
