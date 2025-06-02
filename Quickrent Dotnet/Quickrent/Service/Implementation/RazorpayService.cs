using Quickrent.DTO.OrderDTO;
using Quickrent.Service.Interface;
using Razorpay.Api;

namespace Quickrent.Service.Implementation
{
    public class RazorpayService : IRazorpayService
    {
        private readonly string _key;
        private readonly string _secret;
        public RazorpayService(IConfiguration configuration) 
        {
            _key = configuration["Razorpay:Key"];
            _secret = configuration["Razorpay:Secret"];
        }

        public int CreateOrder(double amount)
        {
            try
            {
                // Convert amount to paise (Razorpay accepts amount in paise)
                int amountInPaise = (int) amount * 100;

                RazorpayClient client = new RazorpayClient(_key, _secret);
                Dictionary<string, object> options = new Dictionary<string, object>
            {
                { "amount", amountInPaise }, // Amount in paise (e.g., 100 INR = 10000)
                { "currency", "INR" },
                { "payment_capture", 1 } // Auto capture
            };

                Order order = client.Order.Create(options);
                return order["id"].ToString();
            }
            catch (Exception ex)
            {
                throw new Exception("Error creating Razorpay order", ex);
            }
        }
    }
}
