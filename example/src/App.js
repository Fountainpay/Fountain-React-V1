import React from 'react';
import { useFPCheckout, FPCheckoutButton, closePaymentModal } from './dist/index';


export default function App() {
  const [gConfig, setGConfig] = React.useState(null);

  const config = {
    publicKey: "FP-PUBK-7688237368111670408531611",
    tnxRef: Date.now(),
    amount: 10,
    currency: 'NGN',
    customer: {
      email: 'user@gmail.com',
      phoneNo: '08102909304',
      lastName: 'test',
      otherName:'user'
    }
  };
  
  const  handlePayment = useFPCheckout(config);
  React.useEffect(() => {
    const globalConfig = {
      ...config,
      text: 'Pay with FP btn',
      callback: (response) => {
        console.log(response);
        closePaymentModal()
      },
      close: () => {
        console.log("You close me too")
      },
    };
    setGConfig(globalConfig)
	// eslint-disable-next-line
  }, []);

  
  
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <button
        onClick={() => {
          handlePayment({
            callback: (response) => {
              closePaymentModal()
            },
            close: () => {
              console.log("You close me ooo")
            },
            
          });
          
        }}
      >
        Test with Custom button
      </button>

      <FPCheckoutButton {...gConfig} />
    </div>
  );
}