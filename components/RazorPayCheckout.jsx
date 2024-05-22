// RazorPay flow for expo react native
import RazorPayCheckout from 'react-native-razorpay';


let options = {
    description: 'Book Your Ride',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'USD',
    key: 'your_key_id',
    amount: '5000',
    name: 'foo',
    prefill: {
      email: 'void@razorpay.com',
      contact: '9191919191',
      name: 'Razorpay Software'
    },
    theme: {color: '#F37254'}
  }
  RazorPayCheckout.open(options)
  .then((data) => {
    // handle success
    alert(`Success: ${data.razorpay_payment_id}`);
  })
  .catch((error) => {
    // handle failure
    alert(`Error: ${error.code} | ${error.description}`);
  });