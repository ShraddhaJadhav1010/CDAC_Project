using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quickrent.DTO.UserDTO;
using Quickrent.Model;

namespace Quickrent.Repository.Interface
{
    public interface IAuthRepository
    {

        bool AddUser(User user);
        bool AuthAdminDetails(ReqUserLoginDto dto);
        User AuthUserDetails(string email, string password);
    }
}
