import * as React from 'react';

/**
 * Check out {@link https://docs.fountainpay.ng/docs/standard} for more information.
 */

var types = /*#__PURE__*/Object.freeze({
  __proto__: null
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var loadedScripts = {};
var src = 'https://libraries.fountainpay.ng/v.1.0/inline.js';
function useFPScript() {
    var _a = React.useState({
        loaded: false,
        error: false,
    }), state = _a[0], setState = _a[1];
    var isScriptExecuted = React.useRef(false);
    React.useEffect(function () {
        if (isScriptExecuted.current) {
            setState({
                loaded: true,
                error: false,
            });
        }
        isScriptExecuted.current = true;
        if (loadedScripts.hasOwnProperty(src)) {
            setState({
                loaded: true,
                error: false,
            });
        }
        else {
            loadedScripts.src = src;
            var script_1 = document.createElement('script');
            script_1.src = src;
            script_1.id = "fpCheckout";
            script_1.async = true;
            var onScriptLoad_1 = function () {
                setState({
                    loaded: true,
                    error: false,
                });
            };
            var onScriptError_1 = function () {
                delete loadedScripts.src;
                setState({
                    loaded: true,
                    error: true,
                });
            };
            script_1.addEventListener('load', onScriptLoad_1);
            script_1.addEventListener('complete', onScriptLoad_1);
            script_1.addEventListener('error', onScriptError_1);
            document.body.appendChild(script_1);
            return function () {
                script_1.removeEventListener('load', onScriptLoad_1);
                script_1.removeEventListener('error', onScriptError_1);
            };
        }
    }, []);
    return [state.loaded, state.error];
}

/**
 *
 * @param config takes in configuration for fpcheckout
 * @returns handleFpcheckoutPayment function
 */
function useFpcheckout(FpcheckoutConfig) {
    var _a = useFPScript(), loaded = _a[0], error = _a[1];
    React.useEffect(function () {
        if (error)
            throw new Error('Unable to load fountainpay payment modal');
    }, [error]);
    /**
     *
     * @param object - {callback, onClose}
     */
    function handleFpcheckoutPayment(_a) {
        var _b, _c;
        var callback = _a.callback, onClose = _a.onClose;
        if (error)
            throw new Error('Unable to load fountainpay payment modal');
        if (loaded) {
            console.log("Init Config: ", FpcheckoutConfig);
            var FpcheckoutArgs = __assign(__assign({}, FpcheckoutConfig), { amount: (_b = FpcheckoutConfig.amount) !== null && _b !== void 0 ? _b : 0, callback: callback, onclose: onClose, channels: (_c = FpcheckoutConfig === null || FpcheckoutConfig === void 0 ? void 0 : FpcheckoutConfig.channels) !== null && _c !== void 0 ? _c : ["card", "qrcode", "directDebit"] });
            console.log("Config: ", FpcheckoutArgs);
            return (
            // @ts-ignore
            window.Fountainpay &&
                // @ts-ignore
                window.Fountainpay.setup(FpcheckoutArgs));
        }
    }
    return handleFpcheckoutPayment;
}

var FpcheckoutButton = function (_a) {
    var text = _a.text, className = _a.className, children = _a.children, callback = _a.callback, onClose = _a.onClose, disabled = _a.disabled, config = __rest(_a, ["text", "className", "children", "callback", "onClose", "disabled"]);
    var handleFpcheckoutPayment = useFpcheckout(config);
    return (React.createElement("button", { disabled: disabled, className: className, onClick: function () { return handleFpcheckoutPayment({ callback: callback, onClose: onClose }); } }, text || children));
};

/**
 * function to be called when you want to close payment
 */
function closePaymentModal() {
    document.getElementsByName('checkout').forEach(function (item) {
        item.setAttribute('style', 'position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;');
        item.setAttribute('id', 'fpCheckout');
        item.setAttribute('src', 'https://checkout.fountainpay.ng/?');
        document.body.style.overflow = '';
    });
}

export { FpcheckoutButton as FPCheckoutButton, closePaymentModal, types as fpCheckoutTypes, useFpcheckout as useFPCheckout };
