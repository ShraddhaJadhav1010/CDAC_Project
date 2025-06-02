using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Quickrent.DTO.UserDTO;
using Quickrent.Model;

namespace Quickrent.Service.Interface
{
    public interface IAuthService
    {
        string AuthUserDetails(ReqUserLoginDto dto);

        string AddUser(ReqRegisterUserDto user);

        string AuthAdminDetails(ReqUserLoginDto dto);
    }
}