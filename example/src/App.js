import React from 'react';
import { useFPCheckout, FPCheckoutButton, closePaymentModal } from './dist/index';


export default function App() {
  const [gConfig, setGConfig] = React.useState();
  const config = {
    public_key: "FP-PUBK-9603605594851666993306925",
    tnx_ref: Date.now(),
    amount: 10,
    currency: 'NGN',
    channels: ["card", "qrcode", "directDebit"],
    customer: {
      email: 'user@gmail.com',
      phone_number: '08102909304',
      lastname: 'test',
      firstname:'user'
    },

    customizations: {
      title: 'Home Front',
      description: 'Payment for items',
      logo: 'https://assets.piedpiper.com/logo.png',
    },
  };
  
  React.useEffect(() => {
    const globalConfig = {
      ...config,
      text: 'Pay with FP btn',
      callback: (response) => {
        console.log(response);
        closePaymentModal()
      },
      onClose: () => {
        console.log("You close me ooo")
      },
      
    };
    setGConfig(globalConfig)
  }, []);

  const  handlePayment = useFPCheckout(config);
  
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
            onClose: () => {
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