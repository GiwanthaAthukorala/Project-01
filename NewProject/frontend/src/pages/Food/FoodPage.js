import React, { useEffect, useState } from "react";
import classes from "./foodPage.module.css";
import { getById } from "../../services/foodService";
import { useParams } from "react-router-dom";
import StarRating from "../../components/StartRating/StarRating";
import Tags from "../../components/Tags/Tags";
import Price from "../../components/Price/Price";

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
            <div className={classes.origins}>
              {food.origins?.map((origin) => (
                <span key={origin}>{origin}</span>
              ))}
            </div>
            <div className={classes.tags}>
              {food.tags && (
                <Tags
                  tags={food.tags.map((tag) => ({ name: tag }))}
                  forFoodPage={true}
                />
              )}
            </div>
            <div className={classes.cook_time}>
              <span>
                Time To Cook About<strong>{food.cookTime}</strong> minutes
              </span>
            </div>
            <div className={classes.price}>
              <Price price={food.price} />
            </div>
            <button>Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}
