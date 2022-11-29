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
export default function useFpcheckout(FpcheckoutConfig: FpcheckoutConfig): ({ callback, onClose }: InitializeFpcheckoutPayment) => void {

  const [loaded, error] = useFPScript();
  
  

  React.useEffect(() => {
    if (error) throw new Error('Unable to load fountainpay payment modal');
  }, [error]);

  /**
   *
   * @param object - {callback, onClose}
   */
  function handleFpcheckoutPayment({
    callback,
    onClose,
  }: InitializeFpcheckoutPayment): void {
    if (error) throw new Error('Unable to load fountainpay payment modal');
    
    
    if (loaded) {
      console.log("Init Config: ", FpcheckoutConfig)
      FpcheckoutConfig.key=FpcheckoutConfig.public_key;
      delete FpcheckoutConfig.public_key;
      const FpcheckoutArgs: FpcheckoutProps = {
        ...FpcheckoutConfig,
        amount: FpcheckoutConfig.amount ?? 0,
        callback: callback,
        onclose: onClose,
        channels: FpcheckoutConfig?.channels ?? ["card", "qrcode", "directDebit"],
      };
      console.log("Config: ", FpcheckoutArgs)
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
