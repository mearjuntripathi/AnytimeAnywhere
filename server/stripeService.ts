import { getUncachableStripeClient } from './stripeClient';

export class StripeService {
  async createCheckoutSession(
    priceId: string, 
    successUrl: string, 
    cancelUrl: string,
    customerEmail?: string,
    metadata?: Record<string, string>
  ) {
    const stripe = await getUncachableStripeClient();
    return await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata: metadata,
    });
  }

  async createProduct(name: string, description: string, metadata?: Record<string, string>) {
    const stripe = await getUncachableStripeClient();
    return await stripe.products.create({
      name,
      description,
      metadata,
    });
  }

  async createPrice(productId: string, unitAmount: number, currency: string = 'inr') {
    const stripe = await getUncachableStripeClient();
    return await stripe.prices.create({
      product: productId,
      unit_amount: unitAmount,
      currency,
    });
  }

  async listProducts() {
    const stripe = await getUncachableStripeClient();
    return await stripe.products.list({ active: true, limit: 100 });
  }

  async listPrices(productId?: string) {
    const stripe = await getUncachableStripeClient();
    const params: any = { active: true, limit: 100 };
    if (productId) params.product = productId;
    return await stripe.prices.list(params);
  }
}

export const stripeService = new StripeService();
