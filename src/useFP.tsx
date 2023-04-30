/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import useFPScript from './script';
import {
  FpcheckoutConfig,
  FpcheckoutProps,
  InitializeFpcheckoutPayment,
} from './types';
/**
 *
 * @param config takes in configuration for fpcheckout
 * @returns handleFpcheckoutPayment function
 */
export default function useFpcheckout(FpcheckoutConfig: FpcheckoutConfig): ({ callback, close }: InitializeFpcheckoutPayment) => void {

  const [loaded, error] = useFPScript();
  
  

  React.useEffect(() => {
    if (error) throw new Error('Unable to load fountainpay payment modal');
  }, [error]);

  /**
   *
   * @param object - {callback, close}
   */
  function handleFpcheckoutPayment({
    callback,
    close,
  }: InitializeFpcheckoutPayment): void {
    if (error) throw new Error('Unable to load fountainpay payment modal');
    
    
    if (loaded) {
      
      const FpcheckoutArgs: FpcheckoutProps = {
        ...FpcheckoutConfig,
        amount: FpcheckoutConfig.amount ?? 100,
        callback: callback,
        close: close,
        //channels: FpcheckoutConfig?.channels ?? ["card", "qrcode", "directDebit"],
      };
      
      return (
        // @ts-ignore
        window.Fountainpay &&
        // @ts-ignore
        
        window.Fountainpay.setup(FpcheckoutArgs)
      );
    }
  }

  return handleFpcheckoutPayment;
}
