using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quickrent.Exceptions
{
    public class InvalidCredentials: ApplicationException
    {
        public InvalidCredentials(string message): base(message){}
    }
}