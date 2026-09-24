"use client";
import { useState } from "react";

export default function Home() {
  const [isCheckOutOpen, setISCheckOutOpen] = useState(false);
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

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Dodo Store</h1>
            <p className="text-xs text-slate-400">Demo Checkout</p>
          </div>

          <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Demo Mode
          </div>
        </div>
      </header>

      {/* Main content */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-blue-400">
            Embeddable Checkout
          </p>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple checkout for your customers
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            This is a demo merchant website using the Dodo Checkout SDK. Click
            the button below to start the checkout flow.
          </p>
        </div>

        {/* Product Card */}
        <div className="mx-auto mt-12 max-w-md">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
            <div className="mb-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
                ⚡
              </div>

              <h3 className="text-2xl font-semibold">Pro Plan</h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Everything you need to build and grow your digital business.
              </p>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold">₹999</span>
              <span className="ml-2 text-sm text-slate-400">/ month</span>
            </div>

            <button
              type="button"
              onClick={() => setISCheckOutOpen(true)}
              className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Buy Now
            </button>

            <p className="mt-4 text-center text-xs text-slate-500">
              Secure demo checkout
            </p>
          </div>
        </div>

        {/* Event Log */}
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Checkout Events</h3>

              <span className="text-xs text-slate-500">Live Log</span>
            </div>

            <div className="mt-5 rounded-xl bg-black/20 p-4">
              <p className="font-mono text-sm text-slate-400">
                Waiting for checkout events...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center">
        <p className="text-xs text-slate-500">
          Dodo Checkout Assignment • Demo Website
        </p>
      </footer>

      {isCheckOutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Checkout</h2>

                <p className="mt-1 text-sm text-slate-400">
                  Complete your purchase
                </p>
              </div>

              <button
                type="button"
                onClick={() => setISCheckOutOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            {showPaymentForm ? (
              <div className="mt-8">
                <div className="mb-6">
                  <p className="text-sm text-slate-400">Amount to pay</p>

                  <p className="mt-1 text-2xl font-bold">₹999</p>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
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
                    <label
                      htmlFor="cvv"
                      className="mb-2 block text-sm font-medium"
                    >
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
                  className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold transition hover:bg-blue-500"
                >
                  {isProcessing ? "Processing..." : "Pay ₹999"}
                </button>

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

                {paymentStatus === "error" && (
                  <div className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-center">
                    <p className="font-semibold text-red-300">Payment failed</p>

                    <p className="mt-1 text-sm text-red-200/70">
                      {errorMessage}
                    </p>

                    <button
                      type="button"
                      onClick={handlePayment}
                      className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/20"
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
      )}
    </main>
  );
}
