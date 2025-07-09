import express from "express";
import { ApiError, asyncHandler } from "../middleware/errorHandler.js";

const router = express.Router()

const items = [
  {
    id: 1,
    name: "Subhadeep 1",
  },
  {
    id: 2,
    name: "Subhadeep 2",
  },
  {
    id: 3,
    name: "Subhadeep 3",
  },
  {
    id: 4,
    name: "Subhadeep 4",
  },
  {
    id: 5,
    name: "Subhadeep 5",
  },
];

//Calling asynchandler we created in error handler
router.get('/items', asyncHandler((req, res) => {
    res.json(items)
}))

router.post(
  "/items",
  asyncHandler((req, res) => {
    if (!req.body.name) {
      throw new ApiError("Item name is required: Please add a name", 400);
    }
    const newItem = {
      id: items.length + 1,
      name: req.body.name,
    };
    items.push(newItem);
    return res.status(200).json({
      newItem,
    });
  })
);

export default router