import Stripe from "stripe";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const stripeWebhooks = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  try {
    console.log("Stripe Event:", event.type);
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;

        // Find checkout session linked to this payment
        const sessionList = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });

        const session = sessionList.data[0];
        if (!session) {
          console.log("No session found for payment intent:", paymentIntent.id);
          return res.json({ received: true, message: "No session found" });
        }

        const { transactionId, appId } = session.metadata;
        console.log("Transaction ID:", transactionId, "App ID:", appId);

        if (appId === "quickgpt") {
          const transaction = await Transaction.findOne({
            _id: transactionId,
            isPaid: false,
          });

          if (transaction) {
            // Update user credits
            console.log("Transaction found:", transaction);
            await User.updateOne(
              { _id: transaction.userId },
              { $inc: { credit: transaction.credits } }
            );

            // Update payment status
            transaction.isPaid = true;
            await transaction.save();
            console.log('Credits updated for user:', transaction.userId);
          }else {
            console.log("Transaction not found or already paid.");
          }
        } else {
          console.log("Invalid app ID:", appId);
          return res.json({
            received: true,
            message: "Ignored event: Invalid app",
          });
        }
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
        break;
    }

    res.json({ received: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
