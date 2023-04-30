/**
 * Check out {@link https://docs.fountainpay.ng/docs/standard} for more information.
 */

 export interface FpcheckoutProps {
  /**
   * 	Your transaction reference. This MUST be unique for every transaction
   */
  tnxRef: string;
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
  channels?: ["card", "qrcode", "directDebit"] | Array<string>;
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
    phoneNo: string;
    lastName: string;
    otherName?: string;
  };

  
  /**
   *  This is an object that helps you include additional payment information to your request
   * e.g {
   *   'consumer_id': 23,
   *   'consumer_mac': '92a3-912ba-1192a'
   *  }
   */
   metadata?: {
		container?: string;
		debug?: boolean;
		minimized?: boolean;
		isMobile?: boolean;
		theme?: {
			disableDarkMode?: boolean;
		};
		customTheme?: CustomTheme;
		text?: Text;
		styles?: {
			classNameContainer?: string;
		};
  };
  
  /**
   * function to be called when the payment is completed successfully
   */
  callback: (data: any) => void;

  /**
   * function to be called when the modal connection is closed
   */
  close: () => void;

  publicKey: string;

  subaccounts?: Array<unknown>;
}

export interface Text {
	minimizedTitle?: string;
	formTitle?: string;
	formSubTitle?: string;
	thankYouTitle?: string;
	thankYouBody?: string;
	faqTitle?: string;
  }

  export interface CustomTheme {
	backgroundColor?: string;
	fontColor?: string;
	buttonBackgroundColor?: string;
	buttonFontColor?:string;
  };
export interface FpcheckoutConfig {
  publicKey: FpcheckoutProps['publicKey'];
  tnxRef: FpcheckoutProps['tnxRef'];
  amount: FpcheckoutProps['amount'];
  currency?: FpcheckoutProps['currency'];
  customer: FpcheckoutProps['customer'];
  metadata?: FpcheckoutProps['metadata'];
  redirect_url?: FpcheckoutProps['redirect_url'];
  channels: FpcheckoutProps['channels'];
}

export interface InitializeFpcheckoutPayment {
  close: FpcheckoutProps['close'];
  callback: FpcheckoutProps['callback'];
}

export interface FpcheckoutResponse {
  amount?: FpcheckoutProps['amount'];
  currency?: FpcheckoutProps['currency'];
  customer?: FpcheckoutProps['customer'];
  tnxRef?: FpcheckoutProps['tnxRef'];
  status?: string;
  transaction_id?: number;
}
