interface PaystackPopOptions {
  key: string;
  email: string;
  amount: number;
  currency?: string;
  ref?: string;
  metadata?: Record<string, unknown>;
  channels?: string[];
  label?: string;
  onClose: () => void;
  callback: (response: PaystackResponse) => void;
}

interface PaystackResponse {
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  message: string;
}

interface PaystackPopInstance {
  setup: (options: PaystackPopOptions) => { openIframe: () => void };
}

declare global {
  interface Window {
    PaystackPop: PaystackPopInstance;
  }
}

export {};
