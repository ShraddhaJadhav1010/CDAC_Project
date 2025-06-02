import { useEffect } from "react";

const RazorPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_Dsccmxtgo8K3qz", // Enter your Razorpay Key ID
      amount: "1000",
      currency: "INR",
      description: "Acme Corp",
      image: "example.com/image/rzp.jpg",
      prefill: {
        email: "gaurav.kumar@example.com",
        contact: "+919900000000",
      },
      config: {
        display: {
          blocks: {
            utib: {
              name: "Pay Using Axis Bank",
              instruments: [
                { method: "card", issuers: ["UTIB"] },
                { method: "netbanking", banks: ["UTIB"] },
              ],
            },
            other: {
              name: "Other Payment Methods",
              instruments: [
                { method: "card", issuers: ["ICIC"] },
                { method: "netbanking" },
              ],
            },
          },
          hide: [{ method: "upi" }],
          sequence: ["block.utib", "block.other"],
          preferences: {
            show_default_blocks: false,
          },
        },
      },
      handler: function (response) {
        alert(response.razorpay_payment_id);
      },
      modal: {
        ondismiss: function () {
          if (window.confirm("Are you sure you want to close the form?")) {
            console.log("Checkout form closed by the user");
          } else {
            console.log("Complete the Payment");
          }
        },
      },
    };
    
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <button 
      id="rzp-button1" 
      className="btn btn-outline-dark btn-lg" 
      onClick={handlePayment}
    >
      <i className="fas fa-money-bill"></i> Own Checkout
    </button>
  );
};

export default RazorPage;
