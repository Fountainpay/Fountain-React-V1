import * as React from 'react';
import useFpcheckout from './useFP';
import { FpcheckoutConfig, FpcheckoutResponse } from './types';

interface FpcheckoutButtonProps extends FpcheckoutConfig {
  text?: string;
  className?: string;
  disabled?: boolean;
  close: () => void;
  children?: React.ReactNode;
  callback: (response: FpcheckoutResponse) => void;
}

const FpcheckoutButton = ({
  text,
  className,
  children,
  callback,
  close,
  disabled,
  ...config
}: FpcheckoutButtonProps): JSX.Element => {
	const handleFpcheckoutPayment = useFpcheckout(config);
	console.log(config)
	return (
		<button
		disabled={disabled}
		className={className}
		onClick={() => handleFpcheckoutPayment({ callback, close })}
		>
		{text || children}
		</button>
	);
};

export default FpcheckoutButton;
