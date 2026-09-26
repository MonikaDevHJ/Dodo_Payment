"use client";

import { useState } from "react";
import { DodoCheckout } from "@/lib/checkout-sdk";

export default function Home() {
  const [checkoutEvent, setCheckoutEvent] = useState(
    "Waiting for checkout events..."
  );

  const handleBuyNow = () => {
    DodoCheckout.open({
      productId: "prod_123",

      onSuccess: ({ sessionId }) => {
        setCheckoutEvent(
          `Payment successful. Session ID: ${sessionId}`
        );
      },

      onError: ({ code, message }) => {
        setCheckoutEvent(
          `Payment failed. ${message} Code: ${code}`
        );
      },

      onClose: ({ reason }) => {
        setCheckoutEvent(
          `Checkout closed. Reason: ${reason}`
        );
      },
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Dodo Store
            </h1>

            <p className="text-xs text-slate-400">
              Demo Checkout
            </p>
          </div>

          <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Demo Mode
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-blue-400">
            Embeddable Checkout
          </p>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple checkout for your customers
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            This is a demo merchant website using the Dodo Checkout SDK.
            Click the button below to start the checkout flow.
          </p>
        </div>

        {/* Product Card */}
        <div className="mx-auto mt-12 max-w-md">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
            {/* Product Icon */}
            <div className="mb-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
                ⚡
              </div>

              <h3 className="text-2xl font-semibold">
                Pro Plan
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Everything you need to build and grow your digital
                business.
              </p>
            </div>

            {/* Price */}
            <div className="mb-8">
              <span className="text-4xl font-bold">
                ₹999
              </span>

              <span className="ml-2 text-sm text-slate-400">
                / month
              </span>
            </div>

            {/* Buy Button */}
            <button
              type="button"
              onClick={handleBuyNow}
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
              <h3 className="font-semibold">
                Checkout Events
              </h3>

              <span className="text-xs text-slate-500">
                Live Log
              </span>
            </div>

            <div className="mt-5 rounded-xl bg-black/20 p-4">
              <p className="font-mono text-sm text-slate-400">
                {checkoutEvent}
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
    </main>
  );
}