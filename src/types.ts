/**
 * Check out {@link https://docs.fountainpay.ng/docs/standard} for more information.
 */

 export interface FpcheckoutProps {
  /**
   * 	Your transaction reference. This MUST be unique for every transaction
   */
  tnx_ref: string;
  amount: number;
  /**
   * currency to charge in. Defaults to NGN
   */
  currency?: 'NGN' | string;
  /**
   * 	This is a sha256 hash of your FpcheckoutCheckout values, it is used for passing secured values to the payment gateway.
   */
  integrity_hash?: string;
  /**
   * This specifies the payment options to be displayed e.g - [card, mobilemoney, ussd] and so on. Defaults to 'card, ussd, mobilemoney'
   */
  channels: ["card", "qrcode", "directDebit"] | Array<string>;
  /**
   *	This is the payment plan ID used for Recurring billing
   */
  payment_plan?: string;
  /**
   * URL to redirect to when a transaction is completed. This is useful for 3DSecure payments so we can redirect your customer back to a custom page you want to show them.
   */
  redirect_url?: string;
  /**
   *  This is an object that can contains your customer details.
   * e.g {
   *    'email': 'example@gmail.com',
   *    'phone_number': '08012345678',
   *    'name': 'Takeshi Kovacs'
   *  }
   */
  customer: {
    email: string;
    phone_number: string;
    lastname: string;
    firstname: string;
  };
  /**
   *  This is an object that helps you include additional payment information to your request
   * e.g {
   *   'consumer_id': 23,
   *   'consumer_mac': '92a3-912ba-1192a'
   *  }
   */
   metadata?: Record<string, unknown>;
  /**
   * This is an object that contains title, logo, and description you want to display on the modal e.g
   * e.g {
   *    'title': 'example@gmail.com',
   *    'description': '08012345678',
   *    'logo': 'Takeshi Kovacs'
   *  }
   */
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
  /**
   * function to be called when the payment is completed successfully
   */
  callback: (data: FpcheckoutResponse) => void;

  /**
   * function to be called when the mono connection is closed
   */
  onclose: () => void;
  key?: string;

  public_key?: string;

  subaccounts?: Array<unknown>;
}

export interface FpcheckoutConfig {
  key: FpcheckoutProps['public_key'];
  public_key: FpcheckoutProps['public_key'];
  tnx_ref: FpcheckoutProps['tnx_ref'];
  amount: FpcheckoutProps['amount'];
  currency?: FpcheckoutProps['currency'];
  customer: FpcheckoutProps['customer'];
  customizations: FpcheckoutProps['customizations'];
  metadata?: FpcheckoutProps['metadata'];
  redirect_url?: FpcheckoutProps['redirect_url'];
  channels: FpcheckoutProps['channels'];
}

export interface InitializeFpcheckoutPayment {
  onClose: FpcheckoutProps['onclose'];
  callback: FpcheckoutProps['callback'];
}

export interface FpcheckoutResponse {
  amount: FpcheckoutProps['amount'];
  currency: FpcheckoutProps['currency'];
  customer: FpcheckoutProps['customer'];
  tnx_ref: FpcheckoutProps['tnx_ref'];
  flw_ref: string;
  status: string;
  transaction_id: number;
}
