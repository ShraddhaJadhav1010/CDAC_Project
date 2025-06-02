using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quickrent.Model;

namespace Quickrent.Service.Interface
{
    public interface IEmailService
    {
        void SendEmail(Mailrequest mailrequest);
    }
}