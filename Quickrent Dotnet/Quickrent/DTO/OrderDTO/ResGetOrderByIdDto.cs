using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quickrent.Model.Enums;

namespace Quickrent.DTO.OrderDTO
{
    public class ResGetOrderByIdDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public double Discount { get; set; }
        public double Taxes { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public BillingCycle BillingCycle { get; set; }
        public bool IsCancelled { get; set; }
        public string UserName { get; set; }
        public string ProductName { get; set; }
        public string Image { get; set; }
    }
}