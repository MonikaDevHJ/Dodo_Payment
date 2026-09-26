export type CheckoutSuccess = {
  sessionId: string;
};

export type CheckoutClose = {
  reason: "user_closed";
};

export type CheckoutError = {
  code: string;
  message: string;
};

export type CheckoutOptions = {
  productId: string;
  onSuccess?: (data: CheckoutSuccess) => void;
  onClose?: (data: CheckoutClose) => void;
  onError?: (data: CheckoutError) => void;
};

const CHECKOUT_ORIGIN =
  "https://dodo-checkout-app-eight.vercel.app";
let checkoutContainer: HTMLDivElement | null = null;
let messageHandler: ((event: MessageEvent) => void) | null = null;

export const DodoCheckout = {
  open(options: CheckoutOptions) {
    // Prevent opening multiple checkouts
    if (checkoutContainer) {
      return;
    }

    // Create overlay
    const container = document.createElement("div");

    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.background = "rgba(0, 0, 0, 0.7)";
    container.style.padding = "20px";

    // Create checkout iframe
    const iframe = document.createElement("iframe");

    iframe.src = `${CHECKOUT_ORIGIN}?productId=${encodeURIComponent(
      options.productId
    )}`;

    iframe.title = "Dodo Checkout";

    iframe.style.width = "400px";
    iframe.style.height = "650px";
    iframe.style.maxWidth = "100%";
    iframe.style.border = "none";
    iframe.style.borderRadius = "24px";
    iframe.style.background = "#020617";

    container.appendChild(iframe);
    document.body.appendChild(container);

    checkoutContainer = container;

    // Listen for checkout messages
    messageHandler = (event: MessageEvent) => {
      if (event.origin !== CHECKOUT_ORIGIN) {
        return;
      }

      // Payment successful
      if (event.data?.type === "PAYMENT_SUCCESS") {
        options.onSuccess?.({
          sessionId: event.data.sessionId,
        });

        closeCheckout();
        return;
      }

      // Payment failed
      if (event.data?.type === "PAYMENT_ERROR") {
        options.onError?.({
          code: event.data.code,
          message: event.data.message,
        });

        return;
      }

      // Checkout closed
      if (event.data?.type === "CHECKOUT_CLOSE") {
        options.onClose?.({
          reason: "user_closed",
        });

        closeCheckout();
      }
    };

    window.addEventListener("message", messageHandler);
  },
};

function closeCheckout() {
  if (messageHandler) {
    window.removeEventListener("message", messageHandler);
    messageHandler = null;
  }

  if (checkoutContainer) {
    checkoutContainer.remove();
    checkoutContainer = null;
  }
}