"use client";

import { useState } from "react";

type CheckoutProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Checkout({ isOpen, onClose }: CheckoutProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState("");
  const [paymentAttempt, setPaymentAttempt] = useState(0);

  const handlePayment = () => {
    setIsProcessing(true);
    setPaymentStatus("idle");
    setErrorMessage("");

    setTimeout(() => {
      if (cardNumber === "4242 4242 4242 4242") {
        setPaymentStatus("success");

        window.parent.postMessage(
          {
            type: "PAYMENT_SUCCESS",
            sessionId: "demo_session_123"
          },
          "http://localhost:3000"
        );
      } else if (cardNumber === "4000 0000 0000 0002") {
        setPaymentStatus("error");
        setErrorMessage("Your card was declined.");
      } else if (cardNumber === "4000 0000 0000 0341") {
        if (paymentAttempt === 0) {
          setPaymentAttempt(1);
          setPaymentStatus("error");
          setErrorMessage("Payment failed. Please try again.");
        } else {
          setPaymentStatus("success");
        }
      } else {
        setPaymentStatus("error");
        setErrorMessage("Invalid test card number.");
      }

      setIsProcessing(false);
    }, 1500);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Checkout</h2>

            <p className="mt-1 text-sm text-slate-400">
              Complete your purchase
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        {showPaymentForm ? (
          <div className="mt-8">
            {/* Amount */}
            <div className="mb-6">
              <p className="text-sm text-slate-400">Amount to pay</p>

              <p className="mt-1 text-2xl font-bold">₹999</p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            {/* Card Number */}
            <div className="mt-5">
              <label
                htmlFor="cardNumber"
                className="mb-2 block text-sm font-medium"
              >
                Card number
              </label>

              <input
                id="cardNumber"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            {/* Expiry + CVV */}
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiry"
                  className="mb-2 block text-sm font-medium"
                >
                  Expiry
                </label>

                <input
                  id="expiry"
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="12/28"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="cvv" className="mb-2 block text-sm font-medium">
                  CVV
                </label>

                <input
                  id="cvv"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  maxLength={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="button"
              onClick={handlePayment}
              disabled={isProcessing}
              className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isProcessing ? "Processing..." : "Pay ₹999"}
            </button>

            {/* Success */}
            {paymentStatus === "success" && (
              <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-center">
                <p className="font-semibold text-emerald-300">
                  Payment successful!
                </p>

                <p className="mt-1 text-sm text-emerald-200/70">
                  Your Pro Plan purchase is complete.
                </p>
              </div>
            )}

            {/* Error */}
            {paymentStatus === "error" && (
              <div className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-center">
                <p className="font-semibold text-red-300">Payment failed</p>

                <p className="mt-1 text-sm text-red-200/70">{errorMessage}</p>

                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Product Summary */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Product</span>

                <span className="font-medium">Pro Plan</span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-400">Price</span>

                <span className="text-lg font-semibold">₹999</span>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="button"
              onClick={() => setShowPaymentForm(true)}
              className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold transition hover:bg-blue-500"
            >
              Continue to Payment
            </button>
          </>
        )}
      </div>
    </div>
  );
}
