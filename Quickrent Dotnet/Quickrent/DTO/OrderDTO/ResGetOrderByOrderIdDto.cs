using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quickrent.Model.Enums;

namespace Quickrent.DTO.OrderDTO
{
    public class ResGetOrderByOrderIdDto
    {
        public int orderId { get; set; }

        public double discount { get; set; }

        public double taxes { get; set; }

        public DateTime startDate { get; set; }

        public DateTime endDate { get; set; }

        public BillingCycle billingCycle { get; set; }

        public bool IsCancelled { get; set; }

        public string address { get; set; }

        public string city { get; set; }

        public string state { get; set; }

        public string country { get; set; }

        public string pincode { get; set; }

        public String productTitle { get; set; }

        public String productBrand { get; set; }

        public String productSellerName { get; set; }

        public String customerName { get; set; }

        public String customerEmail { get; set; }

        public String phoneNo { get; set; }

        public String productImage { get; set; }
    }
}