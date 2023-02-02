import * as React from 'react';
import { FpcheckoutConfig, FpcheckoutResponse } from './types';
interface FpcheckoutButtonProps extends FpcheckoutConfig {
    text?: string;
    className?: string;
    disabled?: boolean;
    close: () => void;
    children?: React.ReactNode;
    callback: (response: FpcheckoutResponse) => void;
}
declare const FpcheckoutButton: ({ text, className, children, callback, close, disabled, ...config }: FpcheckoutButtonProps) => JSX.Element;
export default FpcheckoutButton;
