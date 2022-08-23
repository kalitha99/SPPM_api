require("dotenv").config();

const stripe = require("stripe")( process.env.SECRET_KEY);


const createPayment = async (req, res) => {
    const total = req.query.total;

    console.log("Payment Request Recieved ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "lkr",
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
}

module.exports = {createPayment}