using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quickrent.Model.Enums;

namespace Quickrent.DTO.OrderDTO
{
    public class ReqAddOrderDto
    {
        public int OrderId { get; set; }
        public double Discount { get; set; }
        public double Taxes { get; set; }
        public double TotalAmount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public BillingCycle BillingCycle { get; set; }
        public bool IsCancelled { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Pincode { get; set; }
        
        public int ProductId { get; set; }
        public int UserId { get; set; }
    }
}