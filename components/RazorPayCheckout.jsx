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

  


const openRazorpay = (orderId) => {
    const options = {
        key: key, // Use your Razorpay test key
        amount: totalAmount * 100, // Amount in paise
        currency: "INR",
        name: "Navfinder",
        description: "Pay for ride booking",
        order_id: orderId,
        handler: async (response) => {
            try {
                const customHeaders = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.accessToken}`,
                };
                const body = {
                    RazorpayOrderId: response.razorpay_order_id,
                    RazorpayPaymentId: response.razorpay_payment_id,
                    RazorpaySignature: response.razorpay_signature
                };
                const url = "payments/verifyPayment"; // Replace with your checkout API endpoint
                const verifyResponse = await post(url, body, customHeaders); // Adjust payload as required
                if (verifyResponse.success) {
                    console.log(verifyResponse.data);
                    openRazorpay(verifyResponse.data.id);
                    setOrderDetails(verifyResponse.data); // Assuming your API response includes necessary order details
                    setShowWebView(true);
                } else {
                    setShowModal({
                        isVisible: true,
                        value: verifyResponse.message,
                        type: 'error',
                    });
                }
            } catch (error) {
                console.error("Checkout API error:", error);
                setShowModal({
                    isVisible: true,
                    value: "Failed to initiate checkout",
                    type: 'error',
                });
            } finally {
                setLoading(false);
            }
        },
        prefill: {
            name: user.name,
            email: user.email,
            contact: user.contact
        },
        theme: {
            color: "#000000"
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
};

const generateHtmlContent = (key, amount, orderDetails) => {
    return `
    <html>
      <head>
        <style>
          body {
            background-color: black;
            color: white;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <script>
          var options = {
            "key": "${key}",
            "amount": "${amount}",
            "currency": "INR",
            "name": "Navfinder",
            "description": "Credits towards consultation",
            "image": "https://navfinderbucket.s3.us-east-1.amazonaws.com/OIG2.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaCXVzLWVhc3QtMSJHMEUCIQCJknpHnl9juJjja2OJr9N75wE5BEkVFuq4jxSCaUSpqwIgauwpay6IrOsyRuJ%2Blekm4vW%2BPgqri0y%2BCXnQBaiiE%2FYqhAMIoP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARADGgwwMjgzODYwMjczMDciDOoXAsTIOoiO21LZfirYAibCzyN%2FqCxr3oWxsPu4CzhFmNgMZELk2rsbGbdo3yMRrWE2B1YMNlBVcU5qtoixp7BstYk3LsBw1Xp0sdHZj4wNQHcGyMeTT5fBLxcs3ZBzBB74%2F2Hq1dqdYf3xUY2dYsEKXq1QyPOzQ0JQ%2F0a%2FJNPkXUZKB7q1fJqdfR9GKauGSvHSXhEzy%2Fs4OSarUyji4ucEkcw1AK%2B0v8qZBNJOVusCp6cAco62aq7a9jEf6L78FyzqLZL7TOYUT7ZghHGZByoHpHJK7%2BiEmqDFC9BkfuiXbGpAtqHtJd6H77%2BUhn6Q%2BTU9Cy4thJCSrYEQerluThAGjWls2e5rfPQcWBietMgQZ834Qr1Qc0uC6WroEShaZ8b8KpgNSMkgj4XoR9n48C3MXIQJWosurYCklu4RnapCDQboCjHiQKAXmknXvICEF83RvaI5Jsq4Imhhzi97H%2BMfwmB2zv1aMIKhxrIGOrMC73GifFT7QNAx15AwJaowsZx9vWC%2BkXwtSuV04Md8cOu0FpC2nhdACeGGKCvNko4uA3aa0bCaBMnXprH3LlrK73DSr%2FT69tBrCpEa1b%2BUAi0jqlErm04%2FWE7815v5ojyaTenqDgmR0OC1vq8XGbzuwrhUH1FcWXnBx7si5mfW11%2Bm%2FYQ8B83Wgmi8bFKiA6NsrL2bvnhxDf5CbXmLFqJ6djnFqHHbxsStvNj5iMPJuoufZ20Yzm8D1gLTytTfIX7OoRL0mo1K1Yw9fY8C4u1IcNKSIbu0AbClOmnOd8v6fKxQckFsZWxQhXP1nQklzJOXso936aF4PGVWl3kwxdbZX9IyUkfd2PcJErvduEC411tkIiyXsYk%2F%2FIowTb%2BybvbrwPk5AwAYG2m%2BmjrCWrg2AkXfPQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240525T072403Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQNG7QM4V3KJBH67P%2F20240525%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=16703b6ca68461c0673c8cfdf58a380e485a5a7d2764bbea202d14c62f904e4b",
            "order_id": "${orderDetails.id}", // Use order_id from your checkout API response
            "prefill": {
              "name": "${user.userName}",
              "email": "${user.email}",
              "contact": "${user.contact}"
            },
            "theme": {
              "color": "#000000"
            },
            "handler": function (response){
              // Handle success or failure here
              console.log(response);
            },
            "modal": {
              "ondismiss": function(){
                console.log("Checkout form closed");
              }
            },
            "method": {
              "netbanking": true,
              "card": true,
              "upi": true,
              "wallet": true,
              "emi": false,
              "bank_transfer": false,
              "paypal": false,
              "paylater": false
            }
          };
          var rzp1 = new Razorpay(options);
          rzp1.open();
        </script>
      </body>
    </html>
  `;
};