using Quickrent.DTO.OrderDTO;

namespace Quickrent.Service.Interface
{
    public interface IRazorpayService
    {
        public int CreateOrder(double amount);
    }
}
