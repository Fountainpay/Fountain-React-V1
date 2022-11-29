import * as React from 'react';
import useFpcheckout from './useFP';
import { FpcheckoutConfig, FpcheckoutResponse } from './types';

interface FpcheckoutButtonProps extends FpcheckoutConfig {
  text?: string;
  className?: string;
  disabled?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  callback: (response: FpcheckoutResponse) => void;
}

const FpcheckoutButton = ({
  text,
  className,
  children,
  callback,
  onClose,
  disabled,
  ...config
}: FpcheckoutButtonProps): JSX.Element => {
  const handleFpcheckoutPayment = useFpcheckout(config);

  return (
    <button
      disabled={disabled}
      className={className}
      onClick={() => handleFpcheckoutPayment({ callback, onClose })}
    >
      {text || children}
    </button>
  );
};

export default FpcheckoutButton;
