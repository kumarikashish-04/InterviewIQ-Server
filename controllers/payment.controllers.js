const Razorpay = require("razorpay");
const crypto = require("crypto"); // ✅ add this

const razorpay = new Razorpay({
  key_id: process.env.PAYMENT_GATEWAY_API_KEY,
  key_secret: process.env.PAYMENT_GATEWAY_API_SECRET,
});

const paymentService = async (req, res) => {
  const { amount, planName } = req.body;

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    notes: { plan: planName },
  });

  res.json({ orderId: order.id });
};

// ✅ NEW: verify payment after checkout
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,
    } = req.body;

    // ✅ Step 1 — verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.PAYMENT_GATEWAY_API_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({ success: false, message: "Invalid signature" });
    }

    // ✅ Step 2 — update user plan in DB
    await User.findByIdAndUpdate(req.user.id, {
      plan: plan,
      planActivatedAt: new Date(),
    });

    res.json({ success: true, message: "Payment verified" });

  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  paymentService,
  verifyPayment, // ✅ export
};