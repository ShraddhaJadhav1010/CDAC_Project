using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quickrent.DTO.UserDTO
{
    public class ReqUserLoginDto
    {
        public string Email {get; set;}
        public string Password {get; set;}
    }
}