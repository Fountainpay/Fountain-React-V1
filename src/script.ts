import * as React from 'react';

const loadedScripts: {
  src?: string;
} = {};

interface ScriptStatusInterface {
  loaded: boolean;
  error: boolean;
}

const src = 'https://libraries.fountainpay.ng/v.1.0/inline.js';

export default function useFPScript(): readonly [boolean, boolean] {
  const [state, setState] = React.useState<ScriptStatusInterface>({
    loaded: false,
    error: false,
  });
  
  const isScriptExecuted = React.useRef(false);

  React.useEffect((): (() => void) | void => {
    if (isScriptExecuted.current) {
      setState({
        loaded: true,
        error: false,
      });
    };

    isScriptExecuted.current=true
    
    if (loadedScripts.hasOwnProperty(src)) {
      setState({
        loaded: true,
        error: false,
      });
    } else {
      loadedScripts.src = src;

      const script = document.createElement('script');
      script.src = src;
      script.id = "fpCheckout"
      script.async = true;

      const onScriptLoad = (): void => {
        
        setState({
          loaded: true,
          error: false,
        });
      };

      const onScriptError = (): void => {
        delete loadedScripts.src;

        setState({
          loaded: true,
          error: true,
        });
      };
      
      
      script.addEventListener('load', onScriptLoad);
      script.addEventListener('complete', onScriptLoad);
      script.addEventListener('error', onScriptError);

      document.body.appendChild(script);

      return () => {
        script.removeEventListener('load', onScriptLoad);
        script.removeEventListener('error', onScriptError);
      };
    }
  }, []);

  return [state.loaded, state.error] as const;
}
