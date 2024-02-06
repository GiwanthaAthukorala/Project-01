import { Router } from "express";
import { FoodModel } from "../Models/food.model";
import handler from "express-async-handler";
import { sample_foods, sample_tags } from "../data";

const router = Router();

router.get(
  "/",
  handler(async (req, res) => {
    const foods = await FoodModel.find({});
    res.send(sample_foods);
  })
);

router.get(
  "/tags",
  handler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };
    tags.unshift(all);

    res.send(sample_tags);
  })
);

router.get(
  "/search/:searchTerm",
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const foods = sample_foods.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    res.send(foods);
  })
);

router.get(
  "/tag/:tag",
  handler(async (req, res) => {
    const { tag } = req.params;
    const foods = sample_foods.filter((item) => item.tags?.includes(tag));
    res.send(foods);
  })
);

router.get(
  "/:foodId",
  handler(async (req, res) => {
    const { foodId } = req.params;
    const food = sample_foods.find((item) => item.id === foodId);
    res.send(food);
  })
);

export default router;
