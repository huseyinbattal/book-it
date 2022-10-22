import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";

// Get all rooms    =>    /api/rooms

const allRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Create new room    =>    /api/rooms

const newRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get room details   =>    /api/rooms/:id

const getSingleRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.query.id);

    if (!room) {
      return next(new ErrorHandler("Room not found with this ID.", 404));
    }
    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Update room    =>    /api/rooms/:id

const updateRoom = async (req, res) => {
  try {
    let room = await Room.findById(req.query.id);

    if (!room) {
      return next(new ErrorHandler("Room not found with this ID.", 404));
    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete room    =>    /api/rooms/:id

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id);

    if (!room) {
      return next(new ErrorHandler("Room not found with this ID.", 404));
    }

    await room.remove();

    res.status(200).json({
      success: true,
      message: "Room is deleted.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
