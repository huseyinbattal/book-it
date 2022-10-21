import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter room name"],
    trim: true,
    maxLength: [100, "Room name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    require: [true, "Please enter room price"],
    maxLength: [4, "Room name cannot exceed 4 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    require: [true, "Please enter room description"],
  },
  address: {
    type: String,
    require: [true, "Please enter room address"],
  },
  guessCapacity: {
    type: Number,
    require: [true, "Please enter room guess capacity"],
  },
  numOfBeds: {
    type: Number,
    require: [true, "Please enter number of beds in room"],
  },
  internet: {
    type: Boolean,
    default: false,
  },
  breakfast: {
    type: Boolean,
    default: false,
  },
  airConditioned: {
    type: Boolean,
    default: false,
  },
  petsAllowed: {
    type: Boolean,
    default: false,
  },
  roomCleaning: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    require: [true, "Please enter room category"],
    enum: {
      value: ["King", "Single", "Twins"],
      message: "Please select correct category for room",
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model.Room || mongoose.model("Room", roomSchema);
