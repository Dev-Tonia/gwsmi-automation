import mongoose, { Schema, Types, Document } from "mongoose";
import { CreateMealDTOType } from "../dtos/meal/create-meal.dto";
export interface IMeal extends CreateMealDTOType, Document {}

const MealMenuSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  limit: {
    type: Number,
    required: true,
    min: 1,
  },
});

const MealTypeSchema = new Schema({
  type: {
    type: String,
    enum: ["breakfast", "lunch", "dinner"],
    required: true,
  },
  menu: {
    type: [MealMenuSchema],
    validate: {
      validator: (v: any[]) => v.length > 0,
      message: "Each meal type must have at least one option",
    },
  },
});

const MealSchema = new Schema(
  {
    eventId: {
      type: Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },

    dayNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    mealTypes: {
      type: [MealTypeSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// make sure  of eventId and dayNumber unique
MealSchema.index({ eventId: 1, dayNumber: 1 }, { unique: true });

const Meal = mongoose.model<IMeal>("Meal", MealSchema);
export default Meal;
