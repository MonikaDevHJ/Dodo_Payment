"use client";
import { useState } from "react";

export default function Home() {
  const [isCheckOutOpen, setISCheckOutOpen] = useState(false);

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

            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold transition hover:bg-blue-500"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
