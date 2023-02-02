import { FpcheckoutConfig, InitializeFpcheckoutPayment } from './types';
/**
 *
 * @param config takes in configuration for fpcheckout
 * @returns handleFpcheckoutPayment function
 */
export default function useFpcheckout(FpcheckoutConfig: FpcheckoutConfig): ({ callback, close }: InitializeFpcheckoutPayment) => void;
