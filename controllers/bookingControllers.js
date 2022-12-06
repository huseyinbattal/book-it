import Booking from "../models/booking";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

// Create new booking   =>    /api/booking
const newBooking = catchAsyncErrors(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  });

  res.status(200).json({
    success: true,
    booking,
  });
});

// Check room booking availabilty   =>    /api/booking/check

const checkRoomBookingsAvailability = catchAsyncErrors(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query;

  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate,
        },
      },
      {
        checkOutDate: {
          $gte: checkInDate,
        },
      },
    ],
  });

  // Check if there is any booking available
  let isAvailable;

  if (bookings && bookings.length===0) {
    isAvailable=true
  } else {
    isAvailable=false
  }


  res.status(200).json({
    success: true,
    isAvailable,
  });
});

export { newBooking,checkRoomBookingsAvailability };
