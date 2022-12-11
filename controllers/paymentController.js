import Room from "../models/room";
import User from "../models/user";
import Booking from "../models/booking";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import absoluteUrl from "next-absolute-url";
import getRawBody from "raw-body";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Generate stripe checkout session    =>    /api/checkout_session/:roomId

const stripeCheckoutSession = catchAsyncErrors(async (req, res) => {
  // Get room details
  const room = await Room.findById(req.query.roomId);

  const { checkInDate, checkOutDate, daysOfStay } = req.query;

  //Get origin
  const { origin } = absoluteUrl(req);

  // Create stripe checkout session

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${origin}/bookings/me`,
    cancel_url: `${origin}/room/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: req.query.amount * 100,
          product_data: {
            name: room.name,
            images: [`${room.images[0].url}`],
          },
        },
        quantity: 1,
      },
    ],
  });

  res.status(200).json(session);
});

// Create new booking after payment    =>    /api/webhook
const webhookCheckout = catchAsyncErrors(async (req, res) => {

 try {
  
   const signature = req.header["stripe-signature"];

   const event=stripe.webhooks.constructEvent()
   
   
 } catch (error) {
   
   console.log("Error in Stripe Checkout Payment =>", error);
   
 }
});

export { stripeCheckoutSession };
