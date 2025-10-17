export type CheckoutPayload = {
  priceId: string;
  customerEmail: string;
};

export function validateCheckout(payload: CheckoutPayload): boolean {
  return Boolean(payload.priceId && payload.customerEmail.includes("@"));
}
