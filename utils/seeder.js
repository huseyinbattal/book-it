const Room = require("../models/room");
const rooms = require("../data/rooms.json");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://huseyinbattal:Re5nzhh5urcsUMzc@bookit.2gpfq2g.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false,
  //useCreateIndex: true,
});

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log("Rooms are deleted");

    await Room.insertMany(rooms);
    console.log("All rooms are added.");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedRooms();
